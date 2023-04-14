const users = require('./users/users.service.js');
const authmanagement = require('./authmanagement/authmanagement.service.js');
const machine = require('./machine/machine.service.js');
const machinerequests = require('./machinerequests/machinerequests.service.js');
module.exports = function (app) {
  app.configure(users);
  app.configure(authmanagement);
  app.configure(machine);
  app.configure(machinerequests);
}