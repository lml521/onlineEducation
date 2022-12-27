<template>
	<view class="testBox">

		<view class="countDown" v-if="this.testList.length">
			考试时间
			<uni-countdown :hour="h" :minute="m" :second="s" :show-day="false" color="red" splitorColor="red">
			</uni-countdown>
		</view>

		<view class="loading" v-else>
			加载中...
		</view>
		<!-- 题目 -->
	
			<examination :item="item" :i="index" v-if="this.testList.length"></examination>
	
		<view class="" style="height: 100rpx; position: fixed;bottom: 0;">
			
		</view>
		<!-- 1 -->
		<view class="footer">
			<testFooter :list="list" :lengths="lengths" :i="index" @back="back" @submit="submit" @next="next">
			</testFooter>
		</view>


	</view>
</template>

<script>
	import list from '@/config/testList.js'
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
				list: list(),
				h: 1, //时
				m: 0, //分
				s: 0, //秒
				id: "", //id
				testList: [], //获取考试的全部数据
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


		computed: {
			unDone() {
				// 问题: 怎么样才能知道用户哪些题填了, 哪些没填
				let arr = [] // 用来保存没有填写的题目序号

				this.testList.forEach((item, index) => {
					if ((item.type === 'answer' || item.type === 'completion') && !item.user_value[0]) {
						arr.push(index + 1)
					} else if ((item.type === 'trueOrfalse' || item.type === 'radio') && item.user_value === -1) {
						arr.push(index + 1)
					} else if (item.type === "checkbox" && item.user_value.length === 0) {
						arr.push(index + 1)
					}

				})

				return arr
			}
		},

		methods: {

			async getTestList() {
				let res = await testApi.getTestList({
					id: this.id
				})
				console.log(res)
				if (res.code == 20000) {
					this.testList = res.data.testpaper_questions
					this.examInfo = res.data
					this.item = this.testList[this.index - 1]
					this.lengths = this.testList.length
					this.index = 1
				console.log(res.data.expire)
				if(res.data.expire>0&&res.data.expire<60){
					this.h= 0 //时
					this.m=res.data.expire //分
					this.s= 0 //秒
				}else if (res.data.expire>60&&res.data.expire<120){
					this.h= 1 //时
					this.m=res.data.expire-60 //分
					this.s= 0 //秒
				}
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
				this.item = this.testList[this.index - 1]
			},
			// 下一题
			next() {
				console.log(this.index)
				if (this.index == this.testList.length) return
				this.index = this.index + 1
				this.item = this.testList[this.index - 1]
			},
			// 提交 
			submit() {
				if (this.unDone.length > 0) {
					uni.showModal({
						content: `还有题目没有完成,第${this.unDone}题`,
						showCancel: false,
						confirmText: '确定',
						success: res => {},
					});
					return
				}

				let arrs = this.testList.map(item => item.user_value)
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
	.footer{
		background-color: #fff;
	}
</style>
