import Http from '@/utils/request.js'

const getGood =(data)=>{
	return Http.request({
		url:"/goods/read",
		data
	})
}


export default {
	getGood
}