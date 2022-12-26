<template>

	<view class="content">
		<view class="title">

			{{item.isbuy && item.type === 'media'? '课程内容' : '课程简介'}}
		</view>
		<view id="media">
			<mp-html @load="handleOnMediaReady"
				:content="(item.isbuy && item.type === 'media') ? item.content : item.try">
				<view class="flex justify-center py-3 text-muted">
					加载中...
				</view>
			</mp-html>
		</view>
	</view>
</template>

<script>
	import studyApi from "@/api/study.js"
	import detailApi from "@/api/detail.js"
	let windowHeight = uni.getSystemInfoSync().windowHeight
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				column_id: 0,
				scrollTop: 0,
				mediaHeight: 0,
				progress: 0
			};
		},
		onPageScroll(e) {
			console.log(this.item.isbuy, this.item.type)
			if (this.item.isbuy && this.item.type === "media" && e.scrollTop > this.scrollTop) {
				this.scrollTop = e.scrollTop
				console.log(this.scrollTop, e.scrollTop, 'this.scrollTop = e.scrollTop')
			}
			this.handleMediaProgress()
			console.log("scrollTop=>", this.scrollTop)
		},
		beforeDestroy() {
			this.handleUpdateStudyProgress()
		},
		methods: {
			// 将学习进度提交到后台
			async handleUpdateStudyProgress() {
				try {
					const data = {
						id: this.item.id,
						type: "course",
						progress: this.progress
					}
					console.log(data)
					const response = await studyApi.setStudyUserHistory(data)
					console.log(response, 'response')

				} catch (e) {
					console.log("error=>", e)
				}
			},
			// 课程内容图片资源加载完毕之后会触发
			handleOnMediaReady() {
				const Query = uni.createSelectorQuery().in(this)
				Query.select("#media").boundingClientRect((data) => {
					this.mediaHeight = parseInt(data.height)
					this.handleMediaProgress()
				}).exec()
			},
			// 计算学习的进度
			handleMediaProgress() {
				console.log(122)
				if (this.mediaHeight > 0) {

					this.progress = (((this.scrollTop + windowHeight) / this.mediaHeight) * 100).toFixed(2)

					this.progress = this.progress > 100 ? 100 : this.progress
				}
			},
			async initLoad() {
				try {

					const data = {
						id: this.item.id,
						column_id: this.column_id || null,
						group_id: null,
						flashsale_id: null,
					}
					const response = await detailApi.getCourseDetail(data)
					if (response) {
						this.detail = response
					}


					uni.setNavigationBarTitle({
						title: this.item.title
					})
				} catch (e) {
					console.log(e)
				} finally {

				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		.title {
			padding: 20rpx;
			border-bottom: 1px solid #ccc;
		}

		.contentHtml {
			padding: 0 25rpx;
			box-sizing: border-box;

		}
	}

	img {
		width: 100% !important;
	}
</style>
