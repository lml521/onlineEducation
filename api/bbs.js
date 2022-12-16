import Http from '@/utils/request.js'

//获取 帖子 
const getBbs =(data)=>{
	return Http.request({
		url:"/bbs",
		data
	})
}
//获取 帖子数据 
const getPostList =(data)=>{
	return Http.request({
		url:"/post/list",
		data
	})
}

// 喜欢 帖子 点赞 
const support =(data)=>{
	return Http.request({
		url:"/post/support",
		method:"POST",
		data
	})
}
// 取消帖子 
const unsupport =(data)=>{
	return Http.request({
		url:"/post/unsupport",
		method:"POST",
		data
	})
}
// 获取 详情 数据 
const getItme =(data)=>{
	return Http.request({
		url:"/post/read",
		data
	})
}

// 帖子评论数据 
// /post_comment?post_id=204&page=1

const getPostComment =(data)=>{
	return Http.request({
		url:"/post_comment",
		data
	})
}

// 新增帖子 
const addSave=(data)=>{
	return Http.request({
		url:"/post/save",
		method:"POST",
		data
	})
}

export default {
	getBbs,
	getPostList,
	support,
	unsupport,
	getItme,
	getPostComment,
	addSave
}