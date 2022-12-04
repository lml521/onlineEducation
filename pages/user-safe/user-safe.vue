<template>
	<view>
		<userList :list="list" v-model="form"></userList>
		<!-- {{list}} -->
		<button class="submit" @click="submit">保 存</button>
	</view>
</template>

<script>
	import userList from '@/pages/tabbar/home/components/userList.vue'
	import safeList from '@/config/safeList.js'
	import indexApi from "@/api/login.js"
	export default {
		components: {
			userList
		},
		data() {
			return {
				form: {
					opassword: "",
					password: "",
					repassword: ""

				},
				list: safeList()
			};
		},
		methods: {
			// 提交保存 
			async submit() {
				console.log(this.form)
				uni.showLoading({
					mask: true,
				});
				try {
					let res = await indexApi.upPassword(this.form)
					console.log(res)
					if (res.code == 20000) {
						uni.hideLoading()
						this.$store.commit('logout')
						this.$util.msg('修改成功')
						
						this.navBack()

					} else {
						this.$util.msg(res.data)
					}
				} catch (e) {
					console.log(e)
				}


			},
		}
	}
</script>

<style lang="scss">
	.submit {
		width: 690rpx;
		height: 80rpx;
		background-color: #5ccc84;
		color: #fff;
		line-height: 80rpx;
		border-radius: 10rpx;
	}
</style>
