const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: String,
  description: String,
  color: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {timestamps: true});

mongoose.model('Team', TeamSchema);
