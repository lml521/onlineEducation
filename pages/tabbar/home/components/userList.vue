<template>
	<!-- 列表封装 -->
	
	<view class="list-boxs ">
		<view v-for="(item,index) in list" :key="index">
			<view class="list p-2" v-for="(ele,i) in item" :key="i" @click="ToPage(ele)" hover-class="active"
				:hover-stay-time="100">
				<view class="flex left">
					<text v-if="ele.icon" :class="ele.icon " class=" icon"></text>
					<text class="title">{{ele.title}}</text>
				</view>
				<view class="right">
					
					<text v-if="ele.text&&ele.order" class="ml-auto font-sm">{{ele.text}}</text>
					<text v-if="ele.text&&ele.pay" class="ml-auto text-success">{{ele.text}}</text>
					<text v-if="ele.text&&!ele.order&&!ele.pay">{{ele.text}}</text>
					<text v-if="ele.rightIcon" class="iconccc" :class="ele.rightIcon"></text>
					<img v-if="ele.src" :src="ele.src" alt="">
					
					<input v-if="ele.input" type="text" v-model="value[ele.prop]"
				 :placeholder="ele.placeholder||'未填写'"
					 placeholder-class="#9b9893">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
			value:{
				type: Object,
				default: () => {}
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

				if (!item.login || this.hasLogin) {
					this.navTo(item.page)
				} else {
					this.navTo('/pages/login/login')
				}

				if (item.event) {
					this.$emit(item.event, item)
				}
			},
			
			
			// 修改 input 值 
			changeValue(e){
				console.log(1)
				console.log(this.value)
				// console.log(e)
			}
		}

	}
</script>

<style lang="scss">
	.list-boxs {
		border-bottom: 10px solid #fff !important;
		background-color: #fff !important;

		padding: 20rpx;


		.list {

			display: flex;
			justify-content: space-between;
			align-items: center;

			border-bottom: 1px solid #dbdbdb;

			&:last-child {
				border: 0 !important;
			}




			.title {
				font-size: 14px;
				color: #3b4144
			}

			.icon {
				color: #007bff;
				margin-right: 20rpx;
				font-size: 40rpx;
			}

			.right {
				.iconccc {
					color: #c1c1c1;
				}

				img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}

				input {
					font-size: 36rpx;
					text-align: right;
				}
			}

		}
	}

	.active {
		background-color: #f5f5f5;
	}
</style>
