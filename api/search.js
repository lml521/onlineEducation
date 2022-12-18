import Http from '@/utils/request.js'

const getSearchList =(data)=>{
	return Http.request({
		url:"/mobile/search",
		data
	})
}
export default {
	getSearchList,
}