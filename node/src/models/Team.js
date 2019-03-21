const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: String,
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

mongoose.model('Team', TeamSchema);
