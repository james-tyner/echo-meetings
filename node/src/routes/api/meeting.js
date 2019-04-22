require('dotenv').config();
const router = require('express').Router();
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');
const log = require('../../util/log');
// const fs = require('fs');

const User = mongoose.model('User');
const Task = mongoose.model('Task');
const Meeting = mongoose.model('Meeting');
const Recap = mongoose.model('Recap');
const auth = require('../auth');

const MEETING_NONEXISTENT_MSG = "Meeting does not exist, or user doesn't have permission to access this meeting";

// always perform auth check
router.use(auth.required, async (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if (!user) {
      return res.sendStatus(401);
    }
    req.locals = {};
    req.locals.user = user;
    next();
  });
});


// Get all Meetings
router.get('/', async (req, res) => {
  const { user } = req.locals;
  Meeting.find({ invitees: user.id })
    .populate('invitees')
    .populate('team')
    .populate({
      path: 'agendas.tasks',
      populate: { path: 'assignees' },
    })
    .then((meetings) => {
      for (let i = 0; i < meetings.length; i++) {
        meetings[i].agendas.sort((a2, a1) => a2.order - a1.order);
      }
      res.json({ meetings });
    });
});


// Get a single meeting
router.get('/:m_id', auth.required, async (req, res) => {
  const { user } = req.locals;
  Meeting.findOne({ _id: req.params.m_id, invitees: mongoose.Types.ObjectId(user.id) })
    .then((meeting) => {
      if (!meeting) {
        return res.status(422).json({
          errors: {
            message: MEETING_NONEXISTENT_MSG,
          },
        });
      }
      return res.status(200).json({
        meeting,
      });
    });
});

// Create a Meeting
router.post('/', async (req, res, next) => {
  const { user } = req.locals;
  log.log('Creating a meeting');
  const req_meeting = req.body.meeting;
  if (!req_meeting) {
    return res.status(422).json({
      errors: {
        message: 'no meeting field',
      },
    });
  }
  // required fields: title, time, team
  if (!req_meeting.title) {
    return res.status(422).json({
      errors: {
        message: "title can't be blank",
      },
    });
  }
  if (!req_meeting.time) {
    return res.status(422).json({
      errors: {
        message: "time can't be blank",
      },
    });
  }
  if (!req_meeting.team) {
    return res.status(422).json({
      errors: {
        message: "team can't be blank",
      },
    });
  }
  // build the meeting
  const meeting = new Meeting();
  meeting.title = req_meeting.title;
  meeting.time = req_meeting.time;
  meeting.team = req_meeting.team;
  // only update fields that were actually passed...
  if (typeof req_meeting.location !== 'undefined') {
    meeting.location = req_meeting.location;
  }
  // add invitees to the meeting
  meeting.invitees = [];
  if (typeof req_meeting.invitees !== 'undefined') {
    meeting.invitees = req_meeting.invitees;
  }
  // don't forget to add the creator
  let contains = false;
  for (const temp_id of meeting.invitees) {
    if (user._id.equals(temp_id)) {
      contains = true;
      break;
    }
  }
  if (!contains) {
    meeting.invitees.push(user._id);
  }

  // this will perform validation of team and members
  meeting.save().then(() => {
    log.log(`Meeting (${meeting.title}) created`);
    return res.json({ meeting });
  }).catch((err) => {
    next(err);
  });
});


// update a meeting
router.put('/:m_id', auth.required, async (req, res, next) => {
  const { user } = req.locals;
  Meeting.findOne({ _id: req.params.m_id, invitees: mongoose.Types.ObjectId(user.id) })
    .then((meeting) => {
      if (!meeting) {
        return res.status(422).json({
          errors: {
            message: MEETING_NONEXISTENT_MSG,
          },
        });
      }
      const req_meeting = req.body.meeting;
      // Optional fields: title, time, location, invitees, start, end
      // only update fields that were actually passed...
      if (typeof req_meeting.title !== 'undefined') {
        meeting.title = req_meeting.title;
      }
      if (typeof req_meeting.time !== 'undefined') {
        meeting.time = req_meeting.time;
      }
      if (typeof req_meeting.location !== 'undefined') {
        meeting.location = req_meeting.location;
      }
      // TODO what if all invitees are removed. No one will be able to access this team
      // Memory leak dangerous!
      if (typeof req_meeting.invitees !== 'undefined') {
        meeting.invitees = req_meeting.invitees;
      }
      if (typeof req_meeting.start !== 'undefined') {
        meeting.start = req_meeting.start;
      }
      if (typeof req_meeting.end !== 'undefined') {
        meeting.end = req_meeting.end;
      }

      // will perform validation
      meeting.save().then(() => {
        log.log(`Meeting (${meeting.title}) modified`);
        return res.json({ meeting });
      }).catch((err) => {
        next(err);
      });
    })
    .catch(() => res.status(422).json({
      errors: {
        message: MEETING_NONEXISTENT_MSG,
      },
    }));
});


