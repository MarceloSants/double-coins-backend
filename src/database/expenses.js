const { sequelize } = require('../config/sequelize');

async function addExpense(userId, value, description, category, date) {
  const expense = sequelize.models.expenses.create({
    userId,
    value,
    description,
    category,
    date,
  });

  return expense;
}

async function getExpenseById(expenseId) {
  const expense = sequelize.models.expenses.findOne({
    where: {
      id: expenseId,
    },
  });

  return expense;
}

async function getExpensesByUserId(userId) {
  const expenses = sequelize.models.expenses.findAll({
    where: {
      userId: userId,
    },
  });

  return expenses;
}

module.exports = { addExpense, getExpenseById, getExpensesByUserId };
