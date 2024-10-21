const express = require('express');
const bodyParser = require('body-parser');

const { addUser, getUserById } = require('../database/user');
const { getEarnsByUserId } = require('../database/earn');
const { getExpensesByUserId } = require('../database/expenses');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, async (req, res) => {
  const { name, email, password } = req.body;

  const user = await addUser(name, email, password);

  res.send({ id: user.id });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await getUserById(id);
  console.log(user);

  res.send(user);
});

router.get('/:userId/earns', async (req, res) => {
  const { userId } = req.params;

  const earns = await getEarnsByUserId(userId);

  res.send(earns);
});

router.get('/:userId/expenses', async (req, res) => {
  const { userId } = req.params;

  const expenses = await getExpensesByUserId(userId);

  res.send(expenses);
});

module.exports = router;
