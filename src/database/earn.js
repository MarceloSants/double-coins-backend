const { sequelize } = require('../config/sequelize');

async function addEarn(userId, value, description, date) {
  const earn = sequelize.models.earns.create({
    userId,
    value,
    description,
    date,
  });

  return earn;
}

async function getEarnById(earnId) {
  const earn = sequelize.models.earns.findOne({
    where: {
      id: earnId,
    },
  });

  return earn;
}

async function getEarnsByUserId(userId) {
  const earns = sequelize.models.earns.findAll({
    where: {
      userId: userId,
    },
  });

  return earns;
}

module.exports = { addEarn, getEarnById, getEarnsByUserId };
