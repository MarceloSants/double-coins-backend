const { sequelize } = require('../config/sequelize');

async function addUser(name, email, password) {
  const user = await sequelize.models.users.create({
    name: name,
    email: email,
    password: password,
  });

  return user;
}

async function getUserById(id) {
  const user = await sequelize.models.users.findOne({
    where: {
      id: id,
    },
  });

  return user;
}

module.exports = { addUser, getUserById };
