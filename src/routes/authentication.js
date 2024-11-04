const express = require('express');
const jwt = require('jsonwebtoken');

const { getUserByEmail, addUser } = require('../database/user');
const { userValidator } = require('../validators/userValidators');
const { validationResult } = require('express-validator');

const router = express.Router();

router.post('/register', userValidator, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      await addUser(name, email, password);
      return res.status(201).json({ message: 'User registered successfully' });
    }
    res.status(400).json({ errors: result.array() });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error registering user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user || !(user.password === password)) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

module.exports = router;
