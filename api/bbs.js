import Http from '@/utils/request.js'

//获取 帖子 
const getBbs =(data)=>{
	return Http.request({
		url:"/bbs",
		data
	})
}


export default {
	getBbs
}