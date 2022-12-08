<template>

	 <mescroll-uni 
	 :ref="'mescrollRef'+i" 
	 @init="mescrollInit" 
	 :height="height" 
	 :down="downOption"
	  @down="downCallback" 
	  :up="upOption"
	   @up="upCallback" >
		<!-- 数据列表 -->
		
		<indexItem :item="item" v-for="(item,index ) in searchList" :key="index"></indexItem>
	</mescroll-uni>
</template>

<script>
	import indexItem from "@/components/index-item/index-item.vue"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	import searchApi from "@/api/search.js"
	export default {
		mixins: [MescrollMixin,MescrollMoreItemMixin],
		components: {
			indexItem
		},
		data() {
			return {
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
				searchList: [] //列表数据
			}
		},
		props:{
			i: Number, 
			index: { 
				type: Number,
				default(){
					return 0
				}
			},
			data:{
				type: Object,
				default(){
					return{}
				}
			},
			tabs: {
				type: Array,
				default(){
					return []
				}
			},
			height: [Number,String] // mescroll的高度
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				this.data.page  = page.num 
				console.log(this.data,55555555555555)
				try{
					const response  = await searchApi.getSearchList(this.data)
					console.log(response)
					const list = response.data.rows
					console.log(list)
					if(page.num === 1){
						this.searchList = []
						this.mescroll.scrollTo(0,0)
					}
					this.searchList = this.searchList.concat(list)
					this.mescroll.endBySize(this.searchList.length, response.data.count)
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}
			},
			// handleToDetails(id){
			// 	this.navTo("/pages/article/details?id=" + id)
			// }
		}
	}
</script>
