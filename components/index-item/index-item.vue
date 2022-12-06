<template>
	<!-- 每一个盒子 -->
	<!-- @click="navTo(`/pages/course/course-details?id=${item.id}`)" -->
	<view class="item-box" :class="{column : isColumn}">
		<view class="left">
			<img :src="item.cover" alt="">
			<text class="item-time">{{item.title=='media'?'视频':'图文'}}</text>
		</view>
		<view class="right flex flex-column">
			<view class="right-title text-ellipsis  font-md">{{item.title}}</view>
			<view class="flex flex-1 align-end count">
				<view v-if="item.price">￥{{item.price}}</view>
				<view class="grey">￥{{item.t_price}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "course-item",
		props: {

			isColumn: {
				type: Boolean,
				default: false
			},

			item: {
				type: Object,
				default: () => {
					return {
						cover: "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/10ccf3a973f5193bec3c.png",
						end_time: "2024-06-29T16:00:00.000Z",
						group_id: 29,
						id: 6,
						price: "5.00",
						start_time: "2021-05-15T17:04:00.000Z",
						t_price: "9.98",
						title: "VueCli 实战在线教育后台系统",
						type: "media",
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
	.item-box {
		// background-color: pink;
		display: flex;
		padding: 20rpx 10rpx;
		// border-bottom: 2rpx solid #ccc;

		.left {
			width: 300rpx;
			height: 170rpx;
			position: relative;
			margin-right: 20rpx;

			img {
				width: 100%;
				height: 100%;
			}

			.item-time {
				position: absolute;
				bottom: 0;
				background-color: rgba(0, 0, 0, .2);
				padding: 3rpx 8rpx;
				font-size: 14rpx;
				right: 0;
				color: #fff;
			}
		}

		.right {
			margin-right: 22rpx;
			flex: 1;

			.right-title {
				// max-width: 300rpx;
				
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-line-clamp: 1;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				white-space: normal;
			}

			.count {
				view {
					font-size: 38rpx;
					color: #dc3545;
				}

				.grey {
					font-size: 28rpx;
					color: grey;
				}
			}
		}
	}
</style>
