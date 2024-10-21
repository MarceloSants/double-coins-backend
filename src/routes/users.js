const express = require('express');
const bodyParser = require('body-parser');

const { addUser, getUser } = require('../database/user');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, async (req, res) => {
  const { name, email, password } = req.body;

  const user = await addUser(name, email, password);

  res.send({ id: user.id });
});

// router.get('/', async (req, res) => {
//   console.log('getUSer');

//   const user = await getUser('Marcelo2');

//   // console.log('user send');
//   // console.log(user);

//   res.send(user);
// });

router.get('/', async (req, res) => {
  console.log('get user by name');
  const { name } = req.query;
  console.log(name);

  const user = await getUser(name);
  console.log(user);

  res.send(user);
});

module.exports = router;
