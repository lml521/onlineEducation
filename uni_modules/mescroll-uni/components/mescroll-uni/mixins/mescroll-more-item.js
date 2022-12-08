const MescrollMoreItemMixin = {
	// #ifndef MP-ALIPAY || MP-DINGTALK
	props: {
		i: Number, // 每个tab页的专属下标
		index: { // 当前tab的下标
			type: Number,
			default () {
				return 0
			}
		}
	},
	// #endif
	data() {
		return {
			downOption: {
				auto: false // 不自动加载
			},
			upOption: {
				auto: false // 不自动加载
			},
			isInit: false // 当前tab是否已初始化
		}
	},
	watch: {
		// 监听下标的变化
		index(val) {
			if (this.i === val && !this.isInit) this.mescrollTrigger()
		}
	},
	methods: {
		mescrollInitByRef() {
			if (!this.mescroll || !this.mescroll.resetUpScroll) {

				let mescrollRef = this.$refs.mescrollRef || this.$refs['mescrollRef' + this.i];
				if (mescrollRef) this.mescroll = mescrollRef.mescroll
			}
		},
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
			this.mescrollInitByRef && this.mescrollInitByRef(); 
			if (this.i === this.index) {
				this.mescrollTrigger()
			}
		},
		// 主动触发加载
		mescrollTrigger() {
			this.isInit = true; // 标记为true
			if (this.mescroll) {
				if (this.mescroll.optDown.use) {
					this.mescroll.triggerDownScroll();
				} else {
					this.mescroll.triggerUpScroll();
				}
			}
		}
	}
}

export default MescrollMoreItemMixin;
