const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');
const session = require('express-session');

const routes = require('./routes');
const db = require('./db');

const isProduction = process.env.NODE_ENV === 'production';
const PORT = isProduction ? process.env.PORT : 3000;

const app = express();

// allowing us to use local or heroku env variables for security during deployment
app.use(session({
  secret: process.env.SESSION_SECRET || 'samboiler',
  resave: false,
  saveUninitialized: false,
}));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', routes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).end();
});

// this will default any unknown route to send them our index.html, preventing the CANNOT GET /route error
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// pull in our models
require('./db/models');

db.sync()
  .then(() => {
    console.log(chalk.blue('database is synced!'));
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(chalk.green(`server running on ${PORT}`));
    });
  });
