'use strict';

const restrictEdits = require('./restrict-edits');

const sanity = require('./sanity');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const populateSender = hooks.populate('sentBy', {
  service: 'users',
  field: 'userId'
});

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
  ],
  find: [],
  get: [],
  create: [sanity()],
  update: [hooks.remove('sentBy'), restrictEdits(), sanity()],
  patch: [hooks.remove('sentBy'), restrictEdits()],
  remove: [restrictEdits()]
};

exports.after = {
  all: [],
  find: [populateSender],
  get: [populateSender],
  create: [populateSender],
  update: [populateSender],
  patch: [],
  remove: []
};
