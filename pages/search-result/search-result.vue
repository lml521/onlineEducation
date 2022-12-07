<template>
	<view>

		<tabBar :index="index" @changeActive="changeActive"></tabBar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar-List/tabBar-List.vue'
	export default {
		components:{
			tabBar
		},
		data() {
			return {
				index:0,
				
			};
		},
		onNavigationBarSearchInputClicked() {
				this.navTo('/pages/search/search')
		},
		methods:{
			changeActive(i){
				console.log(i)
				this.index=i
			}
		}
	}
</script>

<style lang="scss">

</style>
