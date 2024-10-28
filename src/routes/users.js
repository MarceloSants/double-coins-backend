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

const router = express.Router();

const earningPostValidator = earningValidator.concat(userIdValidator);
const expensePostValidator = expenseValidator.concat(userIdValidator);

/* User */

router.post('/', userValidator, async (req, res) => {
  const { name, email, password } = req.body;

  const result = validationResult(req);
  if (result.isEmpty()) {
    const user = await addUser(name, email, password);

    return res.send({ id: user.id });
  }

  res.status(400).json({ errors: result.array() });
});

router.get('/:userId', userIdValidator, async (req, res) => {
  const { userId } = req.params;

  const result = validationResult(req);

  if (result.isEmpty()) {
    const user = await getUserById(userId);

    if (user) {
      return res.send(user);
    } else {
      return res
        .status(400)
        .json({ error: `cannot find a user with id ${userId}` });
    }
  }

  res.status(400).json({ errors: result.array() });
});

/* Eanings */

router.post('/:userId/earnings', earningPostValidator, async (req, res) => {
  const { userId } = req.params;
  const { value, description, date } = req.body;

  const result = validationResult(req);
  if (result.isEmpty()) {
    const earning = await addEarning(userId, value, description, date);

    return res.send({ id: earning.id });
  }

  res.status(400).json({ errors: result.array() });
});

router.get('/:userId/earnings', userIdValidator, async (req, res) => {
  const { userId } = req.params;

  const result = validationResult(req);

  if (result.isEmpty()) {
    const earnings = await getEarningsByUserId(userId);

    return res.send(earnings);
  }

  res.status(400).json({ errors: result.array() });
});

/* Expenses */

router.post('/:userId/expenses', expensePostValidator, async (req, res) => {
  const { userId } = req.params;
  const { value, description, category, date } = req.body;

  const result = validationResult(req);

  if (result.isEmpty()) {
    const expense = await addExpense(
      userId,
      value,
      description,
      category,
      date
    );

    return res.send({ id: expense.id });
  }

  res.status(400).json({ errors: result.array() });
});

router.get('/:userId/expenses', userIdValidator, async (req, res) => {
  const { userId } = req.params;

  const result = validationResult(req);

  if (result.isEmpty()) {
    const expenses = await getExpensesByUserId(userId);

    return res.send(expenses);
  }

  res.status(400).json({ errors: result.array() });
});

module.exports = router;
