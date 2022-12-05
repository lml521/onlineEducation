<template>
	<view class="box">
		<!-- 轮播图 -->
		<Banner :list="BannerList"></Banner>
		<!-- nav 导航栏 -->
		<multiRowNav :navList="navList"></multiRowNav>

		<!-- 优惠券 -->
		<!-- discountCoupon -->
		<coupon :couponList="couponList"></coupon>

	</view>
</template>

<script>
	import Banner from '@/components/Banner/Banner.vue' //banner组件
	import indexApi from "@/api/index.js" //api请求
	import multiRowNav from '@/components/multi-row-nav/multi-row-nav.vue' //nav数据组件
	import coupon from '@/components/coupon/coupon.vue'
	export default {
		components: {
			Banner,
			multiRowNav,
			coupon
		},
		data() {
			return {
				// 轮播图数据 
				BannerList: [],
				// nav数据 
				navList: [],
				// 滚动 优惠券 
				couponList: []
			}
		},

		created() {
			this.getIndexList()
			this.getCoupon()
		},
		methods: {
			async getIndexList() {
				let {code,data} = await indexApi.getIndex()
				if (code == 20000) {
					this.BannerList = data[1].data
					this.navList = data[2].data
					console.log(this.BannerList, this.navList)
				}
			},
			async getCoupon() {
				let {code,data} = await indexApi.getCoupon()
				if (code == 20000) {
					this.couponList = data
				}
			}




		}
	}
</script>

<style lang="scss">

</style>
