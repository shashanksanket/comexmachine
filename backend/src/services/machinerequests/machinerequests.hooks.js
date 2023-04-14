const { authenticate } = require('@feathersjs/authentication').hooks;
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
    all: [authenticate('jwt')],
    find: [TotalValues],
    get: [],
    create: [assignDetails],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
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
