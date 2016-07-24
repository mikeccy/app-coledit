'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('coledit-workspace service', function() {
  it('registered the coledit-workspaces service', () => {
    assert.ok(app.service('coledit-workspaces'));
  });
});
