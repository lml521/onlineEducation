import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import {TOKEN,USER_INFO,historyKeyword} from "@/enum/user.js"
import config from "../config"

const store = new Vuex.Store({
	state: {
		userinfo:uni.getStorageSync(USER_INFO)|| {}, //
		isToken:uni.getStorageSync(TOKEN)|| "",
		historyKeyword:uni.getStorageSync(historyKeyword)||[],//历史记录
		courseItem:{}
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
		init(state){
			console.log('vuex')
			state.userinfo=uni.getStorageSync(USER_INFO)|| {}
			state.isToken=uni.getStorageSync(TOKEN)|| ""
		},
		
		// 存储 用户信息 以及 token
		setToken(state, data) {
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
		},
		
		// 添加搜索历史记录 
		addHistory(state,item){
			
			if(state.historyKeyword.length){
				let index =state.historyKeyword.findIndex(e=>e==item)
				if(index>-1){				
					state.historyKeyword.splice(index,1)
				}
				state.historyKeyword.unshift(item)
			}else{
				state.historyKeyword=[item]
			}
			uni.setStorageSync(historyKeyword,state.historyKeyword)
		},
		// 清空历史记录 
		removeHistory(state){
			state.historyKeyword=[]
			uni.removeStorageSync(historyKeyword)
		},
		
		
		// 退出登录 删除 用户信息以及token
		logout(state){
			state.userInfo={}
			uni.removeStorageSync(USER_INFO)
			state.isToken=""
			uni.removeStorageSync(TOKEN)
		},
		
		// 存储详情 数据 
		courseList(state,data){
			state.courseItem=data
		}
	},
	actions: {

	},
	modules: {

	}
})

export default store
