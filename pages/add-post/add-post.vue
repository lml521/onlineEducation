<template>
	<view>
		<!-- 新增帖子 -->
		<view class="p-2">
			<view class="uni-list-cell-db">
				<picker @change="bindPickerChange" :value="index" :range="list" range-key="title">
					<button size="mini" type="default" style="width: 100%;">{{title}}</button>
				</picker>
			</view>
		</view>
		<view class="p-2 " style="box-sizing: border-box; width: 100%;">
			<textarea class="p-2 text" placeholder="请填写帖子内容" enterkeyhint="return" maxlength="140"
				v-model="data.content[0].text"></textarea>
			<!-- uni-file-picker__header -->

			<uni-file-picker v-model="imageValue" file-mediatype="image" mode="grid" file-extname="png,jpg" 
			:limit="9"
				title="点击可预览选好的图片" @getImgs="getImgs" @progress="progress" @success="success" @fail="fail"
				@select="select" />
		</view>
	</view>
	</view>
</template>

<script>
	import bbsApi from "@/api/bbs.js"
	import upLoadApi from "@/api/upload.js"
	export default {
		data() {
			return {
				imageValue: [],
				num: [],
				title: "选择社区",
				data: {
					page: 1,
					limit: 100
				},
				list: [],
				index: -1,
				data: {
					bbs_id: "",
					content: [{
						text: "",
						images: []
					}]
				}
			};
		},
		created() {
			this.getbbsList()
		},

		// 按钮 跳转新增帖子页面
		async onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				if (this.index < 0) {
					this.$util.msg("请先选择社区")
					return
				}
				uni.showLoading({
					mask: true
				})
				let res = await bbsApi.addSave(this.data)
				if (res.code == 20000) {
					uni.hideLoading()
					this.$util.msg('发布成功')
					setTimeout(() => {
						this.navBack()
					}, 300)
				} else {
					uni.hideLoading()
					this.$util.msg(res.data)
				}
			}
		},


		methods: {
			getImgs(list) {
				console.log(list, 'list')
				let data = []
				list.forEach((value, index) => {
					console.log(value, index)
					data[index] = value.url
				})
				this.data.content[0].images=data
				this.num=data
			},

			// 获取选择社区 数据 
			async getbbsList() {
				let res = await bbsApi.getBbs(this.data)
				if (res.code == 20000) {
					this.list = res.data.rows
				}
			},

			// 选择器  选中一项 . 获取到下标 再根据 全部数据 获取到title
			bindPickerChange(e) {
				this.index = e.detail.value
				this.title = this.list[this.index].title
				this.data.bbs_id = this.list[this.index].id
			},
			// 获取上传状态
			async select(e) {
				console.log(e)
				let file = e.tempFilePaths[0];
				let res = await upLoadApi.uploadImg(file)
				if (res.code == 20000) {
					console.log(res.data)
				}
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
				console.log(this.imageValue)
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			}
		}
	}
</script>

<style lang="scss">
	.text {
		width: 100% !important;
		box-sizing: border-box;
		background-color: #f8f9fa;
		overflow-y: auto;
	}
</style>
