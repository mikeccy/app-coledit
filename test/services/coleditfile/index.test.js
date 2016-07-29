'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('coleditfile service', function() {
  it('registered the coleditfiles service', () => {
    assert.ok(app.service('coleditfiles'));
  });
});
