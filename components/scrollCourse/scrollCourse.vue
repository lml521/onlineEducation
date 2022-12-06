<template>

		<scroll-view scroll-x class="list-scroll noScorll">
			<view class="list-scroll-view" v-for="item in list" :key="item.id">
			<indexItem :item="item" :isColumn="true"></indexItem>
			</view>
		</scroll-view>
	
</template>

<script>
	import indexItem from '@/components/index-item/index-item.vue'
	export default {
		components: {
		indexItem
		},
		props: {
			list: {
				type: Array,
				default:() => []
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		// 内容一行显示不换行
		white-space: nowrap;
		height: 300rpx;

		.list-scroll-view {
			display: inline-block;
			width: 310rpx;
			background-color: #fff;
			padding: 0 10rpx;
			margin-right: 20rpx;
			border-radius: 20rpx;
		}
	}
</style>
