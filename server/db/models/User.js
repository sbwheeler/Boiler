const Sequelize = require('sequelize');
const crypto = require('crypto');
const _ = require('lodash');

const db = require('../');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    validate: {
      isEmpty: false
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmpty: false,
      isEmail: true,
      unique: true,
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING,
  },
}, {
  instanceMethods: {
    sanitize: function () {
      return _.omit(this.toJSON(), ['password', 'salt']);
    },
    correctPassword: function (candidatePassword) {
      return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
    },
  },
  classMethods: {
    generateSalt: function () {
      return crypto.randomBytes(16).toString('base64'); 
    },
    encryptPassword: function (plaintext, salt) {
      const hash = crypto.createHash('sha1');
      hash.update(plainText);
      hash.update(salt);
      return hash.digest('hex');
    },
  },
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword,
  },
});

const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = user.Model.generateSalt();
    user.password = user.Model.encryptPassword(user.password, user.salt);
  }
}
