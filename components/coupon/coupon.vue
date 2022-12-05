<template>

	<!-- 滚动优惠券 -->
	<scroll-view scroll-x="true" class="scroll-row ">
		<view v-for="(item,index) in couponList" :key="item.id" class="list-scroll-view">

			<view class="left">
				<text class="price font-sm">￥{{item.price}}</text>
				<view class="font-sm">
					<text>{{item.type=='column'?'适用专栏':'适用课程'}}</text>
					<text>{{item.value.title}}</text>
				</view>
			</view>
			<view class="right">
				领取
			</view>
		</view>
	</scroll-view>

</template>

<script>
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
			}

			.right {
				float: right;
				display: inline-block;
				width: 120rpx;
				color: #fff;
				height: 116rpx !important;
				line-height: 116rpx;
				text-align: center;
				background-color: #ffc107;
				font-size: 15px !important;
			}
		}
	}
</style>
