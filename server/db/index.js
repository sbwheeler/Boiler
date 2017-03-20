const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost5432/boiler', {
  logging: false,
});

