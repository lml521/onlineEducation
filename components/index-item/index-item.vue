<template>
	<!-- 每一个盒子 -->
	<view class="item-box" :class="{column:isColumn,wrap:type}" @click="toCourse">

		<view class="left" :class="{leftImg:imgmin}">
			<img :src="item.cover" alt="">
			<text class="item-time text-white font-sm ">{{item.type|formatType}}</text>
		</view>

		<view class="right flex flex-column">
			<view class="right-title text-ellipsis  font-md" :class="{maxWidth:type}">{{item.title}}</view>
			<slot name="desc"></slot>

			<view class="" v-if="type=='live'" class="font-sm my-1  text-danger">
				直播中
			</view>

			<view class="flex flex-1 align-end count   text-ellipsis" :class="{flexBox:imgmin}">
				<view class="font text-danger" v-if="type=='flashsale'" style="font-size: 16px;">秒杀价:</view>
				<slot>
					<view class="font text-danger" v-if="type=='group'" style="font-size: 16px;">拼团价:</view>
					<view v-if="item.price" style="font-size: 16px;">￥{{item.price=='0.00'?'免费':item.price}}</view>
					<view :class="item.price?'grey':''" v-if="item.t_price">￥{{item.t_price}}</view>
				</slot>
				<view v-if="imgmin"
					class="border flex align-center justify-center rounded-circle px-2 py-1 ml-auto text-muted"
					style="color: #6c757d;margin-right: 30rpx;" @click.stop="navTo(`/pages/book-detail/book-detail?id=${item.id}`)">
					{{item.sub_count}}人订阅
					<text class="iconfont icon-xiayibu ml-1"></text>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import indexApi from '@/api/index.js'
	export default {
		name: "course-item",
		props: {
			imgmin: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: ""
			},
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

		filters: {
			formatType(value) {
				let type = {
					media: '图文',
					audio: '音频',
					video: '视频',
					column: '专栏'
				}
				return type[value]
			}
		},

		methods: {
			async toCourse() {
				console.log(this.item.type, this.item.id)
				if (!this.item.type) {
					console.log(123)
					this.navTo(`/pages/column/column?id=${this.item.id}`)
				} else if (this.item.group_id) {
					this.navTo(`/pages/course/course?id=${this.item.id}&group_id=${this.item.group_id}`)
				} else {
					this.navTo(`/pages/course/course?id=${this.item.id}`)
				}

			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		display: inline-block !important;

		flex-wrap: wrap !important;
	}

	.maxWidth {
		max-width: 300rpx !important;
	}

	.leftImg {
		width: 184rpx !important;
		height: 234rpx !important;
		position: relative;
		margin-right: 20rpx;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.flexBox {
		width: 100% !important;
		// display: block !important; 
	}

	.item-box {
		// display: inline-block !important;
		display: flex;
		margin: 0 0 20rpx 10rpx;
		// padding: 20rpx;

		.left {
			width: 340rpx;
			height: 180rpx;
			position: relative;
			margin-right: 20rpx;

			img {
				width: 100%;
				height: 100%;
			}

			.item-time {
				position: absolute;
				right: 5px;
				bottom: 5px;
				background-color: rgba(0, 0, 0, .4);
				padding: 0 5px;
				box-sizing: border-box;
				font-size: 14rpx;
				color: #fff;
			}
		}

		.right {
			flex: 1;

			.right-title {
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-line-clamp: 1;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				white-space: normal;
			}

			.count {
				view {
					font-size: 34rpx;
					color: #dc3545;
				}

				.grey {
					font-size: 24rpx;
					color: grey;
				}
			}
		}
	}
</style>
