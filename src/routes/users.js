const express = require('express');
const bodyParser = require('body-parser');

const { addUser, getUser } = require('../database/user');
const { getEarnsByUser } = require('../database/earn');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, async (req, res) => {
  const { name, email, password } = req.body;

  const user = await addUser(name, email, password);

  res.send({ id: user.id });
});

router.get('/', async (req, res) => {
  console.log('get user by name');
  const { name } = req.query;
  console.log(name);

  const user = await getUser(name);
  console.log(user);

  res.send(user);
});

router.get('/:userId/earns', async (req, res) => {
  const { userId } = req.params;

  const earns = await getEarnsByUser(userId);

  res.send(earns);
});

module.exports = router;
