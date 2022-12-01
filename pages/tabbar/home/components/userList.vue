<template>
	<!-- 列表封装 -->
	<view class="list-box p-3">
		<view v-for="(item,index) in list" :key="index">
			<view class="list p-3" v-for="(ele,i) in item" :key="i">
				<text v-if="ele.icon" 
				:class="ele.icon " 
				class="text-primary  mr-2"></text>
				<text class="title">{{ele.title}}</text>
				<span class="rightIcon"
				></span>
			</view>
		</view>
		<!--  -->
	</view>
</template>

<script>
	export default {
		props: {
			list: {
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
	.list-box {
		background-color: #fff;
		.list {
			border-bottom: 1px solid #bdbdbd;
			&:last-child{
				border: 0 ;
			}
			.title {
				font-size: 14px;
				color: #3b4144
			}
			.rightIcon{
				margin-top: 10rpx;
				float: right;
				width: 18rpx;
				height: 18rpx;
				border-top: 2px solid #ccc;
				border-right: 2px solid #ccc;
				transform: rotate(45deg);
			}
		}
	}
</style>
