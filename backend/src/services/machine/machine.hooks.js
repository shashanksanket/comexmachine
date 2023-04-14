const { authenticate } = require('@feathersjs/authentication').hooks;

const assignUserid = async function(context){
  context.data['userId'] = context.params.users.id
}
const { Op } = require('sequelize');
const TotalValues = async function(context){
  if (context.params.query && context.params.query.$total){
    delete context.params.query.$total
    context.params.paginate = false
    context.params._populate = true
  }
}
const limit = async function(context){
  if (context.params.query.$inSuit=='false'){
    delete context.params.query.$inSuit

    context.params.query = {
      ...context.params.query,
      userId: {
        [Op.ne]: context.params.users.id
      }
    };
  }
  if(context.params.query.$inSuit){
    delete context.params.query.$inSuit
    context.params.query['userId'] = context.params.users.id
    
  }
}
const requestFlag = async function(context){
 const res = await context.app.service('api/machinerequests').find({
  query:{
    $total: true,
    userId: context.params.users.id
  }
 })
 for(let i=0;i<res.length;i++){
  for(let j=0;j<context.result.length;j++){
    console.log(res[i].machineId,context.result[j].id)
   if (res[i].machineId==context.result[j].id){
    context.result[j]['requested']=true
   }
  }
 }
console.log(res)
}
module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [TotalValues,limit],
    get: [],
    create: [assignUserid],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [requestFlag],
    get: [requestFlag],
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
