<template>
	<view class="px-1 pt-2 scroll-row">
		<!-- 社区 -->
		<scroll-view scroll-x="true" @scrolltolower="scrolltolower">

			<view v-for="(item,index) in bbsList"
				class="item scroll-row-item border px-3 py-1 rounded mx-1 mb-2 bg-light text-muted"
				:class="{active:current==item.id}" @click="changeCurrent(item.id)">{{item.title}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import bbsAPi from "@/api/bbs.js"
	export default {
		data() {
			return {
				page: 1,
				current: 0,
				bbsList: []
			};
		},
		created() {
			this.getList()
		},

		methods: {
			// 获取 数据
			async getList() {
				
				
				
				let res = await bbsAPi.getBbs({
					page: this.page
				})
				console.log(res)
				if (res.code == 20000) {
					if(this.bbsList.length==res.data.count) return
					
					
					if(this.page==1){
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
				this.current = id
			},
			scrolltolower(e) {
				console.log(1, e)
				this.page += 1
				this.getList()
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
</style>
