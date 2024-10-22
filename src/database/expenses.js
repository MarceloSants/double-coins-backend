const { sequelize } = require('../config/sequelize');

async function addExpense(userId, value, description, category, date) {
  const expense = await sequelize.models.expenses.create({
    userId,
    value,
    description,
    category,
    date,
  });

  return expense;
}

async function getExpenseById(expenseId) {
  const expense = await sequelize.models.expenses.findOne({
    where: {
      id: expenseId,
    },
  });

  return expense;
}

async function getExpensesByUserId(userId) {
  const expenses = await sequelize.models.expenses.findAll({
    where: {
      userId: userId,
    },
  });

  return expenses;
}

module.exports = { addExpense, getExpenseById, getExpensesByUserId };
