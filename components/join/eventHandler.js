const event = require('./event');
const Join = require('./joinSchema');
const { sendNotification, sendNotificationLeave } = require('./utils');
const { logger } = require('../../config/log');

event.on('rejoin', (data) => {
  Join.find({ name: {$ne: data.name}, active: { $ne: false }})
    .then((res) => {
      if (res.length > 0) {
        sendNotification(res,'returned');
      }
    })
    .catch(err => logger.error(`Error when trying to get all data for rejoin event: ${err}`));
});

event.on('join', (data) => {
  Join.find({ name: { $ne: data.name }, active: { $ne: false } })
    .then((res) => {
      if (res.length > 0) {
        sendNotification(res);
      }
    })
    .catch(err => logger.error(`Error when trying to get all data for join event: ${err}`));
});


event.on('leave', (data) => {
  Join.find({ _id: { $ne: data._id  }, active: { $ne: false } })
    .then((res) => {
      if (res.length > 0) {
        sendNotificationLeave(res);
      }
    })
    .catch(err => logger.error(`Error when trying to get all data for leave event: ${err}`));
});
