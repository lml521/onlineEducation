<template>
	<view class="box">
		<mescroll-uni :ref="'mescrollRef'+i" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback" style="background-color: pink;">

			<view class="px-1 pt-2 scroll-row">
				<!-- 社区 -->
				<scroll-view scroll-x="true" @scrolltolower="scrolltolower">
					<view v-for="(item,index) in bbsList"
						class="item scroll-row-item border px-3 py-1 rounded mx-1 mb-2 bg-light text-muted"
						:class="{active:data.bbs_id==item.id}" @click="changeCurrent(item.id)">{{item.title}}
					</view>
				</scroll-view>
				<view class="divider"></view>
				<!-- 总帖子 总用户 -->
				<view class="tabNav">
					<view>总帖子{{postCount}}</view>
					<view>总用户{{userCount}}</view>
				</view>
				<view class="divider"></view>
			</view>
			<bbsItem v-for="(item,index) in list" :key="index" :item="item"></bbsItem>
		</mescroll-uni>

	</view>
	</view>
</template>

<script>
	import bbsAPi from "@/api/bbs.js"
	import bbsItem from "@/pages/bbs/components/bbs-item.vue"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	export default {

		mixins: [MescrollMixin, MescrollMoreItemMixin],
		components: {
			bbsItem
		},
		data() {
			return {
				data: {
					page: 1, //当前页
					keyword: '', //搜索内容
					bbs_id: 0, //当前id
				},
				list: [],
				bbsList: [], //全部数据
				postCount: 266, //总帖子
				userCount: 2349, //总用户
				downOption: {
					auto: true // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption: {
					auto: true, // 不自动加载
					noMoreSize: 4,
					empty: {
						tip: '~ 空空如也 ~',
					}
				},
			};
		},
		async created() {
			await this.getbbsList()
			
		},
		onShow() {
			this.getList()
		},
		
		// 按钮 跳转新增帖子页面 
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.navTo('/pages/add-post/add-post')
			}
		},
		// 实时会获取搜索框你们的内容
		onNavigationBarSearchInputChanged(e) {
			this.content = e.text
			console.log(this.content)
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			 upCallback(page) {
				this.data.page = page.num
				this.getList()
			},
			async getList() {
				try {
					let response = await bbsAPi.getPostList(this.data)
					const list = response.data.rows
					if (this.data.page=== 1) {
						this.list = []
						this.mescroll.scrollTo(0, 0)
					}
					this.list = this.list.concat(list)
					this.mescroll.endBySize(this.list.length, response.data.count)
				} catch (e) {
					console.log("error=>", e)
				}
			},

			// 获取 滚动 数据
			async getbbsList() {
				let res = await bbsAPi.getBbs({
					page: this.data.page
				})
				console.log(res)
				if (res.code == 20000) {
					this.postCount = res.data.postCount
					this.userCount = res.data.userCount
					if (this.bbsList.length == res.data.count) return
					if (this.data.page == 1) {
						this.bbsList = res.data.rows
						this.bbsList.unshift({
							id: 0,
							title: "全部"
						})
						return
					}
					this.bbsList = this.bbsList.concat(res.data.rows)
				}
			},
			// 切换当前选中
			changeCurrent(id) {
				this.data.bbs_id = id
				this.getList()
			},
			// 滚动时触发 
			scrolltolower(e) {
				this.data.page += 1
				this.getbbsList()
			},

			

		}
	}
</script>

<style lang="scss">
	.item {
		display: flex;
		display: inline-block;
		border: 1px solid #dee2e6;
	}

	.active {
		background-color: #5ccc84;
		color: #fff;
	}

	.tabNav {
		display: flex;

		padding: 20rpx 0;

		view {
			flex: 1;
			font-weight: 700;
			color: #7a8489;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
