const express = require('express');

const { addUser, getUserById } = require('../database/user');
const { getEarningsByUserId, addEarning } = require('../database/earning');
const { getExpensesByUserId, addExpense } = require('../database/expenses');

const router = express.Router();

/* User */

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const user = await addUser(name, email, password);

  res.send({ id: user.id });
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  const user = await getUserById(userId);

  res.send(user);
});

/* Eanings */

router.post('/:userId/earnings', async (req, res) => {
  const { userId } = req.params;
  const { value, description, date } = req.body;

  const earning = await addEarning(userId, value, description, date);

  res.send({ id: earning.id });
});

router.get('/:userId/earnings', async (req, res) => {
  const { userId } = req.params;

  const earnings = await getEarningsByUserId(userId);

  res.send(earnings);
});

/* Expenses */

router.post('/:userId/expenses', async (req, res) => {
  const { userId } = req.params;
  const { value, description, category, date } = req.body;

  const expense = await addExpense(userId, value, description, category, date);

  res.send({ id: expense.id });
});

router.get('/:userId/expenses', async (req, res) => {
  const { userId } = req.params;

  const expenses = await getExpensesByUserId(userId);

  res.send(expenses);
});

module.exports = router;
