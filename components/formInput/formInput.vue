<template>
	<view class="form">
		<form>
			<view v-for="(item,index) in formlist">

				<view class="item" v-if="item.type=='text'&&item.show">
					<uni-icons :type="item.icon" size="16" class="icon"></uni-icons>
					<input class="input" v-model="value[item.prop]" :type="item.type" :placeholder="item.placeholder">
				</view>

				<view class="item flex" v-if="item.type=='code'">
					<uni-icons :type="item.icon" size="16" class="icon"></uni-icons>
					<input class="input" v-model="value[item.prop]" :type="item.type" :placeholder="item.placeholder">
					<button class="send" @click="sendCode">
						{{flag?countDown:'发送'}}
						</button>
				</view>

				<view class="item" v-if="item.type=='button'" @click="handelLogin">
					<button class="btn" :loading="loading">
						{{item.value}}
					</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import loginApi from '@/api/login.js'
	import {mapGetters} from 'vuex'
	export default {
		name: "formInput",
		props: {
			// 登录 注册  状态
			type: {
				type: String,
				default: "login"
			},
			// 表单 数据 
			formlist: {
				type: Array,
				default: () => []
			},
			// v-model数据
			value: {
				type: Object,
				default: () => {}
			},
			// 登录 协议
			agreement: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapGetters(["hasUserInfo"]),
		},
		data() {
			return {
				loading: false,
				countDown: null, //60秒定时器
				Time: null, //定时器的实例 
				flag: false, //节流开关 
			};
		},
		methods: {
			// 登录 / 注册 
			async handelLogin() {
				this.loading = true //开启loading加载
				let res
				try {
					// 注册 
					if (this.type == 'reg') {
						res = await loginApi.reg(this.value)
					} else  if (this.type == 'login'){
						// 登录
						if (!this.agreement) {
							this.$util.msg('请先阅读并同意用户协议&隐私声明')
							this.loading = false
							return
						}
						res = await loginApi.login(this.value)
					}else if (this.type=='SFZ'){
						console.log('绑定')
						console.log(this.value)
						res = await loginApi.bindMobile(this.value)
						console.log(res)
						
					}
					if (res.code == 20000) {
						this.loading = false
						if (this.type == 'reg') {
							this.$util.msg('注册成功')
							this.$emit("changeLogin")
						} else  if (this.type == 'login'){
							this.$util.msg('登录成功')
							uni.switchTab({
								url: '/pages/tabbar/home/home'
							})
							this.setToken(res.data)
						}else if (this.type=='SFZ'){
							this.$util.msg('绑定成功')
							console.log(res)
							console.log(this.hasUserInfo, this.value.phone)
							this.hasUserInfo.phone = this.value.phone
							console.log(this.hasUserInfo)
							this.$store.commit('setToken',this.hasUserInfo)
							// this.list = userInfoList()
							this.navBack()
							}
						
					} else {
						this.loading = false
						this.$util.msg(res.data)
					}
				} catch (e) {
					console.log(e)
					this.loading = false
				}
			},
			async sendCode() {
				if(this.flag)return 
				try {
					let res = await loginApi.sendCode({
						phone: this.value.phone
					})
					console.log(res)
					if (res.code == 20000) {
						this.$util.throttle()
						this.$util.msg(`验证码：${res.data}`)
					} else {
						this.$util.msg(res.data)
						return
					}
				} catch (e) {
					this.$util.msg(res.data)
				}
				
				this.countDown = 60 //规定定时器秒数
				this.flag = true //节流开关
				this.Time = setInterval(() => {
					this.countDown--
					// 当定时器秒数小与0清除定时器
					if (this.countDown <= 0) {
						clearInterval(this.Time)
						this.Time = null
						this.flag = null
					}
				}, 1000)
				
				
			},


			// 存储token 
			setToken(data) {

				console.log(data)
				this.$store.commit("setToken", data)

			}

		}
	}
</script>

<style lang="scss">
	.item {
		border-radius: 10rpx;
		margin-top: 50rpx;
		height: 100rpx;
		background-color: #f5f5f5;
		display: flex;
		position: relative;

		.icon {
			width: 100rpx;
			text-align: center;
			line-height: 100rpx;
		}

		.input {
			// flex: 1;
			border: 0;
			font-size: 32rpx;
			background-color: #f5f5f5;
			outline: none;
		}

		.send {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			width: 100px;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			border-radius: 0;
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;

			color: #fff;
			background-color: #5ccc84;
		}

		.btn {
			width: 100%;
			color: #fff;
			font-size: 32rpx;
			background-color: #5ccc84;
		}
	}
</style>
