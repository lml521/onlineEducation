<template>
	<view>
		<userList :list="list" ></userList>
		<button class="submit" @click="submit">保 存</button>
	</view>
</template>

<script>
	import userList from '@/pages/tabbar/home/components/userList.vue'
	import safeList from '@/config/safeList.js'
	export default {
		components:{
			userList
		},
		data() {
			return {
				list:safeList()
			};
		},
		methods:{
			// 提交保存 
			submit(){
				
			},
		}
	}
</script>

<style lang="scss">
.submit{
	width: 690rpx;
	height: 80rpx;
	background-color: #5ccc84;
	color: #fff;
	line-height: 80rpx;
	border-radius: 10rpx;
}
</style>
