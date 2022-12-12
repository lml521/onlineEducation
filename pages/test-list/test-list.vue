<template>
	<view class="listBox">
		<!-- 考试列表 -->
		<mescroll-uni
		 :ref="'mescrollRef'+i" 
		 @init="mescrollInit" 
		 :down="downOption"
		  @down="downCallback" 
		  :up="upOption"
		   @up="upCallback" >
			<!-- 数据列表 -->
			<testpaperItem :item="item" v-for="(item,index ) in list" :key="index"></testpaperItem>
		</mescroll-uni>
	</view>
</template>

<script>
	import testListApi from "@/api/testList.js"
	import testpaperItem from "@/pages/test-list/components/testpaperItem.vue"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	export default {
		mixins: [MescrollMixin,MescrollMoreItemMixin],
		components:{
			testpaperItem
		},
		data() {
			return {
				// type:"",
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
		
		methods:{
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				this.data.page  = page.num 
				try{
					   let response  = await testListApi.testpaper(this.data)
						console.log(response)
					const list = response.data.rows
					console.log(list)
					if(page.num === 1){
						this.list = []
						this.mescroll.scrollTo(0,0)
					}
					this.list = this.list.concat(list)
					this.mescroll.endBySize(this.list.length, response.data.count)
					
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