// delete a meeting
router.delete('/:m_id', async (req, res) => {
  const { user } = req.locals;
  Meeting.findOneAndDelete({ _id: req.params.m_id, invitees: mongoose.Types.ObjectId(user.id) })
    .then((meeting) => {
      if (!meeting) {
        return res.status(422).json({
          errors: {
            message: MEETING_NONEXISTENT_MSG,
          },
        });
      }
      Task.deleteMany({ meeting: meeting._id }).then(() => {
        log.log(`Meeting (${meeting.title}) deleted`);
        res.json({ meeting });
      });
    })
    .catch(() => res.status(422).json({
      errors: {
        message: MEETING_NONEXISTENT_MSG,
      },
    }));
});


// create an Agenda
router.post('/:m_id/agenda', async (req, res) => {
  const { user } = req.locals;
  log.log('Creating an agenda');
  Meeting.findOne({ _id: req.params.m_id, invitees: mongoose.Types.ObjectId(user.id) })
    .then((meeting) => {
      if (!meeting) {
        return res.status(422).json({
          errors: {
            message: MEETING_NONEXISTENT_MSG,
          },
        });
      }
      const req_agenda = req.body.agenda;
      if (!req_agenda) {
        return res.status(422).json({
          errors: {
            message: 'no agenda field',
          },
        });
      }
      // required fields: title
      if (!req_agenda.title) {
        return res.status(422).json({
          errors: {
            message: "title can't be blank",
          },
        });
      }
      const agenda = {};
      agenda.title = req_agenda.title;
      // only update fields that were actually passed...
      if (typeof req_agenda.description !== 'undefined') {
        agenda.description = req_agenda.description;
      }
      if (typeof req_agenda.notes !== 'undefined') {
        agenda.notes = req_agenda.notes;
      }
      agenda.tasks = [];
      agenda.order = meeting.agendas.length;
      meeting.agendas.push(agenda);
      meeting.save().then(() => {
        log.log(`Agenda (${agenda.title}) created inside Meeting (${meeting.title})`);
        return res.json({ meeting });
      });
    })
    .catch(() => res.status(422).json({
      errors: {
        message: MEETING_NONEXISTENT_MSG,
      },
    }));
});


// Update an Agenda
router.put('/:m_id/agenda/:a_id', async (req, res) => {
  const { user } = req.locals;
  log.log('Updating an agenda');
  Meeting.findOne({ _id: req.params.m_id, invitees: mongoose.Types.ObjectId(user.id) })
    .then((meeting) => {
      if (!meeting) {
        return res.status(422).json({
          errors: {
            message: MEETING_NONEXISTENT_MSG,
          },
        });
      }
      let agenda = null;
      let index;
      for (index = 0; index < meeting.agendas.length; index++) {
        if (meeting.agendas[index]._id.equals(req.params.a_id)) {
          agenda = meeting.agendas[index];
          break;
        }
      }
      if (!agenda) {
        return res.status(422).json({
          errors: {
            message: 'Agenda does not exist',
          },
        });
      }
      const req_agenda = req.body.agenda;
      if (!req_agenda) {
        return res.status(422).json({
          errors: {
            message: 'no agenda field',
          },
        });
      }
      // only update fields that were actually passed...
      if (typeof req_agenda.title !== 'undefined') {
        agenda.title = req_agenda.title;
      }
      if (typeof req_agenda.description !== 'undefined') {
        agenda.description = req_agenda.description;
      }
      if (typeof req_agenda.notes !== 'undefined') {
        agenda.notes = req_agenda.notes;
      }
      if (typeof req_agenda.order !== 'undefined') {
        // remove operation
        for (let i = 0; i < meeting.agendas.length; i++) {
          const temp_agenda = meeting.agendas[i];
          if (temp_agenda._id.equals(agenda._id)) continue;
          if (temp_agenda.order > agenda.order) {
            temp_agenda.order--;
            meeting.agendas.set(i, temp_agenda);
          }
        }
        agenda.order = req_agenda.order;
        // insert operation
        for (let i = 0; i < meeting.agendas.length; i++) {
          const temp_agenda = meeting.agendas[i];
          if (temp_agenda._id.equals(agenda._id)) continue;
          if (temp_agenda.order >= agenda.order) {
            temp_agenda.order++;
            meeting.agendas.set(i, temp_agenda);
          }
        }
      }
      console.log(meeting.agendas);
      meeting.agendas.set(index, agenda);
      meeting.save().then(() => {
        log.log(`Agenda (${agenda.title}) modified inside Meeting (${meeting.title})`);
        return res.json({ meeting });
      });
    })
    .catch(() => res.status(422).json({
      errors: {
        message: MEETING_NONEXISTENT_MSG,
      },
    }));
});


