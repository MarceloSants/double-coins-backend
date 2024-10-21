const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

function defineUser() {
  sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}

module.exports = { defineUser };
