export default [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/yicpages/admin/comex/login.vue'),
		meta: {
			layout: "full",
			authReq: false
		  },
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('@/yicpages/admin/comex/register.vue'),
		meta: {
			layout: "full",
			authReq: false
		  },
	}
]