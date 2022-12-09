<template>
	<view class="box">

		<tabBar :index="index" @changeActive="changeActive"></tabBar> 
 	<!-- 下面子数据 -->
 		<swiper :style="{height: height}" :current="index" @change="changeActive">
 			<swiper-item v-for="(tab,i) in tabList" :key="i" :style="{height: height}">
 				<mescroll-item 
 				ref="mescrollItem" 
 				:i="i" 
 				:index="index" 
 				:tabs="tabList" 
 				:height="height"
				:data="data"
				>
 				</mescroll-item>
 			</swiper-item>
 		</swiper>
	</view>
</template>

<script>
	
	import MescrollItem from "@/pages/search-result/components/mescroll-swiper-item.vue"
	import tabBar from '@/components/tabBar-List/tabBar-List.vue' //tab组件
	import indexItem from "@/components/index-item/index-item.vue"
	import searchApi from "@/api/search.js"
	import MescrollMoreMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more.js"
	export default {
		mixins: [MescrollMoreMixin],
		components: {
			tabBar,
			indexItem,
			MescrollItem
		},
		data() {
			return {
				index: 0,
				data: {
					keyword: "",
					page: 1,
					type: "course"
				},
				height:"",
				tabList: [
					{
						title:"课程",
						id:0
					},{
						title:"专栏",
						id:1
					}
				]
			};
		},
		onNavigationBarSearchInputClicked() {
			this.navTo('/pages/search/search')
		},
		onLoad(options) {
			this.height = uni.getSystemInfoSync().windowHeight - uni.upx2px(80) + 'px'
			this.data.keyword = options.keyword
		},
		methods: {
			// 切换 课程 专栏 
			changeActive(i) {
				i.detail?this.index = i.detail.current:this.index = Number(i)
				i==0?this.data.type='course':this.data.type='column'
				
			},
		}
	}
</script>

<style lang="scss">
	
</style>
