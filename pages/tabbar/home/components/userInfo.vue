<template>
	<!-- 我的页面 头部封装 -->
	<view class="user-header p-2 flex" @click="ToLogin">
		<img :src=" hasUserInfo.avatar||'/static/userImg.png'" alt="">
		<view class=" userInfo">
			<view class="font-md mb-3">
			{{hasLogin?hasUserInfo.username:'立即登录'}}  
			<text v-if="hasLogin" class="member">永久会员</text>
			</view>
			<view class="font-sm">{{hasLogin?'暂无描述':'登录解锁更多功能'}}</view>
		</view>

		<view v-if="hasLogin" class="amend iconfont icon-set"></view>
		
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	export default {
		
		data() {
			return {

			};
		},
		computed: {
			...mapGetters(["hasLogin","hasUserInfo"]),
		},
		methods: {
			// 点击 头像 
			ToLogin() {
				// 判断是否登录,如果没有登录则跳回登录页面
				console.log(this.hasLogin)
				if (this.hasLogin) {
					this.navTo('/pages/user-info/user-info')
				} else {
					this.navTo('/pages/login/login')
				}

			}
		}
	}
</script>

<style lang="scss">
	.user-header {
		.userInfo {
			display: flex;
			flex-direction: column;
			padding-left: 30rpx;
			
			flex: 1;
			color: #ffffff;
			.member{
				color: #f7c109;
				margin-left: 30rpx;
				font-size: 26rpx;
			}
		}

		img {
			margin-left: 20rpx;
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}

		.amend {
			color: #fff;
			margin: 40rpx 10rpx 0 0;
		}
	}
</style>
