<template>
	<view class="courseHeader">
		<view class="img">
			<img :src="item.cover" alt="">
			
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.courseHeader{
	.img{
		width: 100%;
		height: 420rpx;
		img{
			width: 100%;
			height: 1005;
		}
	}
}
</style>
