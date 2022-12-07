<template>

	<!-- 滚动优惠券 -->
	<scroll-view scroll-x="true" class="scroll-row ">
		
		<view v-for="(item,index) in couponList" :key="item.id" class="list-scroll-view " :class="{active:item.isgetcoupon}">
			<view class="left">
				<!-- {{item.isgetcoupon}} -->
				<view class="price font-md">￥{{item.price}}</view>
				<view class="font-sm">
					<text>{{item.type=='column'?'适用专栏':'适用课程'}}:</text>
					<text>{{item.value.title}}</text>
				</view>
			</view>
			<view class="right" @click="getDiscounts(item)">
				{{item.isgetcoupon?'未领取':'领取'}}
			</view>
		</view>
		
	</scroll-view>

</template>

<script>
	import indexApi from "@/api/index.js"
	export default {
		name: "discountCoupon",
		props: {

			couponList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {

			};
		},
		methods:{
			// 领取 优惠券
			async getDiscounts(item){
				
				if(item.isgetcoupon){
					this.$util.msg('您已领取过了')
					return 
				} 
				uni.showLoading({
					mask:true,
				})
				let res =await indexApi.getReceive({coupon_id:item.id})
				if(res.code==20000){
					uni.hideLoading();
					this.$util.msg('领取成功')
				}else{
						this.$util.msg(res.data)
				}
			
			}
		}
	}
</script>

<style lang="scss">
	.scroll-row {
		padding: 20rpx;
		box-sizing: border-box;
		white-space: nowrap;
		height: 160rpx !important;
		background-color: #fff;
		display: flex !important;

.active{
	.left,.right{
		background-color: #dae0e5 !important;
	}
	
}
		.list-scroll-view {
			display: inline-block !important;
			margin: 0 20rpx !important;

			.left {
				color: #fff;
				float: left;
				display: inline-block;
				padding: 10px 15px;
				background-color: #d39e00;
				border-right: 2px dashed;
				.price{
					text-align: center;
				}
			}

			.right {
				float: right;
				display: inline-block;
				width: 120rpx;
				color: #fff;
				// height: 116rpx !important;
				height: 100% !important;
				line-height: 116rpx;
				text-align: center;
				background-color: #ffc107;
				font-size: 15px !important;
			}
		}
	}
</style>
