const express = require('express');
const session = require('express-session');

const router = express.Router();
// allowing us to use local or heroku env variables for security during deployment
// SEE: https://devcenter.heroku.com/articles/config-vars
router.use(session({
  secret: process.env.SESSION_SECRET || 'samboiler',
  resave: false,
  saveUninitialized: false,
}));

module.exports = router;
