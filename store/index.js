import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import {TOKEN,USER_INFO,historyKeyword} from "@/enum/user.js"

const store = new Vuex.Store({
	state: {
		userinfo:uni.getStorageSync(USER_INFO)|| {}, //
		isToken:uni.getStorageSync(TOKEN)|| "",
		historyKeyword:uni.getStorageSync(historyKeyword)||[],//历史记录
	},
	getters: {
		// 获取token是否存在
		hasLogin(state) {
			return !!state.isToken
		},
		// 用户信息
		hasUserInfo(state){
			return state.userinfo
		},
		hasHistory(state){
			return state.historyKeyword
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
		
		// 修改 手机号码 
		setphone(state,phone){
			console.log(state.userinfo,'vuex')
			let res =uni.getStorageSync(USER_INFO)
			console.log(res)
			res.phone=phone
			
			state.userInfo = res
			uni.setStorageSync(USER_INFO, res)
			// state.userinfo.phone=phone
			// uni.setStorageSync(USER_INFO, state.userinfo)
		},
		
		// 添加搜索历史记录 
		addHistory(state,item){
			if(state.hasHistory){
				let index =state.hasHistory.findIndex(e=>e==item)
				if(!index){
					state.hasHistory.unshift(item)
				}
			}else{
				state.hasHistory=[item]
			}
			uni.setStorageSync(historyKeyword,state.hasHistory)
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
