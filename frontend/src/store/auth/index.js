import Vue from 'vue'
import Vuex from 'vuex'

import feathersClient from '../../feathers-client'

Vue.use(Vuex);

export default {
	namespaced: true,
	state: {
		errors: '',
		authPayload: {
			email: '',
			password: ''
		},
		isAuthenticated: false,
		currUser: {
			firstName: '',
			lastName: '',
			id: null,
			role: ''
		},
		totalUsers: '',
	},
	getters: {
		isAuthenticated: state => state.isAuthenticated,
		userName: state => state.currUser.firstName,
		role: state => state.currUser.role,
	},
	mutations: {
		SET_AUTHPAYLOAD(state, val) {
			state.authPayload.email = val.email
			state.authPayload.password = val.password
		},
		SET_ERROR(state, val) {
			state.errors = val
		},
		SET_ISAUTHENTICATED(state, val) {
			state.isAuthenticated = val
		},
		SET_CURRUSER(state, val) {
			state.currUser.firstName = val.firstName
			state.currUser.lastName = val.lastName
			state.currUser.id = val.id,
			state.currUser.role = val.role
		},
		RESET_CURR_USER(state) {
			state.authPayload.email = ""
			state.authPayload.password = ''
			state.isAuthenticated = false
			state.currUser.firstName = ''
			state.currUser.lastname = ''
			state.currUser.role = ''

		}
	},
	actions: {
		loginUser: async ({ commit, state }) => {
			try {
				const res = await feathersClient.authenticate({
					strategy: 'local',
					email: state.authPayload.email,
					password: state.authPayload.password
				});
				console.log(res)
					commit('SET_ISAUTHENTICATED', true)
					localStorage.setItem("feathers-jwt", res.accessToken)
					commit('SET_CURRUSER', res.users)
				
			}
			catch (e) {
				console.log("Authentication error", e)
				commit('SET_ERROR', e)
			}


		},
		signup: async ({commit,state},payload)=>{
			await feathersClient.service('/api/users').create({
				firstName: payload.firstName,
				lastName: payload.lastName,
				location: payload.location,
				phone: payload.phone,
				email: payload.email,
				password: payload.password,
			})
		},
		
		loginUserWithJwt: async ({ commit, state }) => {
			const token = localStorage.getItem('feathers-jwt')
			if (token) {
				try {
					const result = await feathersClient.authenticate({
						strategy: 'jwt',
						accessToken: token,

					});
					commit('SET_ISAUTHENTICATED', true)
					commit('SET_CURRUSER', result.users)


				}
				catch (e) {
					console.log("Authentication error", e)
					commit('SET_ERROR', e)
				}
			}
		},
		logoutUser: async ({ commit, state }) => {
			feathersClient.logout()
			commit('RESET_CURR_USER')
		},
	},
}
