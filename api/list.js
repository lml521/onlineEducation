import Http from '@/utils/request.js'
// 专栏 
const getList =(data)=>{
	return Http.request({
		url:"/column/list",
		data
	})
}

// 秒杀 
const getFlashsale =(data)=>{
	return Http.request({
		url:"/flashsale",
		data
	})
}
// 拼团
const getGroup =(data)=>{
	return Http.request({
		url:"/group",
		data
	})
}
// 直播 
const getLive =(data)=>{
	return Http.request({
		url:"/live/list",
		data
	})
}
// 电子书 
const getBookList =(data)=>{
	return Http.request({
		url:"/book/list",
		data,
	})
}
export default {
	getList,
	getFlashsale,
	getGroup,
	getLive,
	getBookList
}