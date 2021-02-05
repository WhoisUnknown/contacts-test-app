import Vue from 'vue';
import VueRouter from 'vue-router';
import { isEqual } from 'lodash-es';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'LayoutMain',
    component: () => import(/* webpackChunkName: "LayoutMain" */ '@layouts/Main'),
    redirect: { name: 'ContactsList' },
    children: [
      {
        path: 'contacts',
        name: 'ContactsList',
        component: () => import(/* webpackChunkName: "ContactsList" */ '@pages/Contacts/List'),
      },

    ],
  },
];

const router = new VueRouter({
  mode: process.env.VUE_APP_ROUTER_MODE ? process.env.VUE_APP_ROUTER_MODE : 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // скроллим, только если поменялся маршрут или поменялись параметры(но не query)
    if (to.name !== from.name || !isEqual(to.params, from.params)) {
      return savedPosition || { x: 0, y: 0 };
    }
  },
});

export default router;
