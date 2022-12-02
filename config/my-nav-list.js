export default () => {
	return [
		{
			title:"订单",
			icon:"iconfont icon-OrderHistory text-warning",
			login: true, 
			page:"/pages/order-list/order-list"
		},{
			title:"消息",
			icon:"iconfont icon-pinglun2 text-warning",
			login: true, 
			page:"/pages/msg-list/msg-list"
		},{
			title:"收藏",
			icon:"iconfont icon-shoucang1 text-warning",
			login: true, 
			page:"/pages/fava-list/fava-list"
		},{
			title:"在学",
			icon:"iconfont icon-e-learning-monitor text-warning",
			page:"/pages/tabbar/learn/learn"
		}
	]
}