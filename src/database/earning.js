const { where } = require('sequelize');
const { sequelize } = require('../config/sequelize');

async function addEarning(userId, value, description, date) {
  const earning = await sequelize.models.earnings.create({
    userId,
    value,
    description,
    date,
  });

  return earning;
}

async function getEarningById(earningId) {
  const earning = await sequelize.models.earnings.findOne({
    where: {
      id: earningId,
    },
  });

  return earning;
}

async function getEarningsByUserId(userId) {
  const earnings = await sequelize.models.earnings.findAll({
    where: {
      userId: userId,
    },
  });

  return earnings;
}

async function updateEarningById(earningId, value, description, date) {
  const result = await sequelize.models.earnings.update(
    { value: value, description: description, date: date },
    {
      where: {
        id: earningId,
      },
    }
  );

  return result[0] === 1;
}

async function removeEarningById(earningId) {
  const result = await sequelize.models.earnings.destroy({
    where: {
      id: earningId,
    },
  });

  return result === 1; // One instance removed
}

module.exports = {
  addEarning,
  getEarningById,
  getEarningsByUserId,
  updateEarningById,
  removeEarningById,
};
