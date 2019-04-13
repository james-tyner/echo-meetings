const mongoose = require('mongoose');

const Team = mongoose.model('Team');
const User = mongoose.model('User');

const AgendaSchema = new mongoose.Schema({
  title: String,
  description: String,
  notes: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

const MeetingSchema = new mongoose.Schema({
  title: String,
  time: Date,
  location: String,
  invitees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: _id => User.countDocuments({ _id }).then(doc => doc > 0),
      message: 'User non existent',
    },
  }],
  agendas: [AgendaSchema],
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    validate: {
      validator: _id => Team.countDocuments({ _id }).then(doc => doc > 0),
      message: 'Team non existent',
    },
  },
  start: Date,
  end: Date,
});


mongoose.model('Meeting', MeetingSchema);
