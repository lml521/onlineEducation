export default { 

	methods:{
		// 跳转 
		navTo(url,options={}){
			if(!url) return 
			// if(options.login&& !this.$store.getters.hasLogin){
			// 	uni.navigateTo({
			// 		url:"/pages/auth/login"
			// 	})
			// }
			
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
	
		
		handelSetSearch(item){
			if(item){
				// 点击胶囊按钮 跳转页面 未能获取 dom节点
				this.$nextTick(()=>{
					// #ifdef APP-PLUS
				const currentWebview = this.$mp.page.$getAppWebview();
				currentWebview.setTitleNViewSearchInputText(item);
				// #endif
				
				// #ifdef H5
				const placeholder = document.querySelector('.uni-page-head-search-placeholder')
				placeholder.innerHTML = ''
				const inputSearch = document.querySelector('.uni-input-input[type=search]');
				inputSearch.value = item;
				// #endif
				})
			}
			
		},
		
	}
}