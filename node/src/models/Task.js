const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  due: Date,
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: Number, min: 0, max: 2 },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' },
  // agenda: String, // TODO
}, { timestamps: true });

mongoose.model('Task', TaskSchema);
