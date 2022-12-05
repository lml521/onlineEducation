<template>
	<view class="box">
		<view class="banner">
			<Banner :list="BannerList"></Banner>
		</view>
	</view>
</template>

<script>
import Banner from '@/components/Banner/Banner.vue'
	export default {
		components:{
			Banner
		},
		data() {
			return {
				BannerList:[{
					id:1,
					img:"/static/banner/banner1.png",
				},{
					id:2,
					img:"/static/banner/banner2.png",
				}]
			}
		},
	
		methods: {
		

		}
	}
</script>

<style lang="scss">
.banner{
	// padding: 0 10rpx;
}
</style>
