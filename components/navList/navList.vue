<template>
	<!-- nav封装 -->
	<view class="box flex text-center">
		<view class="flex-1 flex flex-column align-conent  justify-center py-3" 
		v-for="(item,index) in list" :key="index" @click="ToPage(item)" 
		 hover-class="active" :hover-stay-time="100">
			<text :class="item.icon " class="icon"></text>
			<span class="title">{{item.title}}</span>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from "vuex";
	export default {
		name: "navList",
		props: {
			// nav数据 
			list: {
				type: Array,
				default: () => []
			}

		},
		data() {
			return {

			};
		},
		computed: {

			...mapGetters(["hasLogin"]),
		},
		methods: {
			// 点击nav跳转页面
			ToPage(item) {
				/**  点击时判断 是否需要登录 才能跳转 
				     在判断是否存在token  
					 当用户需要登录才能跳转 时候   判断 token 是否有效
				 */  
				if(!item.login||this.hasLogin){
					// 当  路径为 /pages/tabbar/learn/learn 时是跳转tab页面 
					if(item.page=="/pages/tabbar/learn/learn"){
						uni.switchTab({url:item.page})
					}else{
						this.navTo(item.page)
					}
				}else{
					this.navTo('/pages/login/login')
				}
			}
		}
	}
</script>

<style lang="scss">
	.box {
		background-color: #fff;
		border-radius: 10rpx;
		width: 100%;
		height: 100%;
		box-shadow: 2px 2px 5px #ddd;

		.icon {
			font-size: 40rpx;
			margin: auto;
		}

		.title {
			font-size: 24rpx;
			color: #707880;
		}
	}
	.active {
		background-color: #f5f5f5;
	}
</style>
