<template>
	<view class="box">

		<tabBar :index="index" @changeActive="changeActive"></tabBar>
		<view class="">
			<course ref="mescrollItem0" :i="0" :index="index" :params="data"></course>

			<column ref="mescrollItem1" :i="1" :index="index" :params="data"></column>

		</view>

	</view>
</template>

<script>
	import tabBar from '@/components/tabBar-List/tabBar-List.vue' //tab组件
	import indexItem from "@/components/index-item/index-item.vue"
	import searchApi from "@/api/search.js"
	import column from "@/pages/search-result/components/column.vue"
	import course from "@/pages/search-result/components/course.vue"
	import MescrollMoreMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more.js"
	export default {
		mixins: [MescrollMoreMixin],
		components: {
			tabBar,
			indexItem,
			course,
			column
		},
		data() {
			return {

				index: 0,
				data: {
					keyword: "",
					page: 1,
					type: "course"
				},
				searchList: []

			};
		},
		onNavigationBarSearchInputClicked() {
			this.navTo('/pages/search/search')
		},


		onLoad(options) {
			this.data.keyword = options.keyword
		},
		methods: {
			// 切换 课程 专栏 
			changeActive(i) {
				if (i.detail) {
					this.index = i.detail.current
					this.data.type = 'course'
				} else {
					this.index = Number(i)
					this.data.type = 'column'
				}
			},
		}
	}
</script>

<style lang="scss">
	// page{
	// 	height: 100%;
	// }
	// .box{
	// 	height: 100%;
	// 	display: flex;
	// 	flex-direction: column;
	// }
	// .swiper-box{
	// 	height: 100%;
	// }
	// .scroll-view {
	// 	height: 100%;
	// 	flex: 1;
	// }
</style>
