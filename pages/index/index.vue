<template>
	<view class="box">
		
		<view class="p-2">
			<view class="flex align-center justify-center py-2 rounded" style="background-color: rgb(245, 245, 241); color: rgb(146, 142, 138);">
				
				<uni-icons type="search" size="20" color="#928e8a"></uni-icons>
				<text class="ml-2">请输入搜索关键词</text>
			</view>
			
		</view>
		<!-- 轮播图 -->
		<Banner :list="BannerList"></Banner>
		<!-- nav 导航栏 -->
		<multiRowNav :navList="navList"></multiRowNav>

		<!-- 优惠券 -->
		<!-- discountCoupon -->
		<coupon :couponList="couponList" :isColumn="true"></coupon>

		<view class="divider"></view>
		<h4 class="flex align-center py-3 px-2">
			<text class="font-md font-weight-bold">
				拼团
			</text>
		</h4>
		<scrollCourse :list="groupList"></scrollCourse>






		<view class="divider"></view>
		<h4 class="flex align-center py-3 px-2 justify-between">
			<text class="font-md font-weight-bold">最新列表</text>
			<text class="font-sm text-light-muted">查看更多</text>
		</h4>
		<indexItem v-for="(item,index) in newestList" :key="index" :item="item"></indexItem>

		<view class="divider"></view>
		<view class="img">
			<img :src="imageAd" alt="" draggable="false">

		</view>
	</view>
</template>

<script>
	import Banner from '@/components/Banner/Banner.vue' //banner组件
	import indexApi from "@/api/index.js" //api请求
	import multiRowNav from '@/components/multi-row-nav/multi-row-nav.vue' //nav数据组件
	import coupon from '@/components/coupon/coupon.vue'
	import indexItem from "@/components/index-item/index-item.vue"
	import scrollCourse from '@/components/scrollCourse/scrollCourse.vue'
	export default {
		components: {
			Banner,
			multiRowNav,
			coupon,
			indexItem,
			scrollCourse
		},
		data() {
			return {
				// 轮播图数据 
				BannerList: [],
				// nav数据 
				navList: [],
				// 滚动 优惠券 
				couponList: [],
				//拼团数据
				groupList: [],
				// 最新 数据 
				newestList: [],
				usable: 1,
				imageAd: '', //图片广告
			}
		},

		created() {
			this.getIndexList()
			this.getCoupon()
			this.getGroupList()
		},
		methods: {
			// 获取轮播图 nav 数据 
			async getIndexList() {
				let {
					code,
					data
				} = await indexApi.getIndex()
				if (code == 20000) {
					this.BannerList = data[1].data
					this.navList = data[2].data
					this.newestList = data[5].data
					this.imageAd = data[6].data
					console.log(this.BannerList, this.navList)
				}
			},
			// 优惠券数据 
			async getCoupon() {
				let {
					code,
					data
				} = await indexApi.getCoupon()
				console.log(data)
				if (code == 20000) {
					this.couponList = data
				}
			},
			// 获取拼团数据
			async getGroupList() {
				let {
					code,
					data
				} = await indexApi.getGroupList({
					usable: this.usable
				})
				if (code == 20000) {
					this.groupList = data.rows
				}
			}




		}
	}
</script>

<style lang="scss">
	.img {
		width: 100%;

		img {
			width: 100%;
			height: 100%;
		}
	}
</style>
