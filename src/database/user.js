const { sequelize } = require('../config/sequelize');

async function addUser(name, email, password) {
  const user = await sequelize.models.users.create({
    name: name,
    email: email,
    password: password,
  });

  return user;
}

async function getUser(name) {
  const user = await sequelize.models.users.findOne({
    where: {
      name: name,
    },
  });

  return user;
}

module.exports = { addUser, getUser };
