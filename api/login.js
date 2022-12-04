import Http from '@/utils/request.js'


// 注册
const reg = (data) => {
	return Http.request({
		url: "/reg",
		method: "POST",
		data
	})
}
// 登录 
const login = (data) => {
	return Http.request({
		url: "/login",
		method: "POST",
		data
	})
}

//  提交修改 
const updateinfo = (data) => {
	return Http.request({
		url: "/update_info",
		method: "POST",
		data,
	})
}

// 获取验证码
const sendCode = (data) => {
	return Http.request({
		url: "/get_captcha",
		method: "POST",
		data
	})
}

// 更改 手机号码
const bindMobile = (data) => {
	return Http.request({
		url: "/bind_mobile",
		method: "POST",
		data
	})
}

// 找回密码 
const getForget=(data)=>{
	return Http.request({
		url:'/forget',
		method:"POST",
		data
	})
}

// 修改 密码 
const upPassword=(data)=>{
	return Http.request({
		url:'/update_password',
		method:"POST",
		data
	})
}
// 退出
// const upPassword=(data)=>{
// 	return Http.request({
// 		url:'/update_password',
// 		method:"POST",
// 		data
// 	})
// }

export default {
	reg,
	login,
	updateinfo,
	sendCode,
	bindMobile,
	getForget,
	upPassword
}
