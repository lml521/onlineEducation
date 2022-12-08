<template>
	<button class="send" @click="sendCode">
		{{flag?countDown:'发送'}}
	</button>
</template>

<script>
	import loginApi from '@/api/login.js'
	export default {
		name: "sendCode",
		props: {
			phone: {
				type: String,
				default: ""
			},
		},
		data() {
			return {
				countDown: null, //60秒定时器
				Time: null, //定时器的实例 
				flag: false, //节流开关  
			};
		},
		methods: {
			// 发送验证码
			async sendCode() {
				if (this.flag){
					uni.showModal({
						content: `请在${this.countDown}秒后重试`,
						showCancel: false
					})
					return
				} 
				// 验证手机号码
				if (!this.$util.checkStr(this.phone, 'mobile')) {
					this.$util.msg("请输入有效手机号码")
					return
				}
				try {
					let res = await loginApi.sendCode({
						phone: this.phone
					})
					console.log(res.data)
					if (res.code == 20000) {
						this.$util.msg(`验证码：${res.data}`)
					} else {
						this.$util.msg(res.data)
						return
					}
				} catch (e) {
					console.log(e)
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

		}
	}
</script>

<style lang="scss">

</style>
