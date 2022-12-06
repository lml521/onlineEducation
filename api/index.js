import Http from '@/utils/request.js'

const getIndex =()=>{
	return Http.request({
		url:"/index"
	})
}
const getCoupon=()=>{
	return Http.request({
		url:"/coupon?"
	})
}

const getGroupList =(data)=>{
	return Http.request({
		url:"/group",
		data
	})
}

export default {
	getIndex,
	getCoupon,
	getGroupList
}