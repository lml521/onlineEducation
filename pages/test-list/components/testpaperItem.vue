<template>
	<!-- 考试 -->
	<view class="box">

		<view class="card">
			<view class="flex justify-between title">
				<h4>{{item.title}}</h4>
				<text style="color:#dc3545;font-size: 24rpx;">时长：{{item.expire}}分钟</text>
			</view>
			<view class="flex">
				<text class="flex-1">
					题目总数：{{item.question_count}}
				</text>
				<text class="flex-1">
					总分数：{{item.total_score}}
				</text>
				<text class="flex-1">
					及格分：{{item.pass_score}}
				</text>
			</view>

		</view>
		<view class="flex align-center " style="height: 130rpx;">
			<view class="flex  justify-end" style="height: 40px;">
				<!-- bg-main main-btn px-2 -->
				<button class=" main-btn px-2 " :class="item.is_test?'bg-main-disabled':'bg-main'" @click="handelExam" >{{item.is_test?'你考过了':'参加考试'}}</button>

			</view>
		</view>
		<view class="divider">

		</view>


	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {
					return {
						expire: 60,
						id: 148,
						is_test: true,
						pass_score: 60,
						question_count: 10,
						title: "htrdhrte",
						total_score: 100,
					}

				}
			}
		},
		data() {
			return {};
		},
	
		
		methods: {
		handelExam(){
			console.log(this.item)
			if(this.item.is_test) return 
			uni.showModal({
				content: '是否要开始考试？',
				success:(res)=>{
					if (res.confirm) {
						console.log('用户点击确定');
						this.navTo(`/pages/test-detail/test-detail?id=${this.item.id}`)
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		}
		}

	}
</script>

<style lang="scss">
	.card {
		display: flex;
		flex: 1;
		box-shadow: 0 0 0 transparent;
		// margin: 12px 15px;
		padding: 15px;
		box-sizing: border-box;
		background-color: #fff;
		position: relative;
		flex-direction: column;
		border-radius: 5px;
		overflow: hidden;
		cursor: pointer;
		height: 200rpx;
		border-bottom: 1px solid #dbdbdb;

		.title {
			height: 59rpx;
			margin-bottom: 30rpx;
		}
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		border-radius: 5px;
		height: 80rpx;
		position: absolute;

		right: 40rpx;
	}
</style>
