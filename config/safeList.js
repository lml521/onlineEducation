// 修改密码页面 展示数据 
const rightIcon = ' iconfont icon-jinru' // 右侧图标
export default () => {
	return [
		[{
				
				title: '原密码', // 左侧标题
				event: 'original',
				
				placeholder:"请输出原密码",
				input:true,
				login: true, // true登录后才可访问
			},{
				
				title: '新密码', // 左侧标题
				event: 'newPassword',
				placeholder:"请输入新密码",
				input:true,
				login: true, // true登录后才可访问
			},{
				
				title: '确认密码', // 左侧标题
				event: 'repassword',
				placeholder:"请输入确认密码",
				input:true,
				login: true, // true登录后才可访问
			},
		],
	]
}
