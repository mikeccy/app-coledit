'use strict';

const assert = require('assert');
const restrictEdits = require('../../../../src/services/coledit-workspace/hooks/restrict-edits.js');

describe('coledit-workspace restrictEdits hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    restrictEdits()(mockHook);

    assert.ok(mockHook.restrictEdits);
  });
});
