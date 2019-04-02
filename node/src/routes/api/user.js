const router = require('express').Router();
const mongoose = require('mongoose');
const auth = require('../auth');
const User = mongoose.model('User');

router.get("/", auth.required, async (req, res) => {
  console.log('get user');
  User.findById(req.payload.id).then(function (user) {
    res.json(user);
  });
});

module.exports = router;
