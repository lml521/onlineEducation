import Http from '@/utils/request.js'

// 取消收藏
const callSava =(data)=>{
	return Http.request({
		url:"/uncollect",
		method:"POST",
		data
	})
}

// 添加收藏 
const addSava =(data)=>{
	return Http.request({
		url:"/collect",
		method:"POST",
		data
	})
}


export default {
	callSava,
	addSava
}