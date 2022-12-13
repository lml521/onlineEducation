export default () => {
	return [{
			icon: 'iconfont icon-shangyibu ', //  左侧图标
			event: 'back', //点击触发事件名
			direction:"left"
		},
		{
			icon: 'iconfont icon-leimupinleifenleileibie', //  左侧图标
			title: '',
		},
		{
			icon: 'iconfont icon-tijiao',
			title: '交卷',
			event:"submit"

		},
		{
			icon: "iconfont icon-xiayibu",
			event: 'next', //点击触发事件名
			direction:"right"
		},

	]
}
