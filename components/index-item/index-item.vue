<template>
	<!-- 每一个盒子 -->
	<!-- @click="navTo(`/pages/course/course-details?id=${item.id}`)" -->
	<view class="item-box" :class="{column:isColumn}" @click="toCourse">
		<view class="left">
			<img :src="item.cover" alt="">
			<text class="item-time">{{item.title=='media'?'视频':'图文'}}</text>
		</view>
		<view class="right flex flex-column">
			<view class="right-title text-ellipsis  font-md">{{item.title}}</view>
			<view class="flex flex-1 align-end count">
				<view v-if="item.price">￥{{item.price=='0.00'?'免费':item.price}}</view>
				<view :class="item.price?'grey':''">￥{{item.t_price}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import indexApi from '@/api/index.js'
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
		},
		methods:{
			async toCourse(){
				console.log(this.item)
			let list={
				id:Number(this.item.id),
				column_id:0,
				group_id:0,
				flashsale_id:0,
				
			}
			console.log(list)
			let {code,data} =await indexApi.toCourse(list)
			
			if(code==20000){
				this.$store.commit("courseList",data)
				this.navTo(`/pages/course/course?id=${this.item.id}`)
				
			}
			
			}
		}
	}
</script>

<style lang="scss">
	.item-box {
		display: flex;
		padding: 20rpx 10rpx;
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
