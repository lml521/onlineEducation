// 封装修改头像 
// 获取默认地址
import config from '@/config/index.js'
// 获取本地store
import store from '@/store/index.js'


const upload = (options) => {
	return new Promise((resolve, reject) => {
		// 获取token
		const token = store.state.isToken
		// 如果没有token则重新登录 并跳回登录页面
		if (!token) {
			uni.showLoading({
				title: '请先登录',
				icon: "none"
			})
			setTimeout(() => {
				this.navTo("/pages/login/login")
			}, 300)
		}

		uni.uploadFile({
			url: config.baseUrl + options.url,
			filePath: options.file || "",
			method: 'POST',
			name: options.name || "file",
			header: options.header || {},
			formData: options.data || {},
			timeout: 8000,
			header: {
				'token':store.state.isToken,
				'appid':config.appId
			},
			success: res => {
				if (res.statusCode === 200) {
					resolve(JSON.parse(res.data))
				}
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

export default upload
