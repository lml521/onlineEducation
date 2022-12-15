<template>
	<view class="itemBox p-3">
		<view class="user flex align-center w-100">
			<img class="mr-2 img  " :src="item.user.avatar||'/static/userImg.png'" alt="">
			<view >
				<view class="text-primary font-weight-bold">{{item.user.name}}</view>
				<view class="text-muted font">{{item.user.sex}}</view>
			</view>
			<view class="post-tag">精华</view>
		</view>
		
		<view class="py-2">
			<view>
				{{item.desc.text}}
			</view>
			<view class="imgs flex flex-wrap">
				<view class="flex align-center justify-center mt-1" style="width: 33.33%;"  v-for="(ele,i) in item.desc.images">
					<img  :src="ele" alt="">
				</view>
				
			</view>
		</view>
		
		
		<view class="flex align-center justify-between mt-2">
			<view class="flex align-center">
				<view class="flex align-center pr-2">
					<text class="iconfont icon-pinglun2" style="font-size: 23px;"></text>
				<text class="ml-1">{{item.comment_count}}</text>
				</view>
				 <view class="flex align-center " :class="{'text-danger':item.issupport}">
					<text class="iconfont icon-dianzan2"  style="font-size: 23px;"></text>
				<text class="ml-1">{{item.support_count}}</text>
				</view> 
			</view>
		<view class="text-light-muted font">
			{{item.created_time}}
			
		</view>
			
		</view>
		<!-- {{item.desc.text}} -->
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {
					return {
						bbs_id: 210,
						comment_count: 140,
						created_time: "2022-07-03 16:36:12",
						desc: {
							text: "你干嘛",
							images: [],
						},
						images: [],
						text: "你干嘛",
						id: 204,
						is_top: 1,
						issupport: true,
						support_count: 20,
						user: {
							id: 1970,
							avatar: "",
							sex: "未知",
							name: "🐔哥你干嘛",
						},
						avatar: "",
						id: 1970,
						name: "🐔哥你干嘛",
						sex: "未知",
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

		}
	}
</script>

<style lang="scss">
.itemBox{
	.user{
		.img{
			width: 76rpx;
			height: 76rpx;
			border-radius: 50%;
		}
		
		.post-tag{
			    padding: 5px 10px;
			    color: #fff;
			    background-color: #ffc107;
			    margin-left: auto;
			    font-size: 14px!important;
		}
	}
	
	.imgs{
		img{
			width: 220rpx; 
			border-radius: 8rpx;
			height: 220rpx; 
			// margin: 10rpx;
			// box-sizing: border-box;
		}
	}
}
</style>
