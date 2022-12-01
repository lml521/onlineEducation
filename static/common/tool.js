import $api from '@/api/api.js';
export default {
	async wxpay(no,success = false,fail = false){
		// #ifdef APP-PLUS
		let orderInfo = await $api.wxpay({ no, type:"app"})
		console.log(orderInfo);
		uni.requestPayment({
		    "provider": "wxpay", 
		    "orderInfo": orderInfo,
		    success:(res2)=> {
				uni.showToast({
					title: '支付成功',
					icon: 'none'
				});
				if(success && typeof success == 'function'){
					success()
				}
			},
		    fail:(err)=> {
				console.log(err);
				if(fail && typeof fail == 'function'){
					fail(err)
				}
				uni.showModal({
					content: '支付失败',
					showCancel:false
				});
			}
		})
		// #endif
		
		// #ifdef MP
		let [err,e] =  await uni.login({
			provider:"weixin"
		})
		if(err){
			return uni.showModal({
				content: '支付失败，原因是：'+err.errMsg,
				showCancel: false,
			});
		}
		
		let code = e.code
		let orderInfo = await $api.wxpay({ no, type:"mp", code })

		uni.requestPayment({
		    provider: 'wxpay',
		    timeStamp: orderInfo.timeStamp,
		    nonceStr: orderInfo.nonceStr,
		    package: orderInfo.package,
		    signType: orderInfo.signType,
		    paySign: orderInfo.paySign,
		    success: (res)=> {
		        uni.showToast({
		        	title: '支付成功',
		        	icon: 'none'
		        });
		        if(success && typeof success == 'function'){
		        	success()
		        }
		    },
		    fail: (err)=> {
		       uni.showModal({
		       	content: '支付失败，原因是：'+err.errMsg,
		       	showCancel: false,
		       });
		    }
		});
		
		
		// #endif
	},
	
	bytesToSize(bytes) {
		if (bytes === 0) return '0 KB';
		var k = 1000, // or 1024
		sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		i = Math.floor(Math.log(bytes) / Math.log(k));
	    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
	},
	
	// 秒转时分秒
	formatSeconds(endTime) {
		let secondTime = parseInt(endTime)
		let min = 0 
		let h = 0 
		let result = ''
		if (secondTime > 60) { 
			min = parseInt(secondTime / 60)
			secondTime = parseInt(secondTime % 60) 
			if (min > 60) { 
				h = parseInt(min / 60) 
				min = parseInt(min % 60)
			}
		}
		result =
			`${h.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secondTime.toString().padStart(2,'0')}`
		return result
	},
	
	// 人性化时间格式
	getHumanTime(shorttime){
		shorttime=shorttime.toString().length<13 ? shorttime*1000 : shorttime;
		let now = (new Date()).getTime();
		let cha = (now-parseInt(shorttime))/1000;
		
		if (cha < 43200) {
			// 当天
			return this.dateFormat(new Date(shorttime),"{A} {t}:{ii}");
		} else if(cha < 518400){
			// 隔天 显示日期+时间
			return this.dateFormat(new Date(shorttime),"{Mon}月{DD}日 {A} {t}:{ii}");
		} else {
			// 隔年 显示完整日期+时间
			return this.dateFormat(new Date(shorttime),"{Y}-{MM}-{DD} {A} {t}:{ii}");
		}
	},
	
	parseNumber(num) {
		return num < 10 ? "0" + num : num;
	},
	 
	dateFormat(date, formatStr) {
		let dateObj = {},
			rStr = /\{([^}]+)\}/,
			mons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
		 
		dateObj["Y"] = date.getFullYear();
		dateObj["M"] = date.getMonth() + 1;
		dateObj["MM"] = this.parseNumber(dateObj["M"]);
		dateObj["Mon"] = mons[dateObj['M'] - 1];
		dateObj["D"] = date.getDate();
		dateObj["DD"] = this.parseNumber(dateObj["D"]);
		dateObj["h"] = date.getHours();
		dateObj["hh"] = this.parseNumber(dateObj["h"]);
		dateObj["t"] = dateObj["h"] > 12 ? dateObj["h"] - 12 : dateObj["h"];
		dateObj["tt"] = this.parseNumber(dateObj["t"]);
		dateObj["A"] = dateObj["h"] > 12 ? '下午' : '上午';
		dateObj["i"] = date.getMinutes();
		dateObj["ii"] = this.parseNumber(dateObj["i"]);
		dateObj["s"] = date.getSeconds();
		dateObj["ss"] = this.parseNumber(dateObj["s"]);
	 
		while(rStr.test(formatStr)) {
			formatStr = formatStr.replace(rStr, dateObj[RegExp.$1]);
		}
		return formatStr;
	},
	dateCount(endTime){
		// 现在时间
		let now= new Date()
		//截止时间
		let until= new Date(endTime)
		// 计算时会发生隐式转换，调用valueOf()方法，转化成时间戳的形式
		let days = (until- now)/1000/3600/24
		// 下面都是简单的数学计算 
		let day = Math.floor(days)
		let hours = (days - day)*24
		let hour = Math.floor(hours)
		let minutes = (hours - hour)*60
		let minute = Math.floor(minutes)
		let seconds = (minutes - minute)*60
		let second = Math.floor(seconds)
		let back = '剩余时间：'+day+'天'+hour+'小时'+minute+'分钟'+second+'秒'
		return {
			day,hour,minute,second
		}
	 },
	 
	 // 是否在微信浏览器中
	 isInWechat(){
	     return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger"
	 },
	 getUrlCode(name) {
	     return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1]
	         .replace(/\+/g, '%20')) || null
	 },
	 getH5Code() {
	     // 微信公众号的appid
	     let appid = 'wxf0d98abcc66aab61'
	     let href = window.location.href
	     if(href.indexOf('?code') != -1){
	         let h = href.split('#/')
	         h[0] = window.location.protocol+"//"+window.location.host
	         href = h[0] + '/#/'+ h[1]
	     }
	     let local = encodeURIComponent(href);
	     const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${local}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`;
	     location.href= url
	 }
}