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
const authenticateToken = require('../auth');

const router = express.Router();

const updateValidator = earningIdValidator.concat(earningValidator);

router.get(
  '/:id',
  [authenticateToken, earningIdValidator],
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = validationResult(req);

      if (result.isEmpty()) {
        const earning = await getEarningById(id);

        if (earning.userId === req.user.id) {
          return res.send(earning);
        }
        return res.sendStatus(403);
      }

      res.status(400).json({ errors: result.array() });
    } catch (error) {
      res.status(500).json({
        message: 'Error getting earning',
        error: error.message || error.toString(),
      });
    }
  }
);

router.put('/:id', [authenticateToken, updateValidator], async (req, res) => {
  const { id } = req.params;
  const { value, description, date } = req.body;

  try {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const earning = await getEarningById(id);

      if (earning.userId === req.user.id) {
        const updateResult = await updateEarningById(
          id,
          value,
          description,
          date
        );

        return res.send({ result: updateResult });
      }

      return res.sendStatus(403);
    }

    res.status(400).json({ errors: result.array() });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating earning',
      error: error.message || error.toString(),
    });
  }
});

router.delete(
  '/:id',
  [authenticateToken, earningIdValidator],
  async (req, res) => {
    const { id } = req.params;

    try {
      const result = validationResult(req);

      if (result.isEmpty()) {
        const earning = await getEarningById(id);

        if (earning.userId === req.user.id) {
          const result = await removeEarningById(id);

          return res.send({ result: result });
        }

        return res.sendStatus(403);
      }

      res.status(400).json({ errors: result.array() });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting earning',
        error: error.message || error.toString(),
      });
    }
  }
);

module.exports = router;
