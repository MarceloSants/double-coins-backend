const { sequelize } = require('./config/sequelize');
const { defineEarning } = require('./models/earning');
const { defineExpense } = require('./models/expense');
const { defineUser } = require('./models/user');

function defineTables() {
  defineUser();
  defineEarning();
  defineExpense();
}

async function createTables() {
  await sequelize.sync({ force: false });
}

module.exports = { defineTables, createTables };
