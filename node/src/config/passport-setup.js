const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/api/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log('passport cb fired');
    console.log(profile);
    console.log(profile.emails);
    // console.log(profile.photos[0].value);
    User.findOne({ googleid: profile.id }).then(function (user) {
      if (!user) {
        console.log("user not found, creating new one");
        const new_user = new User({
          googleid: profile.id,
          name: profile.displayName,
          avatar: profile.photos[0].value,
          email: profile.emails[0].value
        });
        new_user.save(function () {
          return done(null, new_user);
        });
      } else {
        console.log('user found');
        return done(null, user);
      }
    }).catch(done);
  })
);
