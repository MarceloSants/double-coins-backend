const express = require('express');
const { getExpenseById } = require('../database/expenses');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const expense = await getExpenseById(id);

  res.send(expense);
});

module.exports = router;
