<template>
	<!--  -->
	<view class="user-header p-2 flex"> 
		<img src="/static/userImg.png" alt="">
		<view class="flex flex-column pl-3 flex-1 text-white">
				<view class="font-md mb-2">立即登录</view>
				<view  class="font-sm">登录解锁更多功能</view>
		</view>
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
.user-header{
	img{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
}
</style>
