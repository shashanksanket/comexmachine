const { authenticate } = require('@feathersjs/authentication').hooks;
const populate = require("feathers-populate-hook");
const TotalValues = async function(context){
  if (context.params.query && context.params.query.$total){
    delete context.params.query.$total
    context.params.paginate = false
    context.params._populate = true
  }
}
const assignDetails = async function(context){
  console.log(context)
  context.data['requestedBy'] = context.params.users.firstName
  context.data['approvalStatus'] = "inProcess"
  context.data['userId'] = context.params.users.id
}


module.exports = {
  before: {
    all: [authenticate('jwt'), populate.compatibility()],
    find: [TotalValues],
    get: [],
    create: [assignDetails],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populate({
      machineDetails: { // Destination key
        service: 'api/machinerequests', // Foreign service
        f_key: 'machineId',  // Foreign key,
        l_key: 'id'
      }
    })],
    get: [populate({
      machineDetails: { // Destination key
        service: 'api/machinerequests', // Foreign service
        f_key: 'machineId',  // Foreign key,
        l_key: 'id'
      }
    })],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
