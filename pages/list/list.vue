<template>
	<view class="listBox">
		<!-- 专栏列表 -->
		<mescroll-uni :ref="'mescrollRef'+i" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback">
			<!-- 专栏 -->
			<indexItem v-if="type=='column'" :isColumn="false"  
			:item="item" v-for="(item,index ) in list" :key="item.id"></indexItem>
			
			<!-- 秒杀 -->
			<indexItem v-if="type=='flashsale'" type="flashsale" :isColumn="true" 
			:item="item" v-for="(item,index ) in list" :key="item.id"></indexItem>
			
			<indexItem v-if="type=='group'" type="group" :isColumn="true"
			:item="item" v-for="(item,index ) in list" :key="item.id"></indexItem>
			
			
			<indexItem v-if="type=='live'" type="live" :isColumn="true"
			:item="item" v-for="(item,index ) in list" :key="item.id"></indexItem>
			
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
				type: "",
				data: {
					page: 1,
					limit: 10
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
		onLoad(options) {
			this.type = options.module
			console.log(options.module)
			let title=options.module == 'column'?'专栏列表':options.module == 'flashsale'?'秒杀列表':options.module == 'group'?'拼团列表':'直播列表'
			uni.setNavigationBarTitle({title})
		},
		methods: {
			downCallback() {
				this.mescroll.resetUpScroll()
			},
		
			async upCallback(page) {
				this.data.page = page.num
				try {
					let response
					
					
					// 专栏 
					if (this.type == 'column') {
						response = await listApi.getList(this.data)
						console.log('专栏',response)
						
						// 秒杀
					}else if(this.type == 'flashsale'){
					this.data.usable=1
					response = await listApi.getFlashsale(this.data)
					console.log('秒杀',response)
					
					// 拼团
					}else if(this.type == 'group'){
					this.data.usable=1
					response = await listApi.getGroup(this.data)
					console.log("拼团",response)
					
					// 直播
					}else if(this.type == 'live'){
					response = await listApi.getLive(this.data)
					console.log("直播",response)
					}
					
					
					
					
					
					
					
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
