const { defineEarn } = require('./models/earn');
const { defineExpense } = require('./models/expense');
const { defineUser } = require('./models/user');

function defineTables() {
  defineUser();
  defineEarn();
  defineExpense();
}

async function createTables() {
  await sequelize.sync({ force: false });
}

export { defineTables, createTables };
