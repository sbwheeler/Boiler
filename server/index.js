const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');
const session = require('express-session');
const passport = require('passport');

const apiRouter = require('./routes');
const db = require('./db');

const isProduction = process.env.NODE_ENV === 'production';
const PORT = isProduction ? process.env.PORT : 3000;

const app = express();

// allowing us to use local or heroku env variables for security during deployment
// SEE: https://devcenter.heroku.com/articles/config-vars
app.use(session({
  secret: process.env.SESSION_SECRET || 'samboiler',
  resave: false,
  saveUninitialized: false,
}));

// initializing passport
app.use(passport.initialize());
app.use(passport.session());

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

// initializing express logging, parsing, and static routing
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// api router requests
app.use('/api', apiRouter);

// error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).end();
});

// this will default any unknown route to send them our index.html, preventing the CANNOT GET /route error
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// pull in our models
require('./db/models');

// sync our db
db.sync()
  .then(() => {
    console.log(chalk.blue('database is synced!'));
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(chalk.green(`server running on ${PORT}`));
    });
  });
