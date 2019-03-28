const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

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
router.get('/google/redirect', (req, res, next) => {
    passport.authenticate('google', {}, (err, user, info) => {
      if(err) {
        console.log(err);
        return;
      }
      if (!user) {
        res.json(info);
      } else {
        user.token = user.generateJWT();
        return res.json({user: user.toAuthJSON()});
      }
    })(req, res, next)
  }
);

module.exports = router;
