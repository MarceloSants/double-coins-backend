const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

function defineEarn() {
  sequelize.define('earns', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: sequelize.models.users, key: 'id' },
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
    },
  });
}

export { defineEarn };
