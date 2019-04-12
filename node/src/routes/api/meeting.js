const log = require("../../util/log")
const router = require("express").Router();
const mongoose = require("mongoose");
const Team = mongoose.model("Team");
const User = mongoose.model("User");
const Meeting = mongoose.model("Meeting");

const auth = require("../auth");

const MEETING_NONEXISTENT_MSG = "Meeting does not exist, or user doesn't have permission to access this meeting";

// always perform auth check
router.use(auth.required, async function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) {
      return res.sendStatus(401);
    }
    req.locals = {};
    req.locals.user = user;
    next();
  })
});


// Get all Meetings
router.get('/', async (req, res) => {
  const user = req.locals.user;
  Meeting.find({invitees: user.id})
    .populate('invitees').populate('agendas')
    .then((meetings) => {
      res.json({meetings});
    });
});


// Create a Meeting
router.post('/', async (req, res, next) => {
  const user = req.locals.user;
  log.log('Creating a meeting');
  const req_meeting = req.body.meeting;
  if (!req_meeting) {
    return res.status(422).json({
      errors: {
        message: 'no meeting field'
      }
    });
  }
  // required fields: title, time, team
  if (!req_meeting.title) {
    return res.status(422).json({
      errors: {
        message: "title can't be blank"
      }
    });
  }
  if (!req_meeting.time) {
    return res.status(422).json({
      errors: {
        message: "time can't be blank"
      }
    });
  }
  if (!req_meeting.team) {
    return res.status(422).json({
      errors: {
        message: "team can't be blank"
      }
    });
  }
  // build the meeting
  const meeting = new Meeting();
  meeting.title = req_meeting.title;
  meeting.time = req_meeting.time;
  meeting.team = req_meeting.team;
  // only update fields that were actually passed...
  if (typeof req_meeting.location !== 'undefined') {
    meeting.location = req_meeting.location
  }
  // add invitees to the meeting
  meeting.invitees = []
  if (typeof req_meeting.invitees !== 'undefined') {
    meeting.invitees = req_meeting.invitees
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
    meeting.invitees.push(user._id)
  }

  // this will perform validation of team and members
  meeting.save().then(() => {
    log.log(`Meeting (${meeting.title}) created`);
    return res.json({meeting: meeting});
  }).catch((err) => {
    // condense error messages
    let message = '';
    for (const single_error in err.errors) {
      if (err.errors.hasOwnProperty(single_error))
        message += err.errors[single_error].message + ' '
    }
    return res.status(422).json({
      errors: {message}
    });
  });
});


// update a meeting
router.put('/:m_id', auth.required, async (req, res) => {
  const user = req.locals.user;
  Meeting.findOne({_id: req.params['m_id'], invitees: mongoose.Types.ObjectId(user.id)})
    .then(function (meeting) {
      if (!meeting) {
        return res.status(422).json({
          errors: {
            message: MEETING_NONEXISTENT_MSG
          }
        });
      }
      const req_meeting = req.body.meeting;
      // Optional fields: title, time, location, invitees
      // only update fields that were actually passed...
      if (typeof req_meeting.title !== 'undefined') {
        meeting.title = req_meeting.title
      }
      if (typeof req_meeting.time !== 'undefined') {
        meeting.time = req_meeting.time
      }
      if (typeof req_meeting.location !== 'undefined') {
        meeting.location = req_meeting.location
      }
      // TODO what if all invitees are removed. No one will be able to access this team
      // Memory leak dangerous!
      if (typeof req_meeting.invitees !== 'undefined') {
        meeting.invitees = req_meeting.invitees
      }

      // will perform validation
      meeting.save().then(() => {
        log.log(`Meeting (${meeting.title}) modified`);
        return res.json({meeting});
      }).catch(function (err) {
        // condense error messages
        let message = '';
        for (const single_error in err.errors) {
          if (err.errors.hasOwnProperty(single_error))
            message += err.errors[single_error].message + ' '
        }
        return res.status(422).json({
          errors: {message}
        });
      })

    }).catch(function () {
    return res.status(422).json({
      errors: {
        message: MEETING_NONEXISTENT_MSG
      }
    });
  })
});


// delete a meeting
router.delete('/:m_id', async (req, res) => {
  const user = req.locals.user;
  Meeting.findOneAndDelete({_id: req.params['m_id'], invitees: mongoose.Types.ObjectId(user.id)})
    .then(function (meeting) {
      if (!meeting) {
        return res.status(422).json({
          errors: {
            message: MEETING_NONEXISTENT_MSG
          }
        });
      } else {
        log.log(`Meeting (${meeting.title}) deleted`);
        res.json({meeting});
      }
    }).catch(function () {
    return res.status(422).json({
      errors: {
        message: MEETING_NONEXISTENT_MSG
      }
    });
  })
});


module.exports = router;
