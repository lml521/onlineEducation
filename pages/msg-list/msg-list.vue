<template>
	<view class="bgc">
		<!-- 消息列表 -->
		<view class="list p-2">
			<view class="title">好啊好啊</view>
			<view class="time">2021-08-06 19:51:57</view>
		</view>
		<noList></noList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.bgc{
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background-color: #eee;
}
.list{
	background-color: #fff;
	margin: 20rpx ;
	border-radius: 10rpx;
	.time{
		font-size: 16rpx;
		color: #6c75a7;
		margin-top: 15rpx;
	}
}
</style>
