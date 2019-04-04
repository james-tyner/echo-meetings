const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logging out');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// auth with google+
router.get('/google/redirect', (req, res, next) => {
    passport.authenticate('google', {}, (err, user, info) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!user) {
        res.json(info);
        console.log('user not found');
      } else {
        user.token = user.generateJWT();
        console.log('redirecting');
        const url = process.env.FRONT_URL + "?token=" + user.toAuthJSON().token;
        res.send('<body><script>location.href="' + url + '"</script></body>');
      }
      console.log('end');
    })(req, res, next);
  }
);

module.exports = router;
