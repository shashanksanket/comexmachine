export default [
  {
    path: '/home',
    name: 'home',
    component: () => import("@/yicpages/admin/comex/home.vue"),
    meta: {
      layout: "full",
      authReq: true,

    },
  },
  {
    path: '/machine/request',
    name: 'requestForMachine',
    component: () => import("@/yicpages/admin/comex/machineRequest.vue"),
    meta: {
      layout: "full",
      authReq: true,

    },
  },
  {
    path: '/machine/offer',
    name: 'offerForMachine',
    component: () => import("@/yicpages/admin/comex/machineOffer.vue"),
    meta: {
      layout: "full",
      authReq: true,

    },
  },
  {
    path: '/admin/dashboard',
    name: 'adminDashboard',
    component: () => import("@/yicpages/admin/superadmin/adminDashboard.vue"),
    meta: {
      layout: "full",
      authReq: false,
      adminReq: true

    },
  },
  {
    path: '/machine/sale',
    name: 'salePage',
    component: () => import("@/yicpages/admin/comex/sale.vue"),
    meta: {
      layout: "full",
      authReq: true,
    },
  },
]
