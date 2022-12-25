<template>
	<view>
		<!-- 音频 -->
		<view class="px-5 pt-5">
			<img :src="item.cover" alt="" style="width: 100%; height: 100%; border-radius: 20rpx;">
		</view>
		<slider @changing="handleChanging" @change="handleChange" activeColor="#5ccc84" block-color="#5ccc84"
			block-size="15" />
		<view class="flex px-3 justify-between " style="margin-top: -10rpx; font-size: 24rpx;">
			<text>{{currentTime|formatTime}}</text>
			<text>{{duration|formatTime}}</text>
		</view>
		<view class="audioBtn  flex justify-center align-center pb-5">
			<!-- 开启或者 关闭循环播放 -->
			<text class="iconfont icon-ziyuan11" :style="loopStatus ? 'color : rgb(92, 204, 132);' : ''"
				@click="handleLoop"></text>
			<!-- 点击开启或者关闭 -->
			<text class="iconfont mx-3 " :class="isPlaying ? 'icon-tianchongxing-' : 'icon-bofang2'"
				@click="handlePlay"></text>
			<!-- 收藏 -->
			<text class="iconfont icon-shoucang1"></text>
		</view>
	</view>
</template>

<script>
	import tool from "@/common/js/tool.js"
	export default {
		name: "i-audio",
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				// 播放的状态
				isPlaying: false,
				// 音频播放的实例对象
				_audioContext: null,
				// 播放结束的状态
				isPlayEnd: false,
				// 当前音频的总时长
				duration: 1,
				// 当前播放的时间
				currentTime: 0,
				// 当前是否正在进度拖动中
				_isChanging: false,
				// 是否开启循环播放
				loopStatus: false
			};
		},
		created() {
			// 初始化音频播放的实例对象
			this.createAudio()
		},

		computed: {
			position() {
				return this.isPlayEnd ? 0 : this.currentTime
			}
		},
		filters: {
			formatTime(s) {
				if (s === 0) {
					return '00:00:00'
				}

				return tool.formatSeconds(s)
			}
		},
		beforeDestroy() {
			if (this._audioContext !== null && this.isPlaying) {
				this.stop()
			}
		},
		methods: {
			createAudio() {
				console.log(this.item)
				// 创建音频播放的实例对象
				this._audioContext = uni.createInnerAudioContext()
				// 设置音频不进行自动播放
				this._audioContext.autoplay = false
				// 设置音频播放的音频地址
				// this._audioContext.src = this.item.content
				this._audioContext.src =
					"http://m701.music.126.net/20221220160923/268a111c83672ffe930d87a92eb74e50/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096410267/0adb/e6bc/bb93/8937b88be6e4b2c38966e838a64173ad.mp3"

				// 使用事件监听音频是否开始播放
				this._audioContext.onPlay(() => {
					console.log("开始播放")
				})
				// 使用事件监听音频音频进入可以播放状态
				this._audioContext.onCanplay(() => {
					console.log("音频进入可以播放状态")
					this.duration = this._audioContext.duration

				})
				// 使用事件监听音频正在播放的进度
				this._audioContext.onTimeUpdate(() => {
					// 获取当前播放的音频的总时间
					this.duration = this._audioContext.duration
					// 获取当前正在播放的进度时间
					this.currentTime = this._audioContext.currentTime


					if (this.duration > 0) {
						let progress = ((this.currentTime / this.duration) * 100).toFixed(2)
						this.$emit("onProgress", progress)
					}

				})
				// 使用事件监听音频是否播放结束
				this._audioContext.onEnded(() => {
					console.log("播放结束")
					this.currentTime = 0
					this.isPlaying = false
					this.isPlayEnd = false
				})
			},
			// 点击播放或者取消播放 
			// 播放
			handlePlay() {

				// 如果是正在播放,则进行暂停
				if (this.isPlaying) {
					return this.handlePause()
				}

				this.isPlaying = true
				this._audioContext.play()
				this.isPlayEnd = false
			},
			// 暂停
			handlePause() {
				this._audioContext.pause()
				this.isPlaying = false
			},
			// slider 完成一次拖动后触发的事件
			handleChange(e) {
				this._audioContext.seek(e.detail.value)
				this._isChanging = false
			},
			// slider 拖动过程中触发的事件
			handleChanging(e) {
				this._isChanging = true
				this._audioContext.seek(e.detail.value)
				this.currentTime = e.detail.value
			},
			// 停止
			stop() {
				this._audioContext.stop()
				this.isPlaying = false
			},
			// 开启或者关闭循环播放
			handleLoop() {
				this.loopStatus = !this.loopStatus
				this._audioContext.loop = this.loopStatus
				this.$util.msg(this.loopStatus ? '开启循环' : '关闭循环')
			}

		}
	}
</script>

<style lang="scss">
	.audioBtn text:nth-child(1),
	.audioBtn text:nth-child(3) {
		font-size: 60rpx;
		color: #bbb;
	}

	.audioBtn text:nth-child(2) {
		font-size: 100rpx;
		color: #5ccc84;
	}
</style>
