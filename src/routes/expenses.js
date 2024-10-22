const express = require('express');
const {
  getExpenseById,
  updateExpenseById,
  removeExpenseById,
} = require('../database/expenses');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const expense = await getExpenseById(id);

  res.send(expense);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { value, description, category, date } = req.body;

  const result = await updateExpenseById(
    id,
    value,
    description,
    category,
    date
  );

  res.send({ result: result });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await removeExpenseById(id);

  res.send({ result: result });
});

module.exports = router;
