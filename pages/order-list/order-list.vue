<template>
	<view>

		<mescroll-uni ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback">
			<!-- 数据列表 -->
			<orderItem v-for="(item,index) in orderList" :key="index" :item="item"></orderItem>
		</mescroll-uni>


		<!-- 我的订单 -->
		<!-- <noList></noList> -->
	</view>
</template>

<script>
	import orderItem from "@/pages/order-list/components/order-Item.vue"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	import orderApi from "@/api/order.js"
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin],
		data() {
			return {
				downOption: {
					auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption: {
					auto: true, // 不自动加载
					noMoreSize: 4,
					empty: {
						tip: '~ 空空如也 ~',
					}
				},
				data: {
					page: 1,
					limit: 5,
				},
				orderList: [],
			}
		},
		props: {
			i: Number,
			data: {
				type: Object,
				default: () => {
					return {}
				}
			},

		},
		components: {
			orderItem
		},

		methods: {
			downCallback() {
				console.log(1)
				this.mescroll.resetUpScroll()
			},
			// /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				this.data.page = page.num
				let res = await orderApi.getMyOrderList(this.data)
				const list = res.data.rows
				console.log(list)

				this.orderList = this.orderList.concat(list)
				console.log(this.orderList.length, res.data.count)
				this.mescroll.endBySize(this.orderList.length, res.data.count)
			}
		}
	}
</script>

<style lang="scss">

</style>
