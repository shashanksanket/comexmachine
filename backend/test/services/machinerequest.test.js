const assert = require('assert');
const app = require('../../src/app');

describe('\'machinerequest\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/machinerequest');

    assert.ok(service, 'Registered the service');
  });
});
