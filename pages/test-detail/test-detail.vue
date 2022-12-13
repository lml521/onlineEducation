<template>
	<view class="testBox">
		<view class="countDown">
			考试时间
			<uni-countdown :hour="h" :minute="m" :second="s" :show-day="false" color="red" splitorColor="red">
			</uni-countdown>
		</view>
		<!-- 题目 -->
		<examination :item="item" :i="index"></examination>
		<view class="footer">
			<testFooter @back="back" @submit="submit" @next="next"></testFooter>
		</view>


	</view>
</template>

<script>
	import uniCountdown from "@/uni_modules/uni-countdown/components/uni-countdown/uni-countdown.vue" //倒计时
	import testApi from "@/api/test.js"
	import examination from "@/components/examination/examination.vue"
	import testFooter from "@/components/testFooter/testFooter.vue"
	export default {
		components: {
			examination,
			testFooter
		},
		data() {
			return {
				h: 1,
				m: 0,
				s: 0,
				id: "",
				list: [],
				index: 1,
				item: {}
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
			this.id = options.id
			this.getTestList()
		},
		methods: {

			async getTestList() {
				let res = await testApi.getTestList({
					id: this.id
				})
				console.log(res)
				if (res.code == 20000) {
					console.log(res.data.testpaper_questions)
					this.list = res.data.testpaper_questions
					this.item = res.data.testpaper_questions[this.index]
					console.log(res.data.testpaper_questions[this.index])
				}
			},


			// 返回上一题 
			back() {
				console.log(this.index)
				if (this.index == 1) return
				this.index = this.index - 1
			},
			// 提交 
			submit() {
				console.log()
				uni.showModal({
					content: '还有题目没有完成',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						}
					}
				})
			},


			// 下一题
			next() {
				console.log(this.index)
				if (this.index == this.item.length) return
				this.index = this.index + 1
			},
		}

	}
</script>

<style lang="scss">
	.countDown {
		width: 100%;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		color: red;
		display: flex;
		border-top: 0.5px solid red;
		border-bottom: 0.5px solid red;
		padding: 10px 0;
		font-size: 17px;
		height: 25px;
		z-index: 1000;
	}

	/deep/ .uni-countdown__splitor {
		font-weight: 900 !important;
	}

	// .footer{
	// 	position: fixed;
	// }
</style>
