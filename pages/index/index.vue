<template>
	<view class="box">
		<view class="banner">
			<Banner :list="BannerList"></Banner>
		</view>
		<view class="">
			<multiRowNav :navList="navList"></multiRowNav>
		</view>
	</view>
</template>

<script>
import Banner from '@/components/Banner/Banner.vue'//banner组件
import indexApi from "@/api/index.js"//api请求
import multiRowNav from '@/components/multi-row-nav/multi-row-nav.vue'//nav数据组件
	export default {
		components:{
			Banner,
			multiRowNav
		},
		data() {
			return {
				// 轮播图数据 
				BannerList:[],
				
				navList:[]
			}
		},
	
	created() {
		this.getIndexList()
	},
		methods: {
			async getIndexList (){
				let {code,data} =await indexApi.getIndex()
					// console.log(res)
					if(code==20000){
						this.BannerList=data[1].data
						this.navList=data[2].data
						console.log(this.BannerList,this.navList)
						
					}
			}
		

		}
	}
</script>

<style lang="scss">
.banner{
	// padding: 0 10rpx;
}
</style>
