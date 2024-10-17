const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

const usersRoute = require('./src/routes/users');
const earnsRoute = require('./src/routes/earns');
const expensesRoute = require('./src/routes/expenses');

var cors = require('cors');
app.use(cors());

app.use('/users', usersRoute);
app.use('/earns', earnsRoute);
app.use('/expenses', expensesRoute);

app.listen(port, () => {
  console.log(`Node.js HTTP server is running on port ${port}`);
});
