const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: String,
  due: Date,
  assignees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  comments: String,
  status: Number,
  team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
  meeting: {type: mongoose.Schema.Types.ObjectId, ref: 'Meeting'},
  agenda: String, // TODO
});

mongoose.model('Task', TaskSchema);
