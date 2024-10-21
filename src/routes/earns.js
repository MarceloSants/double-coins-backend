const express = require('express');
const bodyParser = require('body-parser');

const { addEarn, getEarnById } = require('../database/earn');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, async (req, res) => {
  const { userId, value, description, date } = req.body;

  const earn = await addEarn(userId, value, description, date);

  res.send({ id: earn.id });
});

router.get('/:id', async (req, res) => {
  console.log('getEarn by Id');

  const { id } = req.params;

  const earn = await getEarnById(id);

  res.send(earn);
});

module.exports = router;
