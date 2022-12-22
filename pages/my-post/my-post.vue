

<template>

	 <mescroll-uni 
	 :ref="'mescrollRef'+i" 
	 @init="mescrollInit" 

	 :down="downOption"
	  @down="downCallback" 
	  :up="upOption"
	   @up="upCallback" >
		<!-- 数据列表 -->
		
		<bbs-item v-for="(item,index) in list" :key="index" :item="item" :mypost="true" @gitList="gitList">
		</bbs-item>
	</mescroll-uni>
</template>

<script>
	
	import bbsApi from "@/api/bbs.js"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	import bbsItem from "@/pages/bbs/components/bbs-item.vue"
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin],
		components: {
			bbsItem
		},
		data() {
			return {
				data:{
					page:1,
					limit:5
				},
				downOption:{
					auto:false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption:{
					auto:false, // 不自动加载
					noMoreSize: 4,
					empty:{
						tip: '~ 空空如也 ~',
					}
				},
				list: [] //列表数据
			}
		},
		props:{
			
			i: { 
				type: Number,
				default(){
					return 0
				}
			},
			
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				this.data.page  = page.num 
				try{
					let res = await bbsApi.getMypost(this.data)
					console.log(res)
					let list = res.data.rows
					if (this.data.page === 1) {
						this.list = []
						this.mescroll.scrollTo(0, 0)
					}
					this.list = this.list.concat(list)
					console.log(this.list.length, res.data.count)
					this.mescroll.endBySize(this.list.length, res.data.count)
				}catch(e){
					console.log("error=>", e)
				}
			},
			
		}
	}
</script>


<!-- 
		methods: {

			/*下拉刷新的回调 */
			downCallback() {
				console.log(123)
				this.mescroll.resetUpScroll()
			},
			// /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				 console.log(456)
				this.data.page = page.num
			let res = await bbsApi.getMypost(this.data)
			console.log(res)
			let list = res.data.rows
			if (this.data.page === 1) {
				this.list = []
				this.mescroll.scrollTo(0, 0)
			}
			this.list = this.list.concat(list)
			console.log(this.list.length, res.data.count)
			this.mescroll.endBySize(this.list.length, res.data.count)
			},
			
			async gitList(){
				let res = await bbsApi.getMypost(this.data)
				console.log(res)
				let list = res.data.rows
				if (this.data.page === 1) {
					this.list = []
					this.mescroll.scrollTo(0, 0)
				}
				this.list = this.list.concat(list)
				console.log(this.list.length, res.data.count)
				this.mescroll.endBySize(this.list.length, res.data.count)
			},
		}
	} -->

