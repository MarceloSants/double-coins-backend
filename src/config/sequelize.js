const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.MY_SQL_DATABASE,
  process.env.MY_SQL_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.MY_SQL_HOST,
    dialect: 'mysql',
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection secceed!');
  })
  .catch((err) => {
    console.log('Database connection failed! ' + err);
  });

module.exports = { sequelize };
