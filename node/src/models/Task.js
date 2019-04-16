const mongoose = require('mongoose');

const Meeting = mongoose.model('Meeting');
const User = mongoose.model('User');

const TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  due: Date,
  assignees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: _id => User.countDocuments({ _id }).then(doc => doc > 0),
      message: 'User non existent',
    },
  }],
  status: { type: Number, min: 0, max: 2 },
  // team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  meeting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meeting',
    validate: {
      validator: _id => Meeting.countDocuments({ _id }).then(doc => doc > 0),
      message: 'Meeting non existent',
    },
  },
  agenda: { type: mongoose.Schema.Types.ObjectId, ref: 'Agenda' },
}, { timestamps: true });

TaskSchema.methods.validateAgenda = function () {
  return Meeting
    .countDocuments({ _id: this.meeting, 'agendas._id': { $in: [this.agenda] } })
    .then(doc => doc > 0);
};

mongoose.model('Task', TaskSchema);
