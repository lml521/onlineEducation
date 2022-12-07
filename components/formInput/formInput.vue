<template>
	<view class="form">
		<form>
			<view v-for="(item,index) in formlist">
				<view class="item" v-if="item.type=='text'||item.type=='password'&&item.show">
					<uni-icons :type="item.icon" size="16" class="icon"></uni-icons>
					<input class="input" v-model="value[item.prop]" :type="item.type" :placeholder="item.placeholder">
				</view>

				<view class="item flex" v-if="item.type=='code'">
					<uni-icons :type="item.icon" size="16" class="icon"></uni-icons>
					<input class="input" v-model="value[item.prop]" :type="item.type" :placeholder="item.placeholder">

					<sendCode :phone="value.phone"></sendCode>

					<!-- <button class="send" @click="sendCode">
						{{flag?countDown:'发送'}}
					</button> -->

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
	import sendCode from '@/components/sendCode/sendCode.vue'
	import loginApi from '@/api/login.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: "formInput",
		components: {
			sendCode
		},
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
				// countDown: null, //60秒定时器
				// Time: null, //定时器的实例 
				// flag: false, //节流开关 
			};
		},
		methods: {
			// 登录 / 注册 
			async handelLogin() {
				console.log(this.value, this.$store.state.userinfo, 80)
				
				
				this.loading = true //开启loading加载
				let res
				try {
					// 注册      --------------
					if (this.type == 'reg') {
						res = await loginApi.reg(this.value)
						console.log(res, '注册账号')
					} else if (this.type == 'login') {
						// 登录------------------
						if (!this.agreement) {
							this.$util.msg('请先阅读并同意用户协议&隐私声明')
							this.loading = false
							return
						}
						res = await loginApi.login(this.value)
						console.log(res, '登录账号')
						
						
						
					} else if (this.type == 'SFZ') {
						// 绑定手机号 ----------------------
						console.log('绑定')
						console.log(this.value, this.hasUserInfo)
						res = await loginApi.bindMobile(this.value)
						// console.log(res,'绑定手机号')

					} else if (this.type == 'retrievePassword') {
						// 找回密码 -----------------
						console.log(this.value, '找回密码')
						res = await loginApi.getForget(this.value)
						console.log(res, '找回密码')
					}
					if (res.code == 20000) {
						this.loading = false
						if (this.type == 'reg') {
							this.$util.msg('注册成功')
							this.$emit("changeLogin")
						} else if (this.type == 'login') {
							this.$util.msg('登录成功')
							console.log(res.data, 1)
							this.setToken(res.data)
						

							setTimeout(() => {
								if (res.data.phone) {
									uni.switchTab({
										url: '/pages/tabbar/home/home'
									})
								} else {
									this.navTo('/pages/bind-phone/bind-phone')
								}
							}, 300)
							
								this.$store.commit('init')
						
						} else if (this.type == 'SFZ') {
							this.$util.msg('绑定成功')
							console.log(this.value.phone,'123')
							this.$store.commit('setphone',this.value.phone)
							setTimeout(() => {
							uni.switchTab({
								url: '/pages/tabbar/home/home'
							})
							}, 300)
							this.$store.commit('init')
						} else if (this.type == 'retrievePassword') {
							setTimeout(() => {
								this.navBack()
							}, 300)
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

			// 存储token 
			setToken(data) {
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
			flex: 1;
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
