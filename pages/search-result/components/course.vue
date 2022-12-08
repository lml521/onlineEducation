<template>
	<view v-show="i === index" >
		<mescroll-body :ref="'mescrollRef'+i" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<indexItem :item="item" v-for="(item,index ) in searchList" :key="index"></indexItem>
		</mescroll-body>
	</view>
</template>

<script>
	import indexItem from "@/components/index-item/index-item.vue"
	import searchApi from "@/api/search.js"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin],
		components: {
			indexItem
		},
		props: {
			params: {
				type: Object,
				defaults: () => {}
			},
			i: {
				type: Number,
				default: 0
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				searchList: [],
				downOption: {
					auto: true,
				},
				upOption: {
					auto:true, // 不自动加载
					noMoreSize: 4,
					empty: {
						tip: "暂无相关数据",
						icon: ""
					}
				},

			};
		},

		methods: {
			downCallback() {

			},
			async upCallback(page) {
				console.log(this.params)
				let res = await searchApi.getSearchList(this.params)
				console.log(res)
				const list = res.data.rows

				if (page.num == 1) {
					this.searchList = []
					this.mescroll.scrollTo(0, 0)
				}
				this.searchList = this.searchList.concat(list)
				this.mescroll.endBySize(this.searchList.length, res.data.count)
			},
		}
	}
</script>

<style lang="scss">

</style>
