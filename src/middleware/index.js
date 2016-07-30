'use strict';

const cors = require('cors');

const signup = require('./signup');

const authentication = require('./authentication');

const handler = require('feathers-errors/handler');
const notFound = require('./not-found-handler');
const logger = require('./logger');

module.exports = function() {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  app.use(cors());

  app.post('/signup', signup(app));

  // s3 signing url
  app.use('/s3', require('react-s3-uploader/s3router')({
    bucket: 'coledit',
    region: 'us-west-2',
    signatureVersion: 'v4',
    headers: { 'Access-Control-Allow-Origin': '*' },
    ACL: 'private',
  }));

  app.use(notFound());
  app.use(logger(app));
  app.use(handler());
};
