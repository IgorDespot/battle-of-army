const router = require('express').Router();
const { attack } = require('./middleware');

module.exports = () => {
  router.put('/api/attack', attack);
  return router;
};