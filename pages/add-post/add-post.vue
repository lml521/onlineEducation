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
			<textarea class="p-2 text" placeholder="请填写帖子内容" enterkeyhint="return" maxlength="140"></textarea>
			<view class="">
				<view class="flex justify-between my-2">
				<view>点击可预览选好的图片</view>
				<view style="color: #b2b2b2;">0/9</view>
			</view>
			<uni-file-picker v-model="imageValue" file-mediatype="image" mode="grid" file-extname="png,jpg" :limit="9"
				@progress="progress" @success="success" @fail="fail" @select="select" />
			</view>
		
		</view>



	</view>
</template>

<script>
	import bbsApi from "@/api/bbs.js"
	export default {
		data() {
			return {
				imageValue: [],
				title: "选择社区",
				data: {
					page: 1,
					limit: 100
				},

				list: [],
				index: -1,
			};
		},
		created() {
			this.getbbsList()
		},
		methods: {
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
			},


			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
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
