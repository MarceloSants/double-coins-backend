const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

const usersRoute = require('./src/routes/users');
const earningsRoute = require('./src/routes/earnings');
const expensesRoute = require('./src/routes/expenses');
const { defineTables, createTables } = require('./src/database');

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use('/users', usersRoute);
app.use('/earnings', earningsRoute);
app.use('/expenses', expensesRoute);

app.listen(port, () => {
  console.log(`Node.js HTTP server is running on port ${port}`);
});

defineTables();
createTables();

module.exports = app;

// Todo: Edit and Delete functions
// Todo: Edit and Delete routes
// Todo: Validation
// Todo: Security
