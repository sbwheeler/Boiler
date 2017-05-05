const express = require('express');
const passport = require('passport');


const User = require('../db/models/User');


const router = express.Router();


// initializing passport
router.use(passport.initialize());
router.use(passport.session());

// serializing user with passport
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

module.exports = router;
