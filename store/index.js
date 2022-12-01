import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
	arr:"123"
	},
	getters: {
		hasLogin(state){
			// return !!state.accessToken
		}

	},
	mutations: {
		// // 存储token 
		// setToken(state, data) {
		// 	let {access_token,userInfo} = data
		// 	if (userInfo) {
		// 		state.userInfo = userInfo
		// 		uni.setStorageSync(USER_INFO_KEY, userInfo)
		// 	}

		// 	if (access_token) {
		// 		state.accessToken = access_token
		// 		uni.setStorageSync(TOKEN_KEY, access_token)
		// 	}
		// },
		// //退出登录
		// logout(state) {
		// 	// 清空vuex里面存储的用户信息以及token
		// 	state.userInfo = {}
		// 	state.accessToken = ""
		// 	// 清空本地存储的用户信息以及token
		// 	uni.removeStorageSync(USER_INFO_KEY)
		// 	uni.removeStorageSync(TOKEN_KEY)
		// }
	},
	actions: {

	},
	modules: {

	}
})

export default store
