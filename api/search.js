import Http from '@/utils/request.js'

const getSearchList =(data)=>{
	return Http.request({
		url:"/search",
		data
	})
}
export default {
	getSearchList,
}