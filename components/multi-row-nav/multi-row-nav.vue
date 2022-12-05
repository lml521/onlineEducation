<template>
	<!-- 多行 nav-->
	<view class="flex flex-wrap  py-2">
			
		<view class="flex flex-column align-center justify-center py-1" style="width: 25%;" v-for="(item,index) in navList" :key="index">
			<img :src="item.src" alt="" class="img">
			<text class="font-sm text-muted mt-1">{{item.name}}</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"multi-row-nav",
		props:{
			navList:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.img{
		width: 72rpx ;
		height: 72rpx ;
	}
</style>