import Http from '@/utils/request.js'

//获取 帖子 
const getBbs =(data)=>{
	return Http.request({
		url:"/mobile/bbs",
		data
	})
}
//获取 帖子数据 
const getPostList =(data)=>{
	return Http.request({
		url:"/mobile/post/list",
		data
	})
}

// 喜欢 帖子 点赞 
const support =(data)=>{
	return Http.request({
		url:"/mobile/post/support",
		method:"POST",
		data
	})
}
// 取消帖子 
const unsupport =(data)=>{
	return Http.request({
		url:"/mobile/post/unsupport",
		method:"POST",
		data
	})
}
// 获取 详情 数据 
const getItme =(data)=>{
	return Http.request({
		url:"/mobile/post/read",
		data
	})
}

// 帖子评论数据 
// /post_comment?post_id=204&page=1

const getPostComment =(data)=>{
	return Http.request({
		url:"/mobile/post_comment",
		data
	})
}

// 新增帖子 
const addSave=(data)=>{
	return Http.request({
		url:"/mobile/post/save",
		method:"POST",
		data
	})
}

// 提交评论 
const getReply=(data)=>{
	return Http.request({
		url:"/mobile/post/reply",
		method:"POST",
		data
	})
}

// 获取 我的帖子 
const getMypost=(data)=>{
	return Http.request({
		url:"/mobile/mypost",
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
	addSave,
	getReply,
	getMypost
}