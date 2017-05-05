const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');

const apiRouter = require('./routes');
const db = require('./db');

const isProduction = process.env.NODE_ENV === 'production';
const PORT = isProduction ? process.env.PORT : 3000;

const app = express();

// use session and passport middleware
app.use(require('./app/sessions-middleware.js'));
app.use(require('./app/passport-middleware.js'));

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

// this will default any unknown route to our index.html, preventing the CANNOT GET /route error
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
