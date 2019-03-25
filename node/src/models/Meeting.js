const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
  title: String,
  description: String,
  notes: String,
  actions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
}, {timestamps: true});

const MeetingSchema = new mongoose.Schema({
  name: String,
  time: Date,
  location: String,
  invitees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  agendas: [AgendaSchema],
  team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
  start: Date,
  end: Date
});

mongoose.model('Meeting', MeetingSchema);
