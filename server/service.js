const express = require('express');

const service = express();
require('../components/db/dbConnection');
require('../components/join/eventHandler');
const { joinApi, attackApi } = require('../components/join');

module.exports = () => {
  service.use(express.json());
  service.use('/', joinApi, attackApi);
  return service;
};
