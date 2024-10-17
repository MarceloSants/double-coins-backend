const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

function defineExpense() {
  sequelize.define('expenses', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: sequelize.models.users, key: 'id' },
    },
    value: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
  });
}

export { defineExpense };
