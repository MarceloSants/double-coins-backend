const express = require('express');
const bodyParser = require('body-parser');
const { addExpense, getExpenseById } = require('../database/expenses');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, async (req, res) => {
  const { userId, value, description, category, date } = req.body;

  const expense = await addExpense(userId, value, description, category, date);

  res.send({ id: expense.id });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const expense = await getExpenseById(id);

  res.send(expense);
});

module.exports = router;
