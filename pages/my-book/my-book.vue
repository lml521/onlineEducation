<template>
	<view>
		<indexItem v-for="(item,index) in list" :key="index" :item="item" :imgmin="true" ></indexItem>
			<noList></noList>
	</view>
</template>

<script>
	import bbsApi from "@/api/bbs.js"
	import indexItem from "@/components/index-item/index-item.vue"
	export default {
		data() {
			return {
				data:{
					page: 1,
					limit: 5
				},
				list:[]
			};
		},
		components:{
			indexItem,
		},
		created() {
			this.getList()
		},
		methods:{
			async getList(){
				let res =await bbsApi.getBook(this.data)
				console.log(res)
				this.list=res.data.rows
				console.log(this.list)
			}
			
		}
	}
</script>

<style lang="scss">

</style>
