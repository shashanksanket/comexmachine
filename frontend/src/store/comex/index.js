import Vue from 'vue'
import Vuex from 'vuex'

import feathersClient from '../../feathers-client'

Vue.use(Vuex);

export default {
	namespaced: true,
	state: {
		machines: '',
		machinesInSuit: '',
		
	},
	getters: {

	},
	mutations: {

	},
	actions: {
		addMachine: async ({ commit,state }, payload) => {
			await feathersClient.service('/api/machine').create({
				"location": payload.location,
				"owner": payload.owner,
				"rate": payload.rate
			})
		},
		getTotalMachine: async ({commit, state}, payload) => {
			const res1 = await feathersClient.service('/api/machine').find({
				query:{
					$total: true,
					$inSuit: false,

				}
			})
			state.machines=res1
		},
		getMachineInSuit: async ({commit, state}, payload) => {
			const res2 = await feathersClient.service('/api/machine').find({
				query:{
					$inSuit: true,
					$total: true,
				}
			})
			state.machinesInSuit=res2
		},
		delMachine: async ({commit,state}, payload) => {
			await feathersClient.service('/api/machine').remove(payload)
		},
		editMachine: async ({commit,state}, payload) => {
			await feathersClient.service('/api/machine').patch(payload.id,{
				location: payload.location,
				owner: payload.owner,
				rate: payload.rate
			})
		},
		requestHDD: async ({commit,state},payload) => {
			await feathersClient.service('/api/machinerequests').create({
				machineId: payload,
			})
		}
	},
}
