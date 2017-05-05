const Sequelize = require('sequelize');
const chalk = require('chalk');

// YOUR DB NAME HERE
const DB_NAME = 'boiler';

// set up to handle heroku database environment variable
module.exports = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`, {
  logging: false,
});
