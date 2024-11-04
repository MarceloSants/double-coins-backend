const express = require('express');
const { validationResult } = require('express-validator');

const { addUser, getUserById } = require('../database/user');
const { getEarningsByUserId, addEarning } = require('../database/earning');
const { getExpensesByUserId, addExpense } = require('../database/expenses');
const {
  userValidator,
  userIdValidator,
} = require('../validators/userValidators');
const { earningValidator } = require('../validators/earningValidators');
const { expenseValidator } = require('../validators/expenseValidators');
const authenticateToken = require('../auth');

const router = express.Router();

const earningPostValidator = earningValidator.concat(userIdValidator);
const expensePostValidator = expenseValidator.concat(userIdValidator);

/* User */

// router.get('/:userId', userIdValidator, async (req, res) => {
//   const { userId } = req.params;

//   const result = validationResult(req);

//   if (result.isEmpty()) {
//     const user = await getUserById(userId);

//     if (user) {
//       return res.send(user);
//     } else {
//       return res
//         .status(400)
//         .json({ error: `cannot find a user with id ${userId}` });
//     }
//   }

//   res.status(400).json({ errors: result.array() });
// });

/* Eanings */

router.post(
  '/:userId/earnings',
  [authenticateToken, earningPostValidator],
  async (req, res) => {
    const { userId } = req.params;
    const { value, description, date } = req.body;

    try {
      const result = validationResult(req);
      if (result.isEmpty()) {
        if (req.user.id.toString() === userId) {
          const earning = await addEarning(userId, value, description, date);

          return res.send({ id: earning.id });
        }
        return res.sendStatus(403);
      }

      res.status(400).json({ errors: result.array() });
    } catch (error) {
      res.status(500).json({
        message: 'Error adding earning',
        error: error.message || error.toString(),
      });
    }
  }
);

router.get(
  '/:userId/earnings',
  [authenticateToken, userIdValidator],
  async (req, res) => {
    const { userId } = req.params;

    try {
      const result = validationResult(req);

      if (result.isEmpty()) {
        if (req.user.id.toString() === userId) {
          const earnings = await getEarningsByUserId(userId);

          return res.send(earnings);
        }
        return res.sendStatus(403);
      }

      res.status(400).json({ errors: result.array() });
    } catch (error) {
      res.status(500).json({
        message: 'Error getting earnings',
        error: error.message || error.toString(),
      });
    }
  }
);

/* Expenses */

router.post(
  '/:userId/expenses',
  [authenticateToken, expensePostValidator],
  async (req, res) => {
    const { userId } = req.params;
    const { value, description, category, date } = req.body;

    try {
      const result = validationResult(req);

      if (result.isEmpty()) {
        if (req.user.id.toString() === userId) {
          const expense = await addExpense(
            userId,
            value,
            description,
            category,
            date
          );

          return res.send({ id: expense.id });
        }

        return res.sendStatus(403);
      }

      res.status(400).json({ errors: result.array() });
    } catch (error) {
      res.status(500).json({
        message: 'Error adding expense',
        error: error.message || error.toString(),
      });
    }
  }
);

router.get(
  '/:userId/expenses',
  [authenticateToken, userIdValidator],
  async (req, res) => {
    const { userId } = req.params;

    try {
      const result = validationResult(req);

      if (result.isEmpty()) {
        if (req.user.id.toString() === userId) {
          const expenses = await getExpensesByUserId(userId);

          return res.send(expenses);
        }

        return res.sendStatus(403);
      }

      res.status(400).json({ errors: result.array() });
    } catch (error) {
      res.status(500).json({
        message: 'Error getting expenses',
        error: error.message || error.toString(),
      });
    }
  }
);

module.exports = router;
