const rightIcon = ' iconfont icon-jinru' // 右侧图标
export default () => {
	return [
		[{

				title: '优惠券', // 左侧标题
				rightIcon, // 右侧图标
				text: '请选择优惠券（1张）', //右侧文字
				event: 'toDiscount', //点击触发事件名
				order: true,
				// page: '/pages/my-coupon/my-coupon', //目标页面，配置了点击此行会进行跳转
				/* 
				
				checked: fasle, //是否有switch开头，且是否选中
				src: '/static/logo.png' , //是否有图片，图片地址
				
				*/
			},
			{
				title: '支付方式',
				text: '微信支付',
				pay:true,
			}
		],
	]
}
