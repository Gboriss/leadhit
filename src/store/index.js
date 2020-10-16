import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { newdata } from '../newdata'
export default new Vuex.Store({
	state: {
		newdata: newdata
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
})
