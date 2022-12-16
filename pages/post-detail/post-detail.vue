<template>
	<view>
		
		<mescroll-uni :ref="'mescrollRef'+i" @init="mescrollInit" :down="downOption"
			@down="downCallback" :up="upOption" @up="upCallback">
		<bbsItem  :detail="true" :item="item" @click.stop="()=>{}">
		></bbsItem>
		<view class="divider"></view>
	<view  class="px-2">
		
	
			<detailItem v-for="(item,index ) in list" :item="item"></detailItem>
		</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import bbsItem from "@/pages/bbs/components/bbs-item.vue"//头部
	import detailItem from "@/pages/post-detail/components/detailItem.vue"
	import bbsApi from "@/api/bbs.js"//api
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";

	export default {
			mixins: [MescrollMixin, MescrollMoreItemMixin],
		components:{
			bbsItem,
			detailItem
		},
		data() {
			return {
				id: 204,//详情id
				item:{},//详情数据
				page: 1,
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
			list: [] //列表数据
			};
		},
		onLoad(options){
			console.log(options.id)
			this.id=options.id
			this.getItem()
		},
		methods:{
			async getItem(){
				let res= await bbsApi.getItme({id:this.id})
				console.log(res)
				
				this.item=res.data
				console.log(this.item,this.item.user.avatar)
			},
			
			
			
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				this.page = page.num
				console.log(this.data)
				try {
					const response = await bbsApi.getPostComment({post_id:this.id,page:this.page})
					console.log(response)
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
			},
			
		}
	}
</script>

<style lang="scss">

</style>
