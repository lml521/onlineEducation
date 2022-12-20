<template>
	<view>


		<bbsItem :detail="true" :item="item" @click.stop="()=>{}">
			></bbsItem>
		<view class="divider"></view>
		<view class="px-2">
			<detailItem v-for="(item,index ) in list" :item="item" @addItem="addItem"></detailItem>

			<button class="my-2" :disabled="btnText=='没有更多数据'" type="default" size="mini" style="width: 100%;"
				@click="getPageList">{{btnText}}</button>
		</view>


		<view class="" style="height: 50px;"></view>
		<uni-popup ref="popup" style="background-color: #fff;">
			<view class="flex align-center border-bottom px-3 justify-between"
				style="height: 50px; width: 100%; box-sizing: border-box;background-color: #fff;">

				<view>发表</view>
				<view>
					<button type="primary" size="mini" @click="submit">发送</button>
				</view>


			</view>
			<view class="p-2" style="background-color: #fff;">
				<textarea maxlength="140" style="overflow-y: auto;width: 100%;" placeholder="发表评论..."
					v-model="data.content"></textarea>
			</view>
		</uni-popup>

		<view class="fixed-bottom bg-white flex align-center px-3" style="height: 50px; z-index: 1;">
			<view class="border rounded flex-1 px-2 py-1 text-light-muted bg-light mr-2" @click="open">
				说一句吧
			</view>

			<view class="flex align-center " :class="{'text-danger':item.issupport}" 
			@click.stop="handelSupport">
				<text class="iconfont icon-dianzan2" style="font-size: 23px;"></text>
				<text class="ml-1">{{item.support_count}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	import bbsItem from "@/pages/bbs/components/bbs-item.vue" //头部
	import detailItem from "@/pages/post-detail/components/detailItem.vue"
	import bbsApi from "@/api/bbs.js" //api

	export default {
		components: {
			bbsItem,
			detailItem
		},
		data() {
			return {
				
				btnText: "没有更多数据",
				// id: 204, //详情id
				item: {}, //详情数据
				page: 1,
				list: [], //列表数据
				data: {
					content: "",
					post_id: "",
					reply_id: 0,
					reply_user:{
						id:"",
						avatar:"",
						name:"",
						username:""
					}

				}
			};
		},
		onLoad(options) {
			console.log(options.id)
			this.data.post_id= options.id
			this.getItem()
			this.getPostComment()
		},
		methods: {
			open() {
				this.$refs.popup.open('bottom')
			},
			getPageList() {
				this.page += 1
				this.getPostComment()
			},

			// 评论 发送 
			async submit() {
			console.log(this.data)
			let res = await bbsApi.getReply(this.data)
			console.log(res)
			if (res.code == 20000) {
				this.getPostComment()
				this.$refs.popup.close()
				this.data.content=""
			}
		},
		// 点赞 取消点赞 
		async handelSupport() {

			let res
			if (!this.item.issupport) {
				res = await bbsApi.support({
					post_id: this.data.post_id
				})
				if (res.code == 20000) {
					this.item.support_count += 1
					this.item.issupport = true
					this.$util.msg('点赞成功')
				}
			} else {
				res = await bbsApi.unsupport({
				post_id: this.data.post_id
				})
				if (res.code == 20000) {
					this.item.support_count -= 1
					this.item.issupport = false
					this.$util.msg('取消点赞')
				}
			}
		},
		async getItem() {
			let res = await bbsApi.getItme({
				id: this.data.post_id
			})
			console.log(res)

			this.item = res.data
			
		},
		addItem(item) {
			console.log(item)
			item.user.username=item.user.name
			this.data.reply_id=item.id
			this.data.reply_user=item.user
			console.log(item,this.data.reply_user)
			this.open()
		
		},

		async getPostComment() {
			try {
				const response = await bbsApi.getPostComment({
					post_id: this.data.post_id,
					page: this.page
				})
				console.log(response)
				const list = response.data.rows
				this.btnText = list.length == 10 ? "点击加载更多" : "没有更多数据"


				console.log(list)
				if (this.page === 1) {
					this.list = []
				}
				this.list = this.list.concat(list)
				// this.mescroll.endBySize(this.list.length, response.data.count)
			} catch (e) {
				console.log("error=>", e)
			}
		}


	}
	}
</script>

<style lang="scss">

</style>