// delete an agenda
router.delete('/:m_id/agenda/:a_id', async (req, res) => {
  const { user } = req.locals;
  log.log('Deleting an agenda');
  Meeting.findOne({ _id: req.params.m_id, invitees: mongoose.Types.ObjectId(user.id) })
    .then((meeting) => {
      if (!meeting) {
        return res.status(422).json({
          errors: {
            message: MEETING_NONEXISTENT_MSG,
          },
        });
      }
      let agenda = null;
      let index;
      for (index = 0; index < meeting.agendas.length; index++) {
        if (meeting.agendas[index]._id.equals(req.params.a_id)) {
          agenda = meeting.agendas[index];
          break;
        }
      }
      if (!agenda) {
        return res.status(422).json({
          errors: {
            message: 'Agenda does not exist',
          },
        });
      }
      // remove operation
      for (let i = 0; i < meeting.agendas.length; i++) {
        const temp_agenda = meeting.agendas[i];
        if (temp_agenda.order > agenda.order) {
          temp_agenda.order--;
          meeting.agendas.set(i, temp_agenda);
        }
      }
      meeting.agendas.id(req.params.a_id).remove();
      Task.deleteMany({ _id: { $in: agenda.tasks } }).then(() => {
        meeting.save().then(() => {
          log.log(`Agenda (${agenda.title}) deleted inside Meeting (${meeting.title})`);
          return res.json({ meeting });
        });
      });
    })
    .catch(() => res.status(422).json({
      errors: {
        message: MEETING_NONEXISTENT_MSG,
      },
    }));
});

// Send a meeting recap
router.post('/:m_id/recap', async (req, res) => {
  const { user } = req.locals;
  Meeting.findOne({ _id: req.params.m_id })
    .populate('team')
    .populate('invitees')
    .populate({
      path: 'agendas.tasks',
      populate: { path: 'assignees' },
    })
    .then((meeting) => {
      if (!meeting) {
        return res.status(422).json({
          errors: {
            message: MEETING_NONEXISTENT_MSG,
          },
        });
      }
      // Email addresses of meeting attendees
      const req_emails = req.body.emails;
      if (!req_emails) {
        return res.status(422).json({
          errors: {
            message: 'No Emails field',
          },
        });
      }

      const recap = new Recap({
        emails: req_emails,
        meeting: meeting._id,
      });

      const msg = {
        from: {
          name: 'echo',
          email: 'jianxuat@usc.edu',
        },
        personalizations: [{
          to: req_emails,
          dynamic_template_data: {
            meeting,
            user,
            datetime: req.body.datetime,
          },
        }],
        template_id: process.env.RECAP_TEMPLATE,
      };
      sgMail.send(msg).catch(error => log.error(error));
      // For debugging
      // fs.writeFile('email_data.txt', JSON.stringify(msg, null, 2) , 'utf-8', function (err) {
      //   if (err) throw err;
      //   console.log('Saved!');
      // });

      meeting.recaps.push(recap._id);
      recap.save();

      meeting.save().then(() => res.json({ meeting }));
    })
    .catch(() => res.status(422).json({
      errors: {
        message: MEETING_NONEXISTENT_MSG,
      },
    }));
});


module.exports = router;
