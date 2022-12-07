<template>

	<!-- 滚动优惠券 -->
	<scroll-view scroll-x="true" class="scroll-row ">
		<view v-for="(item,index) in couponList" :key="item.id" class="list-scroll-view ">
			<componItem :item="item" current="index"></componItem>
		</view>
	</scroll-view>
</template>

<script>
	import indexApi from "@/api/index.js"
	import componItem from "@/components/coupon-item/coupon-item.vue"
	export default {
		name: "discountCoupon",
		props: {
			couponList: {
				type: Array,
				default: () => []
			}
		},
		components: {
			componItem
		},
		data() {
			return {

			};
		},
		methods: {
			// 领取 优惠券
			async getDiscounts(item) {

				if (item.isgetcoupon) {

					this.$util.msg('您已领取过了')
					return
				}
				uni.showLoading({
					mask: true,
				})
				let res = await indexApi.getReceive({
					coupon_id: item.id
				})
				if (res.code == 20000) {
					item.isgetcoupon = !item.isgetcoupon
					uni.hideLoading();
					this.$util.msg('领取成功')
				} else {
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

		.list-scroll-view {
			display: inline-block !important;
			margin: 0 20rpx !important;
		}
	}
</style>
