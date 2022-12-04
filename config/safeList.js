// 修改密码页面 展示数据 
const rightIcon = ' iconfont icon-jinru' // 右侧图标
export default () => {
	return [
		[{
				
				title: '原密码', // 左侧标题
				prop:'opassword',
				
				placeholder:"请输出原密码",
				input:true,
			
			},{
				
				title: '新密码', // 左侧标题
				prop: 'password',
				placeholder:"请输入新密码",
				input:true,
			
			},{
				
				title: '确认密码', // 左侧标题
				prop: 'repassword',
				placeholder:"请输入确认密码",
				input:true,
			
			},
		],
	]
}
