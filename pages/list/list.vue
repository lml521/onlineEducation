<template>
	<view class="listBox">
		<!-- 专栏列表 -->
		<mescroll-uni
		 :ref="'mescrollRef'+i" 
		 @init="mescrollInit" 
		 :down="downOption"
		  @down="downCallback" 
		  :up="upOption"
		   @up="upCallback" >
			<!-- 数据列表 -->
			<indexItem :item="item" v-for="(item,index ) in list" :key="index"></indexItem>
		</mescroll-uni>
	</view>
</template>

<script>
	import listApi from "@/api/list.js"
	import indexItem from "@/components/index-item/index-item.vue"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	export default {
		mixins: [MescrollMixin,MescrollMoreItemMixin],
		components:{
			indexItem
		},
		data() {
			return {
				type:"",
				data:{
					page: 1,
					limit:10
				},
				downOption:{
					auto:true // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption:{
					auto:true, // 不自动加载
					noMoreSize: 4,
					empty:{
						tip: '~ 空空如也 ~',
					}
				},
				list:[],
			};
		},
		onLoad(options) {
			console.log(options.module)
			this.type=options.module
		},
		methods:{
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				this.data.page  = page.num 
				try{
					console.log(this.type,this.type=='column')
					let response
					if(this.type=='column'){
					    response  = await listApi.getList(this.data)
						console.log(response)
					const list = response.data.rows
					console.log(list)
					if(page.num === 1){
						this.list = []
						this.mescroll.scrollTo(0,0)
					}
					this.list = this.list.concat(list)
					this.mescroll.endBySize(this.list.length, response.data.count)
					}
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}
			},
			
			
		}
		
	}
</script>

<style lang="scss">

</style>
