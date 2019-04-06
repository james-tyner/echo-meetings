const log = require('../../util/log')
const router = require('express').Router();
const mongoose = require('mongoose');
const auth = require('../auth');
const User = mongoose.model('User');

// Get user info
router.get("/", auth.required, async (req, res) => {
  User.findById(req.payload.id).then(function (user) {
    res.json(user);
  });
});

module.exports = router;
