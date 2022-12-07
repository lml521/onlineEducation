<template>
	<view>
		<courseHeader :item="item"></courseHeader>
	</view>
</template>

<script>
	import courseHeader from '@/pages/course/components/course-header.vue'
	export default {
		components:{
			courseHeader
		},
		data() {
			return {
				item:{}
			};
		},
		onLoad(){
			this.item=this.$store.state.courseItem
			uni.setNavigationBarTitle({
				title:this.item.title
			})
		},
		computed(){
			this.item=this.$store.state.courseItem
			uni.setNavigationBarTitle({
				title:this.item.title
			})
		}
	}
</script>

<style lang="scss">

</style>
