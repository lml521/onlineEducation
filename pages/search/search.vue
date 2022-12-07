<template>
	<view>

		<h4 v-if="hasHistory.length" class="flex align-center py-3 px-2 justify-between">
			<text class="font-md font-weight-bold">历史记录</text>
			<text class="font-sm text-light-muted" @click="removeHistory">清除全部</text>
		</h4>
		<view class="" v-for="(item,index) in hasHistory" :key="index" class="d-inline-block "
			style="padding-left: 20rpx;">
			<text class="bg-hover-light px-2 py-1 font-sm rounded-circle item">{{item}}</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: "",
				hasHistory: []
			};
		},

		// 点击 搜索
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				if (this.content.trim() == '') {
					this.$util.msg('请输入关键词')
					return
				}
				this.$store.commit('addHistory', this.content)
				this.navTo(`/pages/search-result/search-result?keyword=${this.content}`)
			}
		},
		// 实时会获取搜索框你们的内容
		onNavigationBarSearchInputChanged(e) {
			console.log(2)
			this.content = e.text
			console.log(this.content)
		},
		onShow() {
			this.hasHistory = this.$store.getters.hasHistory
			this.getHasHistory()
			console.log(123)
		},
		onLoad() {
			this.getHasHistory()
			console.log(123)
		},
		methods: {
			// 获取本地数据 
			getHasHistory() {
				this.hasHistory = this.$store.getters.hasHistory
			},
			// 清空历史记录 
			removeHistory() {
				uni.showModal({

					content: '是否要清除搜索记录？',
					success:(res)=>{
						if (res.confirm) {
							console.log('用户点击确定');
							this.$store.commit('removeHistory')
							this.getHasHistory()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.item {
		margin-bottom: 12px;
		line-height: 1;
		max-width: 150px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
