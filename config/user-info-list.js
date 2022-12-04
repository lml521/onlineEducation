// 导入 store 对象获取当前用户信息
import store from '@/store'
export default () => {
	const userInfo = store.getters.hasUserInfo
	return [ 
		[{
				title: '头像',
				event: 'chooseImg', // 点击触发的事件名
				src: userInfo.avatar || '/static/userImg.png', // 右侧图片
				
			},
			{
				title: '昵称',
				value:userInfo.nickname,
				input:true,
				prop:'nickname',
				
			},
			{
				title: '性别',
				event: 'chooseSex',
				text:userInfo.sex ,
			
			},
			{
				title: '手机',
				text:userInfo.phone,
				page:"/pages/bind-phone/bind-phone",
				 
			}
		],

	]
}
