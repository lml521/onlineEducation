<template>
	<view>
		<!-- 新增帖子 -->
		<view class="p-2">
			<view class="uni-list-cell-db">
				<picker @change="bindPickerChange" :value="index" :range="list" 
				range-key="title">
					<button size="mini" type="default" 
					style="width: 100%;">{{title}}</button>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
	import bbsApi from "@/api/bbs.js"
	export default {
		data() {
			return {
				title:"选择社区",
				data: {
					page: 1,
					limit: 100
				},
				
				list: [],
				index: -1,
			};
		},
		created() {
			this.getbbsList()
		},
		methods: {
			async getbbsList() {
				let res = await bbsApi.getBbs(this.data)
				console.log(res)
				if (res.code == 20000) {
					this.list = res.data.rows
					console.log(this.list)
				}

			},

			// 选择器  选中一项 . 获取到下标 再根据 全部数据 获取到title
			bindPickerChange(e) {
				this.index = e.detail.value
				this.title=this.list[this.index].title
			}

		}
	}
</script>

<style lang="scss">

</style>
