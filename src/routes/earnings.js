const express = require('express');
const { validationResult } = require('express-validator');

const {
  getEarningById,
  updateEarningById,
  removeEarningById,
} = require('../database/earning');
const {
  earningIdValidator,
  earningValidator,
} = require('../validators/earningValidators');

const router = express.Router();

const updateValidator = earningIdValidator.concat(earningValidator);

router.get('/:id', earningIdValidator, async (req, res) => {
  const { id } = req.params;

  const result = validationResult(req);

  if (result.isEmpty()) {
    const earning = await getEarningById(id);

    return res.send(earning);
  }

  res.status(400).json({ errors: result.array() });
});

router.put('/:id', updateValidator, async (req, res) => {
  const { id } = req.params;
  const { value, description, date } = req.body;

  const result = validationResult(req);

  if (result.isEmpty()) {
    const updateResult = await updateEarningById(id, value, description, date);

    return res.send({ result: updateResult });
  }

  res.status(400).json({ errors: result.array() });
});

router.delete('/:id', earningIdValidator, async (req, res) => {
  const { id } = req.params;

  const result = validationResult(req);

  if (result.isEmpty()) {
    const result = await removeEarningById(id);

    return res.send({ result: result });
  }

  res.status(400).json({ errors: result.array() });
});

module.exports = router;
