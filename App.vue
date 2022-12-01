<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 引入全局css样式 */
	@import url("static/common/common.css");
	
	/* 引入动画库 */
	@import url("static/common/animate.min.css");
	/* 引入自定义图标库 */
	@import url("~@/static/common/iconfont.css");
	
</style>
