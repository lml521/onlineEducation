<template>
	<view>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" :height="height" :down="downOption" @down="downCallback"
		 :up="upOption" @up="upCallback">
			<testItem v-for="(item,index) in list" :key="index" :item="item">

			</testItem>
			<noList></noList>
		</mescroll-uni>

	</view>
</template>

<script>
	import testListApi from "@/api/testList.js"
	import testItem from "@/pages/my-test/components/testItem.vue"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";

	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin],


		components: {
			testItem
		},
		data() {
			return {
				downOption: {
					auto: true // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption: {
					auto: true, // 不自动加载
					noMoreSize: 4,
					empty: {
						tip: '没有更多数据',
					}
				},
				data: {
					page: 1,
					limit: 5,
				},
				list: []
			};
		},
		props: {
			data: {
				type: Object,
				default () {
					return {}
				}
			},
			height: [Number, String] // mescroll的高度
		},

		methods: {

			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				this.data.page = page.num
				try {
					let res = await testListApi.getUserTest(this.data)
					console.log(res)
					let list = res.data.rows
					if (this.data.page === 1) {
						this.list = []
						this.mescroll.scrollTo(0, 0)
					}
					this.list = this.list.concat(list)
					this.mescroll.endBySize(this.list.length, res.data.count)
				} catch (e) {
					console.log("error=>", e)
				}
			},




		}
	}
</script>

<style lang="scss">

</style>
