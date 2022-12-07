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

// 跳转详情页
// id: 6
// column_id:0
// group_id: 0
// flashsale_id: 0

const toCourse=(data)=>{
	console.log(data)
	return Http.request({
		url:"/course/read",
		data
		
	})
}

// 领取优惠券 
// /user_coupon/receive coupon_id
const getReceive=(data)=>{
	console.log(data)
	return Http.request({
		url:"/user_coupon/receive",
		method:"POST",
		data
	})
}

// 优惠券 
const userCoupon =(data)=>{
	// console.log(data)
	return Http.request({
		url:"/user_coupon",
		data
	})
}
// /user_coupon?page=1&limit=10

export default {
	getIndex,
	getCoupon,
	getGroupList,
	toCourse,
	getReceive,
	userCoupon
}