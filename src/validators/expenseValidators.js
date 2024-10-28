const { body, param } = require('express-validator');

const expenseValidator = [
  body('value', 'The value is empty.').notEmpty(),
  body('value', 'The value is not a float value.').isFloat(),

  body('description', 'The description is empty.').notEmpty(),

  body('category', 'The category is empty.').notEmpty(),

  body('date', 'The date is empty.').notEmpty(),
  body('date', 'Date must be in format YYYY-MM-DD HH:mm:ss.')
    .matches(/^\d{4}-\d{1,2}-\d{1,2} \d{2}:\d{2}:\d{2}$/)
    .custom((value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date value.');
      }
      return true;
    }),
];

const expenseIdValidator = [
  param('id', 'The expenseId is empty.').notEmpty(),
  param('id', 'The expenseId is not an integer value.').isInt(),
];

module.exports = { expenseValidator, expenseIdValidator };
