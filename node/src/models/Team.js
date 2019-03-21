const mongoose = require('mongoose');
const User = mongoose.model('User');

const TeamSchema = new mongoose.Schema({
  name: String,
  description: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

mongoose.model('Team', TeamSchema);
