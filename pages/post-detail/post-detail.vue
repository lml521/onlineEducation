<template>
	<view>
		<bbsItem  :detail="true" :item="item" @click.stop="()=>{}">
		></bbsItem>
		<view class="divider"></view>
	</view>
</template>

<script>
	import bbsItem from "@/pages/bbs/components/bbs-item.vue"
	import bbsApi from "@/api/bbs.js"
	export default {
		components:{
			bbsItem
		},
		data() {
			return {
				id: 204,//详情id
			item:{},//详情数据
				
			};
		},
		onLoad(options){
			console.log(options.id)
			this.id=options.id
			this.getItem()
		},
		methods:{
			async getItem(){
				let res= await bbsApi.getItme({id:this.id})
				console.log(res)
				
				this.item=res.data
				console.log(this.item,this.item.user.avatar)
			}
			
		}
	}
</script>

<style lang="scss">

</style>
