const express = require('express');

const { getEarningById } = require('../database/earning');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const earning = await getEarningById(id);

  res.send(earning);
});

module.exports = router;
