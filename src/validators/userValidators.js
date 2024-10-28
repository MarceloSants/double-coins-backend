const { body, param } = require('express-validator');

const userValidator = [
  body('name', 'The name is empty.').notEmpty(),

  body('email', 'The email is empty.').notEmpty(),
  body('email', 'The email is not a valid email address.').isEmail(),

  body('password', 'The password is empty.').notEmpty(),
];

const userIdValidator = [
  param('userId', 'The userId is empty.').notEmpty(),
  param('userId', 'The userId is not an integer value.').isInt(),
];

module.exports = { userValidator, userIdValidator };
