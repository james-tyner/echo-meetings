const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  googleid: String,
  name: String,
  avatar: String,
  email: String,
}, { timestamps: true });


UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  // TODO exp
  return jwt.sign({
    id: this._id,
    name: this.name,
    exp: parseInt(exp.getTime() / 1000),
  }, 'adlfkjas324jbdfadkjfas');
};

UserSchema.methods.toAuthJSON = function () {
  return {
    name: this.name,
    token: this.generateJWT(),
  };
};

mongoose.model('User', UserSchema);
