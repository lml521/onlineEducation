<template>
	<view>
		
		<testItem  v-for="(item,index) in list" :key="index" :item="item">
			
		</testItem>
		
		<noList></noList>
	</view>
</template>

<script>
	import testListApi from "@/api/testList.js"
	import testItem from "@/pages/my-test/components/testItem.vue"
	export default {
		
		components:{
			testItem
		},
		data() {
			return {
				data:{
					page:1,
					limit:5,
				},
				list:[]
			};
		},
		created(){
			this.getList()
		},
		methods:{
			async getList(){
				let res =await testListApi.getUserTest(this.data)
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
