import Http from '@/utils/request.js'

//获取 帖子 
const getBbs =(data)=>{
	return Http.request({
		url:"/bbs",
		data
	})
}
// post/list?page=1&keyword=1&bbs_id=0
const getPostList =(data)=>{
	return Http.request({
		url:"/post/list",
		data
	})
}


export default {
	getBbs,
	getPostList
}