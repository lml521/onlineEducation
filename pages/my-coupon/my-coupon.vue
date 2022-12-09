<template>
	<view class="couponBox">
		<!-- 我的优惠券 -->
		<couponItem v-for="(item,index) in rowsList" :key="index" :item="item" current="home"></couponItem>
		<noList></noList>
	</view>
</template>

<script>
	import couponItem from "@/components/coupon-item/coupon-item.vue"
	import indexAPi from "@/api/index.js"
	export default {
		data() {
			return {
				rowsList:[],
				data:{
					page:1,
					limit:10
				}
			};
		},
		components:{
			couponItem,
		},
		onLoad(options){
			console.log(options,26)
			this.getList()
		},
		
		methods:{
			async getList (){
				let {code,data} =await indexAPi.userCoupon(this.data)
				
				if(code==20000){
					this.rowsList=data.rows
					
				}
			}
			
			
		}
	}
</script>

<style lang="scss">
.couponBox{
	padding: 30rpx;
	box-sizing: border-box;
}
</style>
