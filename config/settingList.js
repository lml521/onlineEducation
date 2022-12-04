const rightIcon = ' iconfont icon-jinru' // 右侧图标
export default () => {
	return [
		[{
				title: '账号安全', 
				rightIcon,
				page: '/pages/user-safe/user-safe',
				login: true,
			},{
				title: '清除缓存',
				text:"2.00KB",
				event:"clearCache"
			},{
				title:"检查更新",
				rightIcon,
				// page: '/pages/user-safe/user-safe',
				// login: true,
			},{
				title: '当前版本',
				text:"1.0.0"
			}
		],
	]
}
