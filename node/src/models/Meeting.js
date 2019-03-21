const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  name: String,
  time: Date,
  location: String,
  invitees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  agendas: [String], // TODO
  team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
  start: Date,
  end: Date
});

mongoose.model('Meeting', MeetingSchema);
