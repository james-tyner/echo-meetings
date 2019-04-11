const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: String,
  description: String,
  color: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  invitations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invitation' }]
}, {timestamps: true});

mongoose.model('Team', TeamSchema);
