<template>
	<view class="courseHeader">
		<view class="img">
			<img :src="item.cover" alt="">
			<text class="item-time text-white font-sm p-1">{{item.title=='media'?'视频':'图文'}}</text>
		</view>
		<view class="flex justify-between bg-danger text-white px-3 py-2" v-if="item.group">
			<view class="flex flex-column align-start">
				<view class=" flex align-center">
					<text class="font mr-1">
						￥{{item.group.price}}
					</text>
					<text class="font-sm text-through flex ">
						￥{{item.price}}
					</text>
				</view>
				<view class="bg-white rounded text-danger font-sm py-1 px-2 mt-1">{{item.group.p_num}}人拼团
				</view>
			</view>
			<view class="flex align-center">
				<text class="font-sm">距结束
				</text>
				<view class="uni-countdown">
					<text class="uni-countdown__number" >
						{{time.days}}
					</text>
					<text class="font-sm">天</text>
					<text class="uni-countdown__number" >
						{{time.hours}}
					</text>
					<text class="font-sm">:</text>
				<text class="uni-countdown__number" >
					{{time.mins}}
				</text>
				<text class="font-sm">:</text>
				<text class="uni-countdown__number" >
					{{time.Scons}}
				</text>
				</view>

			</view>
		</view>
		<view class="flex flex-column p-3">
			<view class="mb-1" style="font-size: 38rpx;">
				{{item.title}}
			</view>
			<view class="flex align-center justify-between">
				<text class="font-sm text-light-muted">
					{{item.sub_count?item.sub_count:0}}人学过
				</text>
			
				<text @click="changeCollect" class="iconfont  iconfont icon-shoucang1" :class="{textMain:item.isfava}"
					style="font-size: 25px;"></text>
			</view>
			<view class="flex mt-2 align-end">
				<text class="text-danger font-lg">￥{{item.price}}</text>
				<text class="font-sm text-light-muted ml-1 text-through">￥{{item.t_price}}</text>

			</view>
		</view>
	
	
			<view class="divider"></view>
			
			
			<view class="uni-card__header" v-if="rowsList.length">
				{{rowsList[0].num}}人在拼单,可直接参与
				
			</view>
			<view class="p-2 con border-bottom">
				<view class="flex align-center  ">
					<img src="/static/userImg.png" class="bg-dark mr-2 image" alt="">
					<text>{{rowsList[0].users[0].username}}</text>
					<view class=" flex-1 font pl-1">
						<view class="flex mb-1">
							还差<text class="text-danger">{{rowsList[0].num}}人</text>拼成
						</view>
						<view class="flex align-center font text-muted">
							剩余<text style="padding: 0 10rpx;" >
						{{time.hours}}
					</text>
					<text class="font-sm">:</text>
				<text style="padding: 0 10rpx;"  >
					{{time.mins}}
				</text>
				<text class="font-sm">:</text>
				<text style="padding: 0 10rpx;"  >
					{{time.Scons}}
				</text>
						</view>
					</view>
					<button class="mx-1" type="primary" size="mini">去拼单</button>
				</view>
			</view>
	</view>
</template>

<script>	
	import courseApi from "@/api/course.js"
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			time: {
				type: Object,
				default: () => {}
			},
			rowsList:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {

			};
		},
		created(){
		},
		methods: {
			async changeCollect() {
				uni.showLoading({
					title: "操作中...",
					mask: true
				})
				console.log(this.item.type)
				let data = {
					goods_id: this.item.id,
					type: "course"
				}

				try {
					let res
					this.item.isfava ? res = await courseApi.callSava(data) : res = await courseApi.addSava(data)
					if (res.code == 20000) {
						uni.hideLoading()
						if (this.item.isfava) {
							this.$util.msg('取消收藏成功')
							this.item.isfava = false
						} else {
							this.$util.msg('收藏成功')
							this.item.isfava = true
						}
					} else {
						uni.hideLoading()
						this.$util.msg(res.data)
						setTimeout(() => {
							this.navTo('/pages/login/login')
						}, 500)
					}
				} catch (e) {
					console.log(e)
				}

			}
		}
	}
</script>

<style lang="scss">
	
	.courseHeader {
		.img {
			width: 100%;
			height: 420rpx;
			position: relative;

			img {
				width: 100%;
				height: 100%;
			}

			.item-time {
				font-size: 14rpx;
				color: #fff;
				position: absolute;
				right: 10px;
				bottom: 10rpx;
				background-color: rgba(0, 0, 0, 0.4);
			}

		}
	}
	.uni-countdown{
    display: flex;
    flex-direction: row;
	align-items: center;
    justify-content: flex-start;
    padding: 1px 0;

	.uni-countdown__number {
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    width: 26px;
	    height: 24px;
	    line-height: 24px;
	    margin: 2px;
	    text-align: center;
	    font-size: 12px;
		border-color: rgb(255, 255, 255);
		 color: rgb(255, 255, 255);
		  background-color: rgb(195, 21, 46);
	}
	}





.uni-card__header {
    display: flex;
    position: relative;
    flex-direction: row;
    padding: 12px;
    align-items: center;
}
.con{
	.image{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
}
	.textMain {
		color: #62ce89;
	}
</style>
