// Initializes the `machinerequests` service on path `/api/machinerequests`
const { Machinerequests } = require('./machinerequests.class');
const createModel = require('../../models/machinerequests.model');
const hooks = require('./machinerequests.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/machinerequests', new Machinerequests(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/machinerequests');

  service.hooks(hooks);
};
