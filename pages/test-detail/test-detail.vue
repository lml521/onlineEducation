<template>
	<view class="testBox">

		<view class="countDown" v-if="this.list.length">
			考试时间
			<uni-countdown :hour="h" :minute="m" :second="s" :show-day="false" color="red" splitorColor="red">
			</uni-countdown>
		</view>

		<view class="loading" v-else>
			加载中...
		</view>
		<!-- 题目 -->
		<view class="mb100">
			<examination :item="item" :i="index" v-if="this.list.length"></examination>
		</view>
		<view class="footer">
			<testFooter :lengths="lengths" :i="index" @back="back" @submit="submit" @next="next"></testFooter>
		</view>


	</view>
</template>

<script>
	import uniCountdown from "@/uni_modules/uni-countdown/components/uni-countdown/uni-countdown.vue" //倒计时
	import testApi from "@/api/test.js"
	import testListApi from "@/api/testList.js"
	import examination from "@/components/examination/examination.vue"
	import testFooter from "@/components/testFooter/testFooter.vue"
	export default {
		components: {
			examination,
			testFooter
		},
		data() {
			return {
				h: 1, //时
				m: 0, //分
				s: 0, //秒
				id: "", //id
				list: [], //获取考试的全部数据
				index: 1, //当前题的
				lengths: 0,
				item: {},
				examInfo: {}, //信息
			};
		},
		components: {
			uniCountdown
		},
		// 返回 退出 
		onBackPress(event) {
			console.log(event)
			if (event.from == "backbutton") {
				console.log(123)
				uni.showModal({
					content: "是否要放弃本次考试",
					success: (res) => {
						if (res.confirm) {
							this.navBack()
						}
					}
				})
				return true
			} else {
				uni.redirectTo({
					url: "/pages/test-list/test-list"
				})
				return false
			}
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
					this.list = res.data.testpaper_questions
					this.examInfo = res.data
					this.item = this.list[this.index - 1]
					this.lengths = this.list.length
					this.index = 1
					console.log(this.examInfo)
				} else {
					this.index = 0
					this.$util.msg(res.data)
					setTimeout(() => {
						this.navBack()
					}, 1000)
				}
			},


			// 返回上一题 
			back() {
				console.log(this.index)
				if (this.index == 1) return
				this.index = this.index - 1
				this.item = this.list[this.index - 1]
			},
			// 提交 
			submit() {
				let arrs = this.list.map(item => item.user_value)
				let obj = {
					user_test_id: this.examInfo.user_test_id,
					value: arrs
				}
				uni.showModal({
					content: '确定要交卷吗',
					success: (res) => {
						if (res.confirm) {
							this.HandInAnExamination(obj)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			async HandInAnExamination(obj) {
				try {
					const res = await testListApi.getHandInAnExamination(obj)
					console.log(res);
					if (res.code !== 20000) {
						this.$util.msg(res.data.slice(0, 4) + '没有答题')
					} else {
						this.$util.msg('交卷成功')
						setTimeout(() => {
							this.navBack()
						}, 1000)
					}
				} catch (e) {
					console.log(e);
				}
			},

			// 下一题
			next() {
				console.log(this.index)
				if (this.index == this.list.length) return
				this.index = this.index + 1
				this.item = this.list[this.index - 1]
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

	.loading {
		width: 100%;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		display: flex;
		color: #6c757d;
		padding: 30px 0;
		border-bottom: 0.5px solid #ccc;
	}

	/deep/ .uni-countdown__splitor {
		font-weight: 900 !important;
	}
</style>
