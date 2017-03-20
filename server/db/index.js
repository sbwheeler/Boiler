const Sequelize = require('sequelize');
const DB_NAME = 'boiler';
const db = new Sequelize(`postgres://localhost5432/${DB_NAME}`, {
  logging: false,
});

