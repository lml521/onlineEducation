import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import {TOKEN,USER_INFO} from "@/enum/user.js"

const store = new Vuex.Store({
	state: {
		userinfo:uni.getStorageSync(USER_INFO)|| {}, //
		isToken:uni.getStorageSync(TOKEN)|| "",
	},
	getters: {
		// 获取token是否存在
		hasLogin(state) {
			return !!state.isToken
		},
		// 用户信息
		hasUserInfo(state){
			return state.userinfo
		}

	},
	mutations: {
		// 存储 用户信息 以及 token
		setToken(state, data) {
			console.log(data)
			// 存储用户信息
			state.userInfo = data
			uni.setStorageSync(USER_INFO, data)
			// 存储token
			state.isToken = data.token
			uni.setStorageSync(TOKEN, data.token)
			console.log(state.userInfo,'state.userInfo')
		},
		
		// 退出登录 删除 用户信息以及token
		logout(state){
			state.userInfo={}
			uni.removeStorageSync(USER_INFO)
			state.isToken=""
			uni.removeStorageSync(TOKEN)
		}
	},
	actions: {

	},
	modules: {

	}
})

export default store
