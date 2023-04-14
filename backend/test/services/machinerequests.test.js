const assert = require('assert');
const app = require('../../src/app');

describe('\'machinerequests\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/machinerequests');

    assert.ok(service, 'Registered the service');
  });
});
