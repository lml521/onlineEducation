import Http from '@/utils/request.js'

const getIndex =()=>{
	return Http.request({
		url:"/index"
	})
}

export default {
	getIndex
}