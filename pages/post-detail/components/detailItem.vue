<template>
	<view class="py-2 itemBox flex">

		<img :src="item.user.avatar||'/static/userImg.png'" class="mr-2">
		<view class="flex-1">
			<view style="color: #007aff;font-size: 12px;">
				{{item.user.name}}
			</view>
			<view style="padding: 4px;">
				{{item.content}}
			</view>
			<view style="color: #666;font-size: 12px;">
				{{ item.created_time | filtTime}}

			</view>
			<view class="pl-2 mt-3">
				<view class="" v-if="item.post_comments.length>0" v-for="(ele,i) in item.post_comments "
					class="py-2 flex" style="background-color: #f8f9fa;">

					<img :src="ele.user.avatar||'/static/userImg.png'" class="mr-2">
					<view class="flex-1">
						<view style="color: #007aff;font-size: 12px;">
							{{ele.user.name}}@{{ele.reply_user.name}}
						</view>
						<view style="padding: 4px;">
							{{ele.content}}
						</view>
						<view style="color: #666;font-size: 12px;">
							{{ele.created_time|filtTime}}

						</view>
					</view>

				</view>
			</view>

		</view>


	</view>
</template>

<script>
	import moment from "moment"
	moment.locale('zh-cn');  
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
		filters: {
			filtTime(item) {
				console.log(item, new Date(item).getTime())
				// moment().format('LLL')
				return moment(new Date(item).getTime()).format('YYYY-MM-DD a h:mm')
			}
		},
		methods: {


		}
	}
</script>

<style lang="scss">
	.itemBox {
		img {
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
		}
	}
</style>
