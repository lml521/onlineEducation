<template>
	<view>
		<view class="p-2 order-item">
		<view class="py-2 flex font-sm text-muted ">
			<view class="flex-1">订单时间：{{item.created_time}}</view>
			<view class="flex-1">订单号：{{item.no}}</view>
		</view>
		<view class="order-title">
			{{item.goods}}
		</view>
		<view class="oeder-price justify-end">
			￥{{item.price}}
		</view>
			</view>
		<view class="forder">
			<text v-if="item.status=='success'" style="color: #28a745;">交易成功</text>
			<text v-else>等待支付</text>
		</view>
		<view class="divider"></view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {
					return {
						created_time: "2022-12-25 09:51:07",
						goods: "[电子书]22",
						id: 1770,
						no: "202212259517l4ez5btpy",
						price: "0.00",
						status: "success",
						total_price: "0.00",
						type: "default",
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
	.order-item{
		border-bottom: 1px solid #ccc;
	}
		.oeder-price{
			overflow: hidden;
			color: #dc3545;
			font-weight: 700;
			display: flex;
		}
	
.forder{
	height: 90rpx;
	display: flex;
	padding-left: 25rpx;
	align-items: center;
}
</style>
