<template>
	<view>
		<!-- 帖子 每一项 -->
		<view class="itemBox p-3" @click="toDetail">
			<view class="user flex align-center w-100">
				<img class="mr-2 img  " :src="item.user.avatar||'/static/userImg.png'" alt="">
				<view>
					<view class="text-primary font-weight-bold">{{item.user.name}}</view>
					<view class="text-muted font">{{item.user.sex}}</view>
				</view>
				<view class="post-tag" v-if="!mypost">精华</view>
			</view>

			<view class="py-2" :class="{'p-2':detail}">
				<view>
					{{item.desc.text}}
				</view>
				<view class="imgs flex flex-wrap">
					<view class="flex align-center justify-center mt-1" style="width: 33.33%;"
						v-for="(ele,i) in item.desc.images" :class="{detailImg:detail}">
						<img :src="ele">
					</view>
				</view>
			</view>
			<view class="flex align-center justify-between mt-2" v-if="!detail">
				<view class="flex align-center">
					<view class="flex align-center pr-2">
						<text class="iconfont icon-pinglun2" style="font-size: 23px;"></text>
						<text class="ml-1">{{item.comment_count||'评论'}}</text>
					</view>
					<view class="flex align-center " :class="{'text-danger':item.issupport}"
						@click.stop="handelSupport">
						<text class="iconfont icon-dianzan2" style="font-size: 23px;"></text>
						<text class="ml-1">{{item.support_count||'点赞'}}</text>
					</view>
				</view>

				<button v-if="mypost" @click.stop="detailList" type="warn" size="mini">删除</button>

				<view class="text-light-muted font">
					{{item.created_time}}
				</view>
			</view>
		</view>
		<view class="divider"></view>
	</view>
</template>

<script>
	import bbsApi from "@/api/bbs.js"

	export default {
		props: {
			mypost: {
				type: Boolean,
				default: false,
			},
			// 是否是详情
			detail: {
				type: Boolean,
				default: false,

			},
			// 当前 这一项
			item: {
				type: Object,
				default: () => {}
			}
		},
		
		methods: {
			detailList() {
				uni.showLoading({
					mask: true
				})
				uni.showModal({

					content: '是否要删除该帖子？',
					success: async (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							let res = await bbsApi.deleteList({
								id: this.item.id
							})
							console.log(res)
							if (res.code == 20000) {
								this.$emit("gitList")
								uni.hideLoading()
								this.$util.msg('删除成功')
							} else {
								uni.hideLoading()
								this.$util.msg('删除失败')
							}
						} else if (res.cancel) {
							uni.hideLoading()
							console.log('用户点击取消');
						}
					}
				})
				console.log(this.item.id)
			},
			// 点赞 取消点赞 
			async handelSupport() {

				let res
				if (!this.item.issupport) {
					res = await bbsApi.support({
						post_id: this.item.id
					})
					if (res.code == 20000) {
						this.item.support_count += 1
						this.item.issupport = true
						this.$util.msg('点赞成功')
					}
				} else {
					res = await bbsApi.unsupport({
						post_id: this.item.id
					})
					if (res.code == 20000) {
						this.item.support_count -= 1
						this.item.issupport = false
						this.$util.msg('取消点赞')
					}
				}
			},
			// 跳转详情 
			toDetail() {
				console.log(1234, this.item.id)
				this.navTo(`/pages/post-detail/post-detail?id=${this.item.id}`)
			}
		}
	}
</script>

<style lang="scss">
	.detailImg {
		width: 100% !important;

		img {
			width: 320px !important;
			height: 208px !important;
		}
	}

	.itemBox {
		.user {
			.img {
				width: 76rpx;
				height: 76rpx;
				border-radius: 50%;
			}

			.post-tag {
				padding: 5px 10px;
				color: #fff;
				background-color: #ffc107;
				margin-left: auto;
				font-size: 14px !important;
			}
		}

		.imgs {
			img {
				width: 220rpx;
				border-radius: 8rpx;
				height: 220rpx;
			}
		}
	}
</style>
