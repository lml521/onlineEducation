<template>
	<view class="item mb-3 flex text-white coupon-used" 
	:class="{activeCCC:item.isgetcoupon}">
		<view class="left flex flex-column flex-1 bg-hover-warning p-2">
			<view class="price font-md font-lg" :class="{fw20:current=='home'}">￥{{item.price}}</view>
			<view class="font-sm ">
				<text>{{item.type=='column'?'适用专栏':'适用课程'}}:</text>
				<text>{{ current=='index'?item.value.title:item.title}}</text>
			</view>
		</view>
		<view v-if="current=='index'" class="right flex align-center justify-center bg-warning "
			style="width: 100px;" @click="getDiscounts(item)">
			{{item.isgetcoupon?'已领取':'领取'}}
		</view>
		<view v-else class="right flex align-center justify-center bg-warning " 
		style="width: 100px;" hover-class="active"
				:hover-stay-time="200">
			{{item.used?'已使用':'立即使用' }}
		</view>
	</view>
</template>

<script>
	import indexApi from "@/api/index.js"
	export default {
		name: "coupon-item",
		props: {
			current: {
				type: String,
				default: "index"
			},
			item: {
				type: Object,
				default: () => {
					return {
						end_time: "2032-06-30 00:00:00",
						goods_id: 11,
						id: 986,
						price: "50.00",
						start_time: "2021-05-16 01:03:00",
						title: "uni-app实战直播app全栈开发",
						type: "course",
						used: 0,
					}

				}
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
					item.isgetcoupon=!item.isgetcoupon
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
	.active {
		background-color: #d39e00 !important;
	}

	.activeCCC {
		.left ,.right{
			
		background-color: #dae0e5 !important;
		}
	}

	.item {
		display: flex;

	}

	.left {
		color: #fff;
		// float: left;
		display: flex;
		flex-direction: column;
		display: inline-block;
		padding: 10px 10px;
		background-color: #d39e00;
		border-right: 2px dashed;
		.fw20{
			font-size: 20px !important;
			text-align:left !important;
		}
		.price {
			text-align: center;
		}
	}

	.right {
		// flex: 1;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffc107;
		font-size: 15px !important;
	}
</style>
