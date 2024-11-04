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
const authenticateToken = require('../auth');

const router = express.Router();

const updateValidator = expenseIdValidator.concat(expenseValidator);

router.get(
  '/:id',
  [authenticateToken, expenseIdValidator],
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = validationResult(req);

      if (result.isEmpty()) {
        const expense = await getExpenseById(id);

        if (expense.userId === req.user.id) {
          return res.send(expense);
        }

        return res.sendStatus(403);
      }

      res.status(400).json({ errors: result.array() });
    } catch (error) {
      res.status(500).json({
        message: 'Error getting expense',
        error: error.message || error.toString(),
      });
    }
  }
);

router.put('/:id', [authenticateToken, updateValidator], async (req, res) => {
  const { id } = req.params;
  const { value, description, category, date } = req.body;

  try {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const expense = await getExpenseById(id);

      if (expense.userId === req.user.id) {
        const updateResult = await updateExpenseById(
          id,
          value,
          description,
          category,
          date
        );

        return res.send({ result: updateResult });
      }
      return res.sendStatus(403);
    }

    res.status(400).json({ errors: result.array() });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating expense',
      error: error.message || error.toString(),
    });
  }
});

router.delete(
  '/:id',
  [authenticateToken, expenseIdValidator],
  async (req, res) => {
    const { id } = req.params;

    try {
      const result = validationResult(req);

      if (result.isEmpty()) {
        const expense = await getExpenseById(id);

        if (expense.userId === req.user.id) {
          const result = await removeExpenseById(id);

          return res.send({ result: result });
        }

        return res.sendStatus(403);
      }

      res.status(400).json({ errors: result.array() });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting expense',
        error: error.message || error.toString(),
      });
    }
  }
);

module.exports = router;
