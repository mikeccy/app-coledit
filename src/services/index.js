'use strict';
const coleditWorkspace = require('./coledit-workspace');
const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(coleditWorkspace);
};
