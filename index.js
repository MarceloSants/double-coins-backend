const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

const authRoute = require('./src/routes/authentication');
const usersRoute = require('./src/routes/users');
const earningsRoute = require('./src/routes/earnings');
const expensesRoute = require('./src/routes/expenses');
const { defineTables, createTables } = require('./src/database');

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use(authRoute);
app.use('/users', usersRoute);
app.use('/earnings', earningsRoute);
app.use('/expenses', expensesRoute);

app.listen(port, () => {
  console.log(`Node.js HTTP server is running on port ${port}`);
});

defineTables();
createTables();

module.exports = app;

// Done: Edit and Delete functions
// Done: Edit and Delete routes
// Done: Add test for edit and delete routes
// Done: Validation

// Todo: Security
