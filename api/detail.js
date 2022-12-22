import Http from "@/utils/request.js"

// 查看课程详情
const getCourseDetail = (data = {}) => {
	return Http.request({url : '/mobile/course/read', method : 'GET', data})
}

// 查看专栏详情
const getColumnDetail = (data = {}) => {
	return Http.request({url : '/mobile/column/read', method : 'GET', data})
}

export default {
	getCourseDetail,
	getColumnDetail
}