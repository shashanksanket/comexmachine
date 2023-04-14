// Initializes the `machine` service on path `/api/`
const { machine } = require('./machine.class');
const createModel = require('../../models/machine.model');
const hooks = require('./machine.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/machine', new machine(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/machine');

  service.hooks(hooks);
};
