const Sequelize = require('sequelize');
const db = require('../');

const Model = db.define('model', {
  field: {
    type: Sequelize.STRING,
  },
});

module.exports = Model;
