<template>
	<view>
		<!-- 创建订单 -->
		<indexItem :item="item"></indexItem>
		<view class="divider"></view>
		<userList :list="orderList" @toDiscount="toDiscount"></userList>
		<!-- {{orderList}} -->
		
		<view class="btn">
			<button @click="navTo(`/pages/create-order/create-order?id=${item.id}&type=course`)">立即购买 ￥{{item.price}}</button>
			
		</view>
	</view>
</template>

<script>
	import createOrderApi from '@/api/createOrder.js'//api
	import indexItem from "@/components/index-item/index-item.vue"//购买课程信息
	import orderList from "@/config/create-order-list.js"//订单展示 的数据
	import userList from "@/pages/tabbar/home/components/userList.vue"
	
	export default {
		components:{
			indexItem,
			userList
		},
		data() {
			return {
				data:{},
				item:{},
				orderList:orderList()
			};
		},
		onLoad(options){
			console.log(options)
			this.data=options
			this.getOrderItem(options)
		},
		methods:{
			async getOrderItem(data){
				console.log(data)
			let res =await	createOrderApi.getGood(data)
			console.log(res)
			if(res.code==20000){
				this.item=res.data
			}},
			toDiscount(e){
				console.log(123,e,this.data)
				let {id:goods_id,type}=this.data
				console.log(goods_id,type)
				this.navTo(`/pages/my-coupon/my-coupon?goods_id=${goods_id}&type=${type}`)
			}
		}
	}
</script>

<style lang="scss">
.btn{
	box-sizing: border-box;
	height: 140rpx;
	background-color: #fff;
	border-top: 1px solid #ccc;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20rpx;
	button{
		display: flex;
		    align-items: center;
		    justify-content: center;
		background-color: #5ccc84;
		border-radius: 10rpx;
		color: #fff;
	}
}
</style>
