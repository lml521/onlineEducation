import Http from "@/utils/request.js"
const getTestList=(data)=>{
	return Http.request({
		url:"/mobile/testpaper/read",
		data
	})
}


export default{
	getTestList
}