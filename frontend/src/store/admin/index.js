import Vue from 'vue'
import Vuex from 'vuex'

import feathersClient from '../../feathers-client'

Vue.use(Vuex);

export default {
	namespaced: true,
	state: {
		machineReqList: '',
		machineOfferList: ''
		
	},
	getters: {

	},
	mutations: {

	},
	actions: {
		getMachineReqList: async ({ commit,state }, payload) => {
			const res1 = await feathersClient.service('/api/machinerequests').find({
				query:{
					$total: true,
					machineId: payload
				}
			})
			const res2 = await feathersClient.service('/api/machine').find({
				query:{
					id: payload
				}
			})
			res1['location'] = res2.data[0].location
			state.machineReqList = res1
		},
		getMachineOfferList: async ({commit,state}, payload) => {
			const res1 = await feathersClient.service('/api/machine').find({
				query: {
					$total: true
				}
			})
			state.machineOfferList = res1
		},
		declineReq: async ({commit,state},payload)=>{
			await feathersClient.service('/api/machinerequests').patch(payload,{
				approvalStatus: "declined"
			})
		},
		approveReq: async ({commit,state},payload)=>{
			await feathersClient.service('/api/machinerequests').patch(payload,{
				approvalStatus: "approved"
			})
		}
	},
}
