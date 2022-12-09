<template>
	<view class="courseHeader">
		<view class="img">
			<img :src="item.cover" alt="">
			<text class="item-time text-white font-sm p-1">{{item.title=='media'?'视频':'图文'}}</text>
		</view>
		<view class="flex flex-column p-3">
			<view class="mb-1" style="font-size: 38rpx;">
				{{item.title}}
			</view>
			<view class="flex align-center justify-between">
				<text class="font-sm text-light-muted">
					{{item.sub_count?item.sub_count:0}}人学过
				</text>
				<!--  -->
				<text @click="changeCollect" class="iconfont  iconfont icon-shoucang1" :class="{textMain:item.isfava}"
					style="font-size: 25px;"></text>
			</view>
			<view class="flex mt-2 align-end">
				<text class="text-danger font-lg">￥{{item.price}}</text>
				<text class="font-sm text-light-muted ml-1 text-through">￥{{item.t_price}}</text>

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
			}
		},
		data() {
			return {

			};
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
				
				try{
					let res
						this.item.isfava?res = await courseApi.callSava(data):res = await courseApi.addSava(data)
				if (res.code == 20000) {
						uni.hideLoading()
						if(this.item.isfava){
							this.$util.msg('取消收藏成功')
							this.item.isfava = false
						}else{
							this.$util.msg('收藏成功')
							this.item.isfava = true
						}
					}else{
						uni.hideLoading()
						this.$util.msg(res.data)
						setTimeout(()=>{
							this.navTo('/pages/login/login')
						},500)
					}
				}catch(e){
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

	.textMain {
		color: #62ce89;
	}
</style>
