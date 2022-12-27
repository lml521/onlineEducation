import Http from '@/utils/request.js'


// 获取我的订单数据
const getMyOrderList = (data) => {
	return Http.request({
		url: "/mobile/order/list",
		data
	})
}


export default {
	getMyOrderList
}
