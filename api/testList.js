// 考试 
import Http from "@/utils/request.js"
const testpaper=(data)=>{
	return Http.request({
		url:"/testpaper/list",
		data
	})
}

export default{
	testpaper
}