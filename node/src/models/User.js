const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleid: String,
  name: String,
  email: String,
}, {timestamps: true});

mongoose.model('User', UserSchema);
