<template>
	<view>
		<view class="p-2" v-html="content" style="border-bottom: 1px solid #ccc;">

		</view>

		<view class="footer">
			<testFooter :list="list" :lengths="item.menus.length" :i="index" @back="back" @submit="submit" @next="next">
			</testFooter>
		</view>

	</view>
</template>

<script>
	import bbsApi from "@/api/bbs.js"
	import list from "@/config/bookList.js"
	import testFooter from "@/components/testFooter/testFooter.vue"
	export default {
		components: {
			testFooter
		},
		data() {
			return {
				list: list(),
				data: {
					id: '223',
					book_id: '90'
				},
				item: {},
				index: 1,
				lengths: 1,
				content: ""
			};
		},
		onLoad(options) {
			console.log(options)
			this.data = options
			this.getList()
		},
		methods: {
			// /mobile/book/detail?book_id=90&id=223
			async getList() {
				let res = await bbsApi.getBookdetail(this.data)
				console.log(res)
				this.item = res.data
				this.content = res.data.content
				uni.setNavigationBarTitle({
					title: this.item.title
				})
			},
			// 返回上一题
			back() {
				console.log(this.index)
				if (this.index == 1) return
				this.index = this.index - 1
				this.data.id = this.item.menus[this.index - 1].id
				this.getList()

			},
			// 下一题
			next() {
				console.log(this.index)
				if (this.index == this.item.menus.length) return
				this.index = this.index + 1
				this.data.id = this.item.menus[this.index - 1].id
				this.getList()
			},
		}
	}
</script>

<style lang="scss">

</style>
