import Http from "@/utils/request.js"

const getHistoryList =(data)=>{
	return  Http.request({
		url:"/mobile/user_history/list",
		data
	})
}

export default{
	getHistoryList
}