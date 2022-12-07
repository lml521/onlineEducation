<template>
	<view class="item">
		<view class="left">
			<view class="price font-md">￥{{item.price}}</view>
			<view class="font-sm">
				<text>{{item.type=='column'?'适用专栏':'适用课程'}}:</text>
				<text>{{item.title}}</text>
			</view>
		</view>
		<view class="right" @click="getDiscounts(item)">
			{{item.isgetcoupon?'未领取':'领取'}}
		</view>

	</view>
</template>

<script>
	export default {
		name: "coupon-item",
		props: {
			item: {
				type: Object,
				default: () => {
					return {
					end_time:"2032-06-30 00:00:00",
					goods_id:11,
					id: 986,
					price:"50.00",
					start_time: "2021-05-16 01:03:00",
					title:"uni-app实战直播app全栈开发",
					type:"course",
					used:0,	
					}
					
				}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.item{
		display: flex;
		
	}
	.left {
		color: #fff;
		// float: left;
		display: flex;
		flex-direction: column;
		display: inline-block;
		padding: 10px 15px;
		background-color: #d39e00;
		border-right: 2px dashed;

		.price {
			text-align: center;
		}
	}

	.right {
		flex: 1;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffc107;
		font-size: 15px !important;
	}
</style>
