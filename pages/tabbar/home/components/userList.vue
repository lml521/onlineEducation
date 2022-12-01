<template>
	<!-- 列表封装 -->
	<view class="list-box p-3">
		<view v-for="(item,index) in list" :key="index"  >
			<view class="list p-2" v-for="(ele,i) in item" :key="i" @click="ToPage(ele)" 
			hover-class="active" :hover-stay-time="100" >
				<text v-if="ele.icon" 
				:class="ele.icon " 
				class=" icon"></text>
				<text class="title">{{ele.title}}</text>
				<text class="rightIcon"
				></text>
			</view>
		</view>
		<!--  -->
	</view>
</template>

<script>
	import {mapGetters} from "vuex";
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {

			};
		},computed: {

			...mapGetters(["hasLogin"]),
		},
		methods:{
			// 点击nav跳转页面
			ToPage(item) {
				/**  点击时判断 是否需要登录 才能跳转 
				     在判断是否存在token  
					 当用户需要登录才能跳转 时候   判断 token 是否有效
				 */  
				console.log(item)

				if(!item.login||this.hasLogin){
			 	this.navTo(item.page)
				
				}else{
					this.navTo('/pages/login/login')
				}
			}
		}
	
	}
</script>

<style lang="scss">
	.list-box {
		background-color: #fff;
		.list {
			border-bottom: 1rpx solid #efeff4;
			&:last-child{
				border: 0 !important;
			}
			.title {
				font-size: 14px;
				color: #3b4144
			}
			.icon{
				color: #007bff;
				margin-right: 20rpx;
				font-size: 40rpx;
			}
			.rightIcon{
				margin-top: 10rpx;
				float: right;
				width: 18rpx;
				height: 18rpx;
				border-top: 2px solid #ccc;
				border-right: 2px solid #ccc;
				transform: rotate(45deg);
			}
		}
	}
	.active{
		background-color: #f5f5f5;
	}
</style>
