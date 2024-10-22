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

async function updateExpenseById(
  expenseId,
  value,
  description,
  category,
  date
) {
  const result = await sequelize.models.expenses.update(
    { value: value, description: description, category: category, date: date },
    {
      where: {
        id: expenseId,
      },
    }
  );

  return result[0] === 1;
}

async function removeExpenseById(expenseId) {
  const result = await sequelize.models.expenses.destroy({
    where: {
      id: expenseId,
    },
  });

  return result === 1; // One instance removed
}

module.exports = {
  addExpense,
  getExpenseById,
  getExpensesByUserId,
  updateExpenseById,
  removeExpenseById,
};
