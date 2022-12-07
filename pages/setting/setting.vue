<template>
	<!-- 我的设置	 -->
	<view>
		<userList :list="list" @clearCache="clearCache"></userList>
		<button class="logout" @click="logout" v-if="hasLogin">退出登录</button>
	</view>
</template>

<script>
	import userList from '@/pages/tabbar/home/components/userList.vue'
	import list from "@/config/settingList.js" //我的设置  展示数据
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			userList,
		},
		data() {
			return {
				list: list()
			};
		},
		computed: {
			...mapGetters(["hasLogin", "hasUserInfo"]),
		},
		methods: {
			// 退出 
			logout() {
				this.$store.commit("logout")
				
				this.$store.commit('init')
			},
			clearCache(obj) {
				console.log("清除缓存")
				uni.showModal({
					content: '是否要清除缓存？',
					success: (res) => {
						if (res.confirm) {
							this.$set(obj,'text','0KB')
						} else {
							console.log('点击了取消')
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.logout {
		width: 690rpx;
		height: 80rpx;
		background-color: #5ccc84;
		border-radius: 10rpx;
		color: #fff;
		line-height: 80rpx;
	}
</style>
