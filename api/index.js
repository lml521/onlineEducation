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

export default {
	getIndex,
	getCoupon
}