const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const mongoose = require('mongoose');
const log = require('../util/log');

const User = mongoose.model('User');

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/api/auth/google/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    User.findOne({ googleid: profile.id }).then((user) => {
      if (!user) {
        log.log(`User (${profile.displayName}) not found, creating new one`);
        const new_user = new User({
          googleid: profile.id,
          name: profile.displayName,
          avatar: profile.photos[0].value,
          email: profile.emails[0].value,
        });
        new_user.save(() => done(null, new_user));
      } else {
        log.log(`User (${profile.displayName}) found`);
        return done(null, user);
      }
    }).catch(done);
  }),
);
