<template>
	<!-- 多行 nav-->
	<view class="flex flex-wrap  py-2">
			
		<view class="flex flex-column align-center justify-center py-1" style="width: 25%;"
		 v-for="(item,index) in navList" :key="index" @click="toPage(item)">
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
		},
		methods:{
			toPage(item){
			console.log(item)
			if(item.url){
				location.href=item.url
				
			}
			if(item.module){
				this.$emit(item.module,item)
			}
		}}
		
	}
</script>

<style lang="scss">
.img{
		width: 72rpx ;
		height: 72rpx ;
	}
</style>