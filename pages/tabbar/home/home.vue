<template>
	<!-- 我的  13233962195     13526996192    123456-->
	
	<view class="animate__animated animate__fadeInDown box">
		<!-- 登录头像 -->
		<view class="userInfo">
			<userInfo></userInfo>
			<!-- nav -->
			<view class="p-3 nav">
				<navList :list="NavList"></navList>
			</view>

		</view>
		<!-- 列表数据 -->
		<view class="userList">
			<userList :list="BarList"></userList>
		</view>

	</view>
</template>

<script>
	import userInfo from '@/pages/tabbar/home/components/userInfo.vue' //我的页面头部
	import navList from '@/components/navList/navList.vue' //nav组件
	import NavList from "@/config/my-nav-list.js" //nav数据
	import userList from "@/pages/tabbar/home/components/userList.vue"
	import BarList from "@/config/my-list-bar.js" //列表数据

	import {mapGetters} from "vuex";
	export default {
		components: {
			userInfo,
			navList,
			userList
		},
		computed: {
			...mapGetters(["hasLogin","hasUserInfo"]),
		},
		data() {
			return {
				NavList: NavList(),
				BarList: BarList()

			};
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			if (e.index == 0) {
				this.navTo('/pages/setting/setting')
			}
		}
	}
</script>

<style lang="scss">
	.box {
		background-color: #fff;
	}

	.userInfo {
margin-bottom: 40rpx;
		height: 350rpx;
		background-color: #5ccc84;
		border-radius: 0 0 100rpx 100rpx;
	}

	.nav {
		width: 690rpx;
		height: 150rpx;
		position: absolute;
		top: 180rpx;
	}

	.userList {
		// margin-top: 80rpx;
	}
</style>
