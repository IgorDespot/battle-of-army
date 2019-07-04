const jwt = require('jsonwebtoken');
const { tokenCheck, reloadTime } = require('./utils');
const Join = require('./joinSchema');
const event = require('./event');
const { logger } = require('../../config/log');

const join = (req, res) => {
  const tokenHead = req.headers['x-access-token'];
  if (tokenHead) {
    const result = tokenCheck(tokenHead);
    if (!result) {
      res.status(401).json({
        success: false,
        message: 'Token is not valid',
      });
    } else {
      logger.info(`Recived call for rejoin from: ${req.body}`);
      let { joinSch } = result;
      Join.updateOne({ _id: joinSch._id, active: { $ne: true } },{ active: true })
        .then((res) => {
          event.emit('rejoin', joinSch);
        })
        .catch((err) => {
          return res.json({
          success: false,
          message: `Error happend when retriving user for rejoin: ${err}`
        })})
      
      return res.status(200).json({
        success: true,
        message: ''
      });
    }
  } else {
  logger.info(`Recived call for fresh join from: ${req.body}`);

  const joinSch = new Join({
    name: req.body.name,
    numberOfSquads: req.body.numberOfSquad,
    webHookUrl: req.body.webHookUrl,
    active: true,
  });

  logger.info(`Creating new schema: ${joinSch}`);

  const newToken = jwt.sign({ joinSch }, 'patka');
  joinSch.save()
    .then(() => {
      res.json({
        success: true,
        token: newToken,
      });
      event.emit('join', joinSch);
      logger.info('Successsfuly created new join');
    })
    .catch((error) => {
      logger.error(`Error happend when creating new join: ${error}`);
    });
  }
};

const leave = (req, res) => {
  const tokenHead = req.headers['x-access-token'];
  if (tokenHead) {
    const result = tokenCheck(tokenHead);
    if (!result) {
      res.status(401).json({
        success: false,
        message: 'Token is not valid',
      });
    }
    
    const { joinSch } = result;
    Join.updateOne({_id: joinSch._id}, { active: false })
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'Successfuly left battle to rejoin please use join route with your access token.'
        })
        event.emit('leave', joinSch);
      })
      .catch(err => res.json(err));
  } else {
    res.json({
      success: false,
      message: 'Token was not found, please provide token in header using X-Access-Token'
    });
  }
};

const attack = (req, res) => {
  const tokenHead = req.headers['x-access-token'];
  const result = tokenCheck(tokenHead);
    if (!result) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid',
      });
    }
    let { joinSch } = result;
    
    if (req.body.strategy === 'random') {
      Join.count().exec((err, count) => {
        let random = Math.round(Math.random() * count);
        Join.findOne().skip(random).exec((err, res) => {
          console.log(res);
        })
      })
    }

    // TODO
    setTimeout(() => {
      return res.status(200).json(result);
    }, reloadTime(joinSch.numberOfSquads))

    
    
}

module.exports = {
  join,
  leave,
  attack
};
