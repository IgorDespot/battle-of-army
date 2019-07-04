const jwt = require('jsonwebtoken');
const rp = require('request-promise');
const { logger } = require('../../config/log');

require('dotenv').config();

const tokenCheck = (token) => {
  let decodedToken;
  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return false;
    }
    decodedToken = decoded;
  });
  return decodedToken;
};

const sendNotification = (data, joinType = 'new') => {
  data.forEach((element) => {
    rp({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      uri: element.webHookUrl,
      body: {
        id: element.id,
        squadsCount: element.numberOfSquads,
        join: joinType,
      },
      json: true,
    })
      .then(() => logger.info(`Successfuly sent notification to: ${element.id} participants`))
      .catch(err => logger.error(`Error happend when sending notifications: ${err}`));
  });
};

const sendNotificationLeave = (data) => {
  data.forEach((element) => {
    rp({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      uri: element.webHookUrl,
      body: {
        id: element.id,
        leave: 'left',
      },
      json: true,
    })
      .then(() => logger.info(`Successfuly sent notification to: ${element.id} participants`))
      .catch(err => logger.error(`Error happend when sending notifications: ${err}`));
  });
};

const reloadTime = squad => {
  return Math.max(Math.floor(squad / 10), 1) * 1000;
}

const attackSucc = (numOfSquads) => {
  for (let i=0; i<numOfSquads; i++) {
      let diceRoll = 100 - (Math.random() * 100);
      if (diceRoll < 1) {return Math.round(squad1 / i)};
  }
  return 0;
}

function receiveDamage(squad2, receivedDamage) {
  let diceRoll = 100 - (Math.random() * 100);
  let halfDamageChance = 100 - squad2;
  if (diceRoll < halfDamageChance) {
      return squad2 - receivedDamage/2;
  } else {
      return squad2 - receivedDamage;
  }
}

module.exports = {
  tokenCheck,
  sendNotification,
  sendNotificationLeave,
  reloadTime,
  attackSucc
};
