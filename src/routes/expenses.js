const express = require('express');
const { validationResult } = require('express-validator');

const {
  getExpenseById,
  updateExpenseById,
  removeExpenseById,
} = require('../database/expenses');
const {
  expenseIdValidator,
  expenseValidator,
} = require('../validators/expenseValidators');

const router = express.Router();

const updateValidator = expenseIdValidator.concat(expenseValidator);

router.get('/:id', expenseIdValidator, async (req, res) => {
  const { id } = req.params;

  const result = validationResult(req);

  if (result.isEmpty()) {
    const expense = await getExpenseById(id);

    return res.send(expense);
  }

  res.status(400).json({ errors: result.array() });
});

router.put('/:id', updateValidator, async (req, res) => {
  const { id } = req.params;
  const { value, description, category, date } = req.body;

  const result = validationResult(req);

  if (result.isEmpty()) {
    const updateResult = await updateExpenseById(
      id,
      value,
      description,
      category,
      date
    );

    return res.send({ result: updateResult });
  }

  res.status(400).json({ errors: result.array() });
});

router.delete('/:id', expenseIdValidator, async (req, res) => {
  const { id } = req.params;

  const result = validationResult(req);

  if (result.isEmpty()) {
    const result = await removeExpenseById(id);

    return res.send({ result: result });
  }

  res.status(400).json({ errors: result.array() });
});

module.exports = router;
