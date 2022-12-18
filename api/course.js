import Http from '@/utils/request.js'

// 取消收藏
const callSava =(data)=>{
	return Http.request({
		url:"/mobile/uncollect",
		method:"POST",
		data
	})
}

// 添加收藏 
const addSava =(data)=>{
	return Http.request({
		url:"/mobile/collect",
		method:"POST",
		data
	})
}

// 拼单 数据 /group_work/list
const groupWork=(data)=>{
	return Http.request({
		url:`/mobile/group_work/list?group_id=${data.group_id}&page=${data.page}`,
	})
}

export default {
	callSava,
	addSava,
	groupWork
}