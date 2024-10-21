const { sequelize } = require('../config/sequelize');

async function addEarning(userId, value, description, date) {
  const earning = sequelize.models.earnings.create({
    userId,
    value,
    description,
    date,
  });

  return earning;
}

async function getEarningById(earningId) {
  const earning = sequelize.models.earnings.findOne({
    where: {
      id: earningId,
    },
  });

  return earning;
}

async function getEarningsByUserId(userId) {
  const earnings = sequelize.models.earnings.findAll({
    where: {
      userId: userId,
    },
  });

  return earnings;
}

module.exports = { addEarning, getEarningById, getEarningsByUserId };
