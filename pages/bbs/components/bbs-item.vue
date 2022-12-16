<template>
	<!-- 帖子 每一项 -->
	<view class="itemBox p-3" @click="toDetail">
		<view class="user flex align-center w-100">
			<img class="mr-2 img  " :src="item.user.avatar||'/static/userImg.png'" alt="">
			<view>
				<view class="text-primary font-weight-bold">{{item.user.name}}</view>
				<view class="text-muted font">{{item.user.sex}}</view>
			</view>
			<view class="post-tag">精华</view>
		</view>

		<view class="py-2" :class="{'p-2':detail}">
			<view>
				{{item.desc.text}}
			</view>
			<view class="imgs flex flex-wrap">
				<view class="flex align-center justify-center mt-1" style="width: 33.33%;"
					v-for="(ele,i) in item.desc.images" :class="{detailImg:detail}">
					<img :src="ele" alt="">
				</view>
			</view>
		</view>
<!-- iconfont icon-shanchu text-white -->
		<view class="flex align-center justify-between mt-2" v-if="!detail">
			<view class="flex align-center">
				<view class="flex align-center pr-2">
					<text class="iconfont icon-pinglun2" style="font-size: 23px;"></text>
					<text class="ml-1">{{item.comment_count}}</text>
				</view>
				<view class="flex align-center " :class="{'text-danger':item.issupport}" 
				@click.stop="handelSupport">
					<text class="iconfont icon-dianzan2" style="font-size: 23px;"></text>
					<text class="ml-1">{{item.support_count}}</text>
				</view>
			</view>
			<view class="text-light-muted font">
				{{item.created_time}}
			</view>

		</view>
	</view>
</template>

<script>
	import bbsApi from "@/api/bbs.js"
	
	export default {
		props: {
			// 是否是详情
			detail:{
				type:Boolean,
				default:false,
				
			},
			// 当前 这一项
			item: {
				type: Object,
				default: () => {
					return {
						bbs_id: 210,
						comment_count: 141,
						created_time: "2022-07-03 16:36:12",
						desc: {
							text: "你干嘛",
							images: []
						},
						id: 204,
						is_top: 1,
						issupport: true,
						support_count: 21,
						user: {
							id: 1970,
							avatar: "",
							sex: "未知",
							name: "🐔哥你干嘛"
						},
						user_id: 1970,
					}
				}
			}
		},
		data() {
			return {

			}
		},


		methods: {
			// 点赞 取消点赞 
			async handelSupport() {
			
				let res
				if (!this.item.issupport) {
					res = await bbsApi.support({post_id: this.item.id})
					if(res.code==20000){
						this.item.support_count+=1
						this.item.issupport=true
						this.$util.msg('点赞成功')
					}
				}else{
					res = await bbsApi.unsupport({post_id: this.item.id})
					if(res.code==20000){
						this.item.support_count-=1
						this.item.issupport=false
						this.$util.msg('取消点赞')
					}
				}
			},
			// 跳转详情 
			toDetail(){
				console.log(1234,this.item.id)
				this.navTo(`/pages/post-detail/post-detail?id=${this.item.id}`)
			}
		}
	}
</script>

<style lang="scss">
	.detailImg{
		width: 100% !important;
		img{
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
