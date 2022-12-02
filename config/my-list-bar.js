const rightIcon = ' iconfont icon-jinru' // 右侧图标
export default () => {
	return [
		[{
				icon: 'iconfont icon-9', //  左侧图标
				title: '我的优惠券', // 左侧标题
				rightIcon, // 右侧图标
				page: '/pages/my-coupon/my-coupon', //目标页面，配置了点击此行会进行跳转
				login: true, // true登录后才可访问
				/* 
				event: 'add', //点击触发事件名
				checked: fasle, //是否有switch开头，且是否选中
				src: '/static/logo.png' , //是否有图片，图片地址
				text: '10KB', //右侧文字
				*/
			},
			{
				icon: 'iconfont icon-help',
				title: '常见问题',
				rightIcon,
				page: '/pages/problem/problem',
				login: true,
			},
			{
				icon: 'iconfont icon-leimupinleifenleileibie',
				title: '设置',
				rightIcon,
				page: '/pages/setting/setting',
				
			}
		],
	]
}
