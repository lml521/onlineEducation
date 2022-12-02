<template>
	<!-- 学习进度 -->
	<view class="box">
		<!-- {{hasLogin}} -->
		<view class="noLogin" v-if="!hasLogin">
		<!-- 学习进度 -->
		<img src="/static/noLogin.png" alt="">
		<view class="text">登录后才可以查看我的学习哦</view>
		<button class="btn " plain size="mini" @click="navTo('/pages/login/login')">立即登录</button>
	</view>
	</view>
	
</template>

<script>
	import {mapGetters} from "vuex";
	export default {
		data() {
			return {
				
			};
		},
		computed: {
		
			...mapGetters(["hasLogin"]),
		},
	}
</script>

<style lang="scss">
	.box{
		height: 100%;
		overflow: hidden;
	}
.noLogin{
	margin-top: 310rpx;
	text-align: center;
	img{
		width: 350rpx;
			height: 350rpx;
	}
	.text{
		font-size: 30rpx;
		color: #6c757d;
		margin: 15rpx 0;
	}
}
</style>
