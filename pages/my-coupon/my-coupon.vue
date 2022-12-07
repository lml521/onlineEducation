<template>
	<view class="couponBox">
		<!-- 我的优惠券 -->
		<couponItem ></couponItem>
		<!-- <noList></noList> -->
	</view>
</template>

<script>
	import couponItem from "@/components/coupon-item/coupon-item.vue"
	export default {
		data() {
			return {
				
			};
		},
		components:{
			couponItem,
		}
	}
</script>

<style lang="scss">
.couponBox{
	padding: 30rpx;
	box-sizing: border-box;
}
</style>
