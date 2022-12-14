// 考试 
import Http from "@/utils/request.js"
const testpaper=(data)=>{
	return Http.request({
		url:"/testpaper/list",
		data
	})
}

//交卷
const getHandInAnExamination=(data)=>{
		return Http.request({
			url:'/user_test/save',
			method:"post",
			data,
		})
	}
export default{
	testpaper,
	getHandInAnExamination
}