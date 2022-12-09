<template>
	<view class="content">
		<view class="title">
			课程简介
		</view>
		<view class="contentHtml" v-html="item.try">

		</view>

	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.content {
		.title {
			padding: 20rpx;
			border-bottom: 1px solid #ccc;
		}

		.contentHtml {
			padding: 0 25rpx;
			box-sizing: border-box;

		}
	}

	img {
		width: 100% !important;
	}
</style>
