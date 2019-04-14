const router = require('express').Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Task = mongoose.model('Task');

const log = require('../../util/log');
const auth = require('../auth');

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

// Get all Tasks
router.get('/', async (req, res) => {
  const { user } = req.locals;
  Task.find({ assignees: user.id })
    .populate('meeting')
    .then((tasks) => {
      res.json({ tasks });
    });
});


// Create a Task
router.post('/', async (req, res) => {
  const { user } = req.locals;
  log.log('Creating a task');
  const req_task = req.body.task;
  if (!req_task) {
    return res.status(422).json({
      errors: {
        message: 'no task field',
      },
    });
  }
  // required fields: name, meeting, agenda
  if (!req_task.name) {
    return res.status(422).json({
      errors: {
        message: "name can't be blank",
      },
    });
  }
  if (!req_task.meeting) {
    return res.status(422).json({
      errors: {
        message: "meeting can't be blank",
      },
    });
  }
  if (!req_task.agenda) {
    return res.status(422).json({
      errors: {
        message: "agenda can't be blank",
      },
    });
  }
  // build the task
  const task = new Task();
  task.title = req_task.title;
  task.meeting = req_task.meeting;
  task.agenda = req_task.agenda;
  // only update fields that were actually passed...
  if (typeof req_task.description !== 'undefined') {
    task.description = req_task.description;
  }
  if (typeof req_task.due !== 'undefined') {
    task.due = req_task.due;
  }
  task.assignees = [];
  if (typeof req_task.assignees !== 'undefined') {
    task.assignees = req_task.assignees;
  }
  task.validateAgenda().then((pass) => {
    if (pass) {
      // this will perform validation of meeting
      task.save().then(() => {
        log.log(`Task (${task.title}) created`);
        return res.json({ task });
      }).catch((err) => {
        console.log(err);
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
    } else {
      return res.status(422).json({
        errors: { message: 'Agenda does not exist' },
      });
    }
  });
});


module.exports = router;
