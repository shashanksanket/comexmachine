const assert = require('assert');
const app = require('../../src/app');

describe('\'stocks\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/stocks');

    assert.ok(service, 'Registered the service');
  });
});
