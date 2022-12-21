import Http from "@/utils/request.js"
// 获取专栏数据 
const getColumnList =(data)=>{
	return Http.request({
		url:"/mobile/column/read",
		data
	})
}

export default{
	getColumnList
}