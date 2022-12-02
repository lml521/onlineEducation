export default { 

	methods:{
		// 跳转 
		navTo(url,options={}){
			if(!url) return 
			
			uni.navigateTo({
				url
			})
		},
		
		// 返回上一级
		navBack(delta=1){
			uni.navigateBack({delta})
		},
		
		// 判断是否能获取到 token 如果获取不到token  需要token页面跳转到登录页面
		toPage(){
			let res =this.$store.getters.hasLogin
			console.log(!res)
			if(!res){
				this.navTo("/pages/auth/login")
			}
		},
	}
}