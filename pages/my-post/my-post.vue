<template>
	<view>
		<!-- 帖子 -->
		
		<!-- /mobile/mypost?page=1&limit=5 -->
		<bbs-item v-for="(item,index) in list" :key="index" :item="item" :mypost="true"></bbs-item>
		<noList></noList>
	</view>
</template>

<script>
	import bbsApi from "@/api/bbs.js"

	import bbsItem from "@/pages/bbs/components/bbs-item.vue"
	export default {
		components:{
			bbsItem
		},
		data() {
			return {
				data:{
					page:1,
					limit:5
				},
				list:[]
			};
		},
		onLoad() {
			this.gitList()
		},
		methods:{
			async gitList(){
			let res =await bbsApi.getMypost(this.data)
			console.log(res)
			if(res.code==20000){
				this.list=res.data.rows
			}
			}
		}
	}
</script>

<style lang="scss">

</style>
