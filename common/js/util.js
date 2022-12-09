
let _throttleRunning = false // 判断是否开启节流 开关

/** 
 * callback 是一个 函数方法  就是要执行 的函数
 * delay  延时的时间 默认 为500
 */

// 节流 
// export const throttle = (callback, delay = 500) => {
	/**
	 * 判断节流开关是否正在使用 如果为true 则是正在运行  不能再次执行
	 * 为false  就是没有在执行  这个时候就可以执行    需要 把_throttleRunning 设置成true  这个时候再次点击 就不能执行
	 * 
	 *接着执行定时器  callback() 是 要执行的函数  执行玩之后 需要把 _throttleRunning 设置成 false 就是说 运行结束了   可以进行下次使用
	 */
// 	if (_throttleRunning) return
// 	_throttleRunning = true
// 	setTimeout(() => {
// 		callback()
// 		_throttleRunning = false
// 	}, delay)

// }




// 封装toast提示
export const msg = (title = '', param={}) => {
	if(!title) return;
	uni.showToast({
		title,
		duration: param.duration || 1500,
		mask: param.mask || false,
		icon: param.icon || 'none'
	});
}



// 检测格式方法
export const checkStr = (str, type) => {
	switch (type) {
		case 'mobile': //手机号码
			return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
		case 'tel': //座机
			return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
		case 'card': //身份证
			return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
		case 'mobileCode': //6位数字验证码
			return /^[0-9]{6}$/.test(str)
		case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
			return /^([a-zA-Z0-9_]){6,18}$/.test(str)
		case 'payPwd': //支付密码 6位纯数字
			return /^[0-9]{6}$/.test(str)
		case 'postal': //邮政编码
			return /[1-9]\d{5}(?!\d)/.test(str);
		case 'QQ': //QQ号
			return /^[1-9][0-9]{4,9}$/.test(str);
		case 'weixin': //微信号
			return /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/.test(str);
		case 'email': //邮箱
			return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
		case 'money': //金额(小数点2位)
			return /^\d*(?:\.\d{0,2})?$/.test(str);
		case 'URL': //网址
			return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
		case 'IP': //IP
			return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
		case 'date': //日期时间
			return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/
				.test(str)
		case 'number': //数字
			return /^[0-9]$/.test(str);
		case 'english': //英文
			return /^[a-zA-Z]+$/.test(str);
		case 'chinese': //中文
			return /^[\\u4E00-\\u9FA5]+$/.test(str);
		case 'lower': //小写
			return /^[a-z]+$/.test(str);
		case 'upper': //大写
			return /^[A-Z]+$/.test(str);
		case 'HTML': //HTML标记
			return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
		default:
			return true;
	}
}


export const  getTime=(time)=>{
	
	　　var nowTime = +new Date();  //返回的是当前时间的毫秒数
	
	　　var inputTime = +new Date(time); //返回的是输入的毫秒数
	
	　　var times = (inputTime - nowTime)/1000;  //times是剩余时间转换成秒
	
	　　var days = parseInt(times/60/60/24) //声明变量存储天数
	
	　　days = days<10?'0'+days:days;
	
	　　var hours = parseInt(times/60/60%24) //声明变量存储小时
	
	　　hours = hours<10?'0'+hours:hours;
	
	　　var mins = parseInt(times/60%60) //声明变量存储分钟
	
	　　mins = mins<10?'0'+mins:mins;
	
	　　var Scons = parseInt(times%60) //生命便令存储当前的秒
	
	　　Scons = Scons<10?'0'+Scons:Scons;
	
	// 　　return '距离还有'+days+'天'+hours+"时"+mins+"分"+Scons+"秒";
	return {
		days,
		hours,
		mins,
		Scons,
	}}