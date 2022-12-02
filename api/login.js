import Http from '@/utils/request.js'

class  Login{
	// 注册
  static reg(data){
    return Http.request({url:"/reg",method:"POST",data})
  }
  // 登录 
  static login(data){
    return Http.request({url:"/login",method:"POST",data})
  }
  
  // /mobile/upload
  // 更新 头像 
  static upload (file){
	  return Http.request({
		  url:"/upload",
		  method:"POST",
		  data:file,
	  })
  }
  
 
  //  提交修改 
  static updateinfo(data){
	  return Http.request({
	  		  url:"/update_info",
	  		  method:"POST",
	  		  data,
	  })
  }
  
  // 获取验证码
  static sendCode(data){
	  return Http.request({
		  url:"/get_captcha",
		  method:"POST",
		  data
	  })
  }
  
  // 更改 手机号码
  static bindMobile(data){
	  return Http.request({
	  		  url:"/bind_mobile",
	  		  method:"POST",
	  		  data
	  })
  }
  
}

export default Login 
