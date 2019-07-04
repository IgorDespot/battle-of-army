const router = require('express').Router();

const { join, leave } = require('./middleware');

module.exports = () => {
  router.post('/api/join', join);
  router.put('/api/leave', leave);

  return router;
};
