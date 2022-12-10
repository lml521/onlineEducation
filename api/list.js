import Http from '@/utils/request.js'

const getList =(data)=>{
	return Http.request({
		url:"/column/list",
		data
	})
}

export default {
getList
}