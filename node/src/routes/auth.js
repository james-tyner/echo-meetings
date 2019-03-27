const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

// return a list of tags
router.get('/', function (req, res) {
  res.send('you\'re at auth /')
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logging out');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// auth with google+
router.get('/google/redirect', (req, res) => {

  res.send('redirect');
});

module.exports = router;
