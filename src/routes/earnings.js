const express = require('express');

const {
  getEarningById,
  updateEarningById,
  removeEarningById,
} = require('../database/earning');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // console.log(`TRying to get earning with id: ${id}`);
  const earning = await getEarningById(id);
  // console.log(`Rsult:`);
  // console.log(`${earning}`);

  res.send(earning);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { value, description, date } = req.body;

  // console.log(`Update earning with id: ${id}`);
  // console.log(`values to update:`);
  // console.log(`value: ${value}`);
  // console.log(`value: ${description}`);
  // console.log(`value: ${date}`);
  const result = await updateEarningById(id, value, description, date);

  res.send({ result: result });
  // res.send('updated');
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await removeEarningById(id);

  res.send({ result: result });
});

module.exports = router;
