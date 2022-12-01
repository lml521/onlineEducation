<template>
	<!-- nav封装 -->
	<view class="box flex text-center">
		<view class="flex-1 flex flex-column align-conent  justify-center py-3" 
		v-for="(item,index) in list" :key="index">
		<text :class="item.icon " class="icon"></text>
		<span class="title">{{item.title}}</span>
		</view>
	</view>
</template>

<script>
	export default {
		name:"navList",
		props:{
			// nav数据 
			list:{
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
.box{
	background-color: #fff;
	width: 100%;
	height: 100%;
	box-shadow: 2px 2px 5px #ddd;
	.icon{
		font-size: 40rpx;
		margin: auto;
	}
	.title{
		font-size: 24rpx;
		color: #707880;
	}
}
</style>