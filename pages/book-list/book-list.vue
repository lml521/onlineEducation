<template>
	<view>
		<!-- 电子书 -->
		<mescroll-uni :ref="'mescrollRef'+i" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback">
			<indexItem :imgmin="true" :item="item" v-for="(item,index ) in list" :key="item.id"></indexItem>
		</mescroll-uni>
	</view>
</template>

<script>
	import listApi from "@/api/list.js"
	import indexItem from "@/components/index-item/index-item.vue"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin],
		components: {
			indexItem
		},
		data() {
			return {
				data: {
					page: 1,
					limit: 10,
				},
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
				list: [],
			};
		},
		

			methods: {
				downCallback() {
					this.mescroll.resetUpScroll()
				},

				async upCallback(page) {
					this.data.page = page.num
					try {
						let response = await  listApi.getBookList(this.data)
						console.log('专栏', response)
						const list = response.data.rows
						console.log(list)
						if (page.num === 1) {
							this.list = []
							this.mescroll.scrollTo(0, 0)
						}
						this.list = this.list.concat(list)
						this.mescroll.endBySize(this.list.length, response.data.count)

					} catch (e) {
						console.log("error=>", e)
					}
				}
			}
		}
</script>

<style lang="scss">

</style>
