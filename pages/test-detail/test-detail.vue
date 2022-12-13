<template>
	<view class="testBox">
		<view class="countDown">
			考试时间
			<uni-countdown :hour="h" :minute="m" :second="s" :show-day="false" color="red" splitorColor="red">
			</uni-countdown>
		</view>

	</view>
</template>

<script>
	import uniCountdown from "@/uni_modules/uni-countdown/components/uni-countdown/uni-countdown.vue"//倒计时
	import testApi from "@/api/test.js"
	export default {
		data() {
			return {
				h: 1,
				m: 0,
				s: 0,
				id:""
			};
		},
		components: {
			uniCountdown
		},
		// 返回 退出 
		onBackPress() {
			uni.showModal({
				content: '是否要放弃这场考试？',
				cancelText: "继续做题",
				confirmText: "放弃",
				success: (res) => {
					if (res.confirm) {
						console.log('用户放弃');
						this.navTo('/pages/test-list/test-list')
					} else if (res.cancel) {
						console.log('用户点击取消');
						return false
					}
				}
			});
			return true
		},
		onLoad(options) {
			console.log(options.id)
			this.id=options.id
			this.getTestList()
		},
		methods:{
			async getTestList(){
				let res =await testApi.getTestList({id:this.id})
				console.log(res)
			}
		}

	}
</script>

<style lang="scss">
	.countDown {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		color: red;
		border-top: 0.5px solid red;
		border-bottom: 0.5px solid red;
		padding: 10px 0;
		font-size: 17px;
		height: 25px;
		position: fixed;
		left: 0;
		right: 0;
		z-index: 1000;
	}
	
	/deep/ .uni-countdown__splitor{
		font-weight: 900 !important;
	} 

</style>
