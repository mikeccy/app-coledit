'use strict';

const assert = require('assert');
const sanity = require('../../../../src/services/coleditfile/hooks/sanity.js');

describe('coleditfile sanity hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    sanity()(mockHook);

    assert.ok(mockHook.sanity);
  });
});
