<template>
	<view class="box">
		
		<indexSkeleton v-if="loading"></indexSkeleton>
		
		
		<!-- 搜索框 -->
		<view class="p-2" >
			<view class="flex align-center justify-center py-2 rounded" 
			style="background-color: rgb(245, 245, 241); color: rgb(146, 142, 138);"
			@click="navTo('/pages/search/search')">
				<uni-icons type="search" size="20" color="#928e8a"></uni-icons>
				<text class="ml-2">请输入搜索关键词</text>
			</view>
		</view>
		
		<!-- 轮播图 -->
		<Banner :list="BannerList"></Banner>
		
		<!-- nav 导航栏 -->
		<multiRowNav :navList="navList" 
		@column="column" @test="test" @flashsale="flashsale" @group="group" @live="live"
		@book="book" @bbs="bbs"></multiRowNav>

		<!-- 优惠券 -->
		<!-- discountCoupon -->
		<coupon :couponList="couponList" :isColumn="true"></coupon>
		
		<!-- 下划线 -->
		<view class="divider"></view>
		
		<!-- 拼团 -->
		<h4 class="flex align-center py-3 px-2">
			<text class="font-md font-weight-bold">
				拼团
			</text>
		</h4>
		<!-- 拼团列表 -->
		<scrollCourse :list="groupList"></scrollCourse>

		<!-- 下划线 -->
		<view class="divider"></view>
		
		<!-- 最新列表 -->
		<h4 class="flex align-center py-3 px-2 justify-between">
			<text class="font-md font-weight-bold">最新列表</text>
			<text class="font-sm text-light-muted">查看更多</text>
		</h4>
		
		<indexItem v-for="(item,index) in newestList" :key="index" :item="item"></indexItem>

		<view class="divider"></view>
		
		<!-- 图片广告 -->
		<view class="img">
			<img :src="imageAd" alt="" draggable="false">
		</view>
	</view>
</template>

<script>
	import indexSkeleton from "./components/indexSkeleton.vue"
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
			scrollCourse,
			indexSkeleton
		},
	
		data() {
			return {
				loading:false,
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
		onPullDownRefresh (){
			console.log('触发了下拉刷新')
			setTimeout(()=>{
				this.getIndexList()
				this.getCoupon()
				uni.stopPullDownRefresh()
			},3000)
			return
		},
		created() {
			this.loading=true
			this.getIndexList()
			this.getCoupon()
			this.getGroupList()
		},
		watch:{
			"$store.state.isToken":{
				handler(newVal){
					this.getCoupon()
				},
				immediate:true
			}
		},
		methods: {
			// 获取轮播图 nav 数据 
			async getIndexList() {
				let {code,data} = await indexApi.getIndex()
				if (code == 20000) {
					this.BannerList = data[1].data
					this.navList = data[2].data
					this.newestList = data[5].data
					this.imageAd = data[6].data
					console.log(this.BannerList, this.navList)
					this.loading=false
				}
			},
			// 优惠券数据 
			async getCoupon() {
				let { code, data } = await indexApi.getCoupon()
				console.log(code,data)
				if (code == 20000) {
					this.couponList = data
					this.loading=false
				}
			},
			// 获取拼团数据
			async getGroupList() {
				let {code,data} = await indexApi.getGroupList({
					usable: this.usable
				})
				if (code == 20000) {
					this.groupList = data.rows
				}
			},
			// 专栏 
			column(item){
				this.navTo(`/pages/list/list?module=${item.module}`)
			},
			// 考试 
			test(item){
				// console.log("考试")
				this.navTo('/pages/test-list/test-list')
			},
			// 秒杀
			flashsale(item){
				this.navTo(`/pages/list/list?module=${item.module}`)
			},
			
			// 拼团 
			group(item){
					this.navTo(`/pages/list/list?module=${item.module}`)
			},
			
			// /pages/list/list?module=live
			// 直播
			live(item){
					this.navTo(`/pages/list/list?module=${item.module}`)
			},
			
			// 电子书
			book(item){
				this.navTo('/pages/book-list/book-list')
			},
			// 社区 
			bbs(item){
				this.navTo('/pages/bbs/bbs')	
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
