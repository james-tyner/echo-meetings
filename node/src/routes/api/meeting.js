const router = require('express').Router();
const mongoose = require('mongoose');
const log = require('../../util/log');

const User = mongoose.model('User');
const Meeting = mongoose.model('Meeting');

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
    .populate('invitees').populate('team')
    .then((meetings) => {
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
    } else {
      return res.status(200).json({
        meeting
      })
    }
  });
});

// Create a Meeting
router.post('/', async (req, res) => {
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
    // condense error messages
    let message = '';
    for (const single_error in err.errors) {
      // TODO hasOwnProperty
      if (err.errors.hasOwnProperty(single_error)) message += `${err.errors[single_error].message} `;
    }
    return res.status(422).json({
      errors: { message },
    });
  });
});


// update a meeting
router.put('/:m_id', auth.required, async (req, res) => {
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
      // Optional fields: title, time, location, invitees
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

      // will perform validation
      meeting.save().then(() => {
        log.log(`Meeting (${meeting.title}) modified`);
        return res.json({ meeting });
      }).catch((err) => {
        // condense error messages
        let message = '';
        for (const single_error in err.errors) {
          // TODO
          if (err.errors.hasOwnProperty(single_error)) message += `${err.errors[single_error].message} `;
        }
        return res.status(422).json({
          errors: { message },
        });
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
      log.log(`Meeting (${meeting.title}) deleted`);
      res.json({ meeting });
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


// delete a meeting
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
      meeting.agendas.id(req.params.a_id).remove();
      meeting.save().then(() => {
        log.log(`Agenda (${agenda.title}) deleted inside Meeting (${meeting.title})`);
        return res.json({ meeting });
      });
    })
    .catch(() => res.status(422).json({
      errors: {
        message: MEETING_NONEXISTENT_MSG,
      },
    }));
});


module.exports = router;
