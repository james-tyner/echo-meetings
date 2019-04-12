const router = require('express').Router();
const passport = require('passport');
const log = require('../../util/log');
require('dotenv').config();

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logging out');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// auth with google+
router.get('/google/redirect', (req, res, next) => {
  passport.authenticate('google', {}, (err, user, info) => {
    if (err) {
      log.error(err.stack);
      return;
    }
    if (!user) {
      res.json(info);
      log.error('User not found (This is not supposed to happen! Contact Mars.)');
    } else {
      user.token = user.generateJWT();
      log.log('Redirecting to front end');
      const url = `${process.env.FRONT_URL}?token=${user.toAuthJSON().token}`;
      res.send(`<body><script>location.href="${url}"</script></body>`);
    }
  })(req, res, next);
});

module.exports = router;
