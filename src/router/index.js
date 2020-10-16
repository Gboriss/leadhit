import Vue from 'vue'
import VueRouter from 'vue-router'
import authorization from '../views/Authorization.vue'

Vue.use(VueRouter)

const routes = [
  {
	path: '/',
	name: 'authorization',
	component: authorization
  },
  {
	path: '/analytics',
	name: 'analytics',
	component: () => import(/* webpackChunkName: "about" */ '../views/Analytics.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
