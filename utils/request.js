import config from '@/config/index.js'
import store from '@/store/index.js'
class Request {
	static async _beforeRequest(configer) {
		const token = store.state.isToken
		if (token)
		 configer.header.token = token
		configer.header.appid = config.appId
		return configer
	}
	static async request({url,method = 'GET',data = {},header = {},...options}) {
		const configs = await Request._beforeRequest({
			url,
			method,
			data,
			header,
			...options
		})
		configs.url = config.baseUrl + configs.url
		const response = await uni.request(configs)
		return await Request._beforeResponse(response)
	}
	static async _beforeResponse(response) {
		const [error, res] = response
		return res.data
	}
}
export default Request
