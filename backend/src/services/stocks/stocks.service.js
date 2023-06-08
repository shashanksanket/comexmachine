// Initializes the `stocks` service on path `/api/stocks`
const { Stocks } = require('./stocks.class');
const createModel = require('../../models/stocks.model');
const hooks = require('./stocks.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/stocks', new Stocks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/stocks');

  service.hooks(hooks);
};
