const Sequelize = require('sequelize');
const chalk = require('chalk');

// YOUR DB NAME HERE
const DB_NAME = 'boiler';
module.exports = new Sequelize(`postgres://localhost5432/${DB_NAME}`, {
  logging: false,
});

