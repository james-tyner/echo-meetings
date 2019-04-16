const router = require('express').Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Task = mongoose.model('Task');
const Meeting = mongoose.model('Meeting');

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
    .populate({
      path: 'meeting',
      populate: {
        path: 'team',
        populate: {
          path: 'members'
        }
      },
    })
    .then((tasks) => {
      res.json({ tasks });
    });
});


// Create a Task
router.post('/', async (req, res) => {
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
  task.name = req_task.name;
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
        Meeting.findOne({ _id: task.meeting })
          .then((meeting) => {
            let agenda = null;
            let index;
            for (index = 0; index < meeting.agendas.length; index++) {
              if (meeting.agendas[index]._id.equals(task.agenda)) {
                agenda = meeting.agendas[index];
                break;
              }
            }
            agenda.tasks.push(task._id);
            meeting.agendas.set(index, agenda);
            meeting.save().then(() => {
              log.log(`Task (${task.name}) created`);
              return res.json({ task });
            });
          });
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
    } else {
      return res.status(422).json({
        errors: { message: 'Agenda does not exist' },
      });
    }
  });
});

const TASK_NONEXISTENT_MSG = "Task does not exist, or user doesn't have permission to access this task";

// Update a task
router.put('/:t_id', async (req, res) => {
  log.log('Modifying a task');
  const { user } = req.locals;
  Task.findById(req.params.t_id)
    .then((task) => {
      Meeting.findOne({ _id: task.meeting, invitees: user._id }).then((meeting) => {
        if (!meeting) {
          return res.status(422).json({
            errors: {
              message: TASK_NONEXISTENT_MSG,
            },
          });
        }
        const req_task = req.body.task;
        if (!req_task) {
          return res.status(422).json({
            errors: {
              message: 'no task field',
            },
          });
        }
        // only update fields that were actually passed...
        if (typeof req_task.name !== 'undefined') {
          task.name = req_task.name;
        }
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
        task.save().then(() => {
          log.log(`Task (${task.name}) updated`);
          return res.json({ task });
        })
          .catch((err) => {
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
    });
});


// Delete a task
router.delete('/:t_id', async (req, res) => {
  log.log('Deleting an task');
  const { user } = req.locals;
  Task.findById(req.params.t_id)
    .then((task) => {
      if (!task) {
        return res.status(422).json({
          errors: {
            message: TASK_NONEXISTENT_MSG,
          },
        });
      }
      Meeting.findOne({ _id: task.meeting, invitees: user._id }).then((meeting) => {
        if (!meeting) {
          return res.status(422).json({
            errors: {
              message: TASK_NONEXISTENT_MSG,
            },
          });
        }
        let agenda = null;
        let index;
        for (index = 0; index < meeting.agendas.length; index++) {
          if (meeting.agendas[index]._id.equals(task.agenda)) {
            agenda = meeting.agendas[index];
            break;
          }
        }
        for (let j = 0; j < agenda.tasks.length; j++) {
          if (agenda.tasks[j]._id.equals(task._id)) {
            agenda.tasks.splice(j, 1);
            break;
          }
        }
        meeting.agendas.set(index, agenda);
        meeting.save().then(() => {
          Task.findByIdAndDelete(req.params.t_id).then(() => {
            log.log(`Task (${task.name}) deleted`);
            return res.json({ task });
          });
        })
          .catch((err) => {
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
    });
});


module.exports = router;
