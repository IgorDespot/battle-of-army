const mongoose = require('mongoose');
const { logger } = require('../../config/log');
require('dotenv').config();

// `mongodb://dbUser:juxe0121@ds243897.mlab.com:43897/node-army`
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds243897.mlab.com:43897/node-army`;

mongoose.connect(uri, { useNewUrlParser: true }).then(
  () => { logger.info(`Successfully connected to Mongo Databse instance on ${uri}`); },
  (err) => { logger.error(`Error occured when connecting to Mongo Databse instance ${err}`); },
);
