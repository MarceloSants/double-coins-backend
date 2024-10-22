const express = require('express');

const {
  getEarningById,
  updateEarningById,
  removeEarningById,
} = require('../database/earning');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const earning = await getEarningById(id);

  res.send(earning);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { value, description, date } = req.body;

  const result = await updateEarningById(id, value, description, date);

  res.send({ result: result });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await removeEarningById(id);

  res.send({ result: result });
});

module.exports = router;
