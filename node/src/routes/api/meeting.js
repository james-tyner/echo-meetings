const log = require('../../util/log')
const router = require('express').Router();
const mongoose = require('mongoose');
const Team = mongoose.model('Team');
const User = mongoose.model('User');
const Meeting = mongoose.model('Meeting');

const auth = require('../auth');

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
router.get("/", async (req, res) => {
  const user = req.locals.user;
  Meeting.find({invitees: user.id})
    .populate('invitees').populate('agendas')
    .then((teams) => {
      res.json({"meetings": teams});
    });
});


// Create a Meeting
router.post("/", async (req, res, next) => {
  const user = req.locals.user;
  log.log('Creating a meeting');
  const req_meeting = req.body.meeting;
  if (!req_meeting) {
    return res.status(422).json({
      errors: {
        message: "no meeting field"
      }
    });
  }
  // required fields: title, time, team
  if (!req_meeting.name) {
    return res.status(422).json({
      errors: {
        message: "name can't be blank"
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
  meeting.name = req_meeting.name;
  meeting.time = req_meeting.time;
  meeting.team = req_meeting.team;
  // only update fields that were actually passed...
  if (typeof req_meeting.location !== 'undefined') {
    meeting.location = req_meeting.location
  }
  // add invitees to the team
  if (typeof req_meeting.invitees !== 'undefined') {
    meeting.invitees = req_meeting.invitees
  }

  // this will perform validation of team and members
  meeting.save().then(() => {
    log.log(`Meeting (${meeting.name}) created`);
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

module.exports = router;
