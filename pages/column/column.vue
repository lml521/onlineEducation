<template>
	<!-- 专栏模块 -->
	<view>
		<!-- 专栏模块 -->
		<!-- 头部 -->
		<view class="img">
			<img :src="item.cover" alt="">
			<text class="item-time text-white font-sm ">专栏</text>
		</view>
		<!-- tab切换 -->
		<tabBarList :tabList="tabList" :index="index" @changeActive="changeActive">、</tabBarList>

		<!-- 简介 -->
		<view class="" v-if="index==0">
			<view class="flex flex-column p-3">
				<view class="mb-1" style="font-size: 38rpx;">
					{{item.title}}
				</view>
				<view class="flex align-center justify-between">
					<text class="font-sm text-light-muted">
						{{item.sub_count?item.sub_count:0}}人学过
					</text>
					<text @click="changeCollect" class="iconfont  iconfont icon-shoucang1"
						:class="{textMain:item.isfava}" style="font-size: 25px;"></text>
				</view>
			</view>
			<view class="divider"></view>
			<view class="content">
				<view class="title">
					专栏简介
				</view>
				<view class="contentHtml" v-html="item.content"></view>
			</view>
		</view>


		<view class="" v-else>
			<view class="p-3">
				<view class="border rounded bg-light text-muted p-2">
					共 {{columnList.length}} 节
				</view>

				<view class="flex align-center align-center p-3 border-bottom" v-for="(item,index) in columnList"
					:key="index" @click="handleOpenDetail(item)">
					<view style="width: 90rpx;">{{index+1|formIndex}}</view>
					<view class="flex " style="flex-direction: column !important;">
						<view>{{item.title}}</view>
						<view>
							<text class="border text-danger rounded border-danger font-small px-1 mt-1 mr-1">
								{{item.type|formatType}}
							</text>
							<text class="border text-danger rounded border-danger font-small px-1 mt-1 mr-1"
								v-if="item.price==0">免费试看</text>
						</view>
					</view>

				</view>

			</view>
		</view>

		<!-- 立即订购 -->
		<view style="height:150rpx;" v-if="!item.isbuy"></view>
		<view class="btn" v-if="!item.isbuy">
			<button @click="navTo(`/pages/create-order/create-order?id=${item.id}&type=course`)">立即订购
				￥{{item.price}}</button>
		</view>
	</view>
</template>

<script>
	import columnApi from "@/api/column.js"
	import courseApi from "@/api/course.js"

	import tabBarList from '@/components/tabBar-List/tabBar-List.vue'
	export default {
		components: {
			tabBarList
		},
		data() {
			return {

				tabList: [{
					title: "简介",
					id: 0
				}, {
					title: "目录",
					id: 1
				}],
				index: 0,
				item: {}, //专栏详情数据
				rowsList: [],
				time: {},
				data: {
					id: "",
					group_id: 0,
					flashsale_id: 0,
				},
				columnList: []
			};
		},
		async onLoad(options) {
			this.data.id = options.id
			this.data.group_id = options.group_id

			this.getCoureList()

		},
		filters: {
			// 过滤序号
			formIndex(value) {
				if (value < 10) {
					return '00' + value
				} else if (value >= 10 && value < 100) {
					return '0' + value
				}

			},
			// 过滤 类型
			formatType(value) {
				let type = {
					media: '图文',
					audio: '音频',
					video: '视频',
					column: '专栏'
				}
				return type[value]

			},
		},

		methods: {

			// 修改 tab切换 
			changeActive(e) {
				// console.log(e)
				this.index = e
			},


			handleOpenDetail(item) {
				console.log("item=>", item,this.item.isbuy)
				if (item.price != 0 && !this.item.isbuy) {
					this.$utils.toast("请先购买该专栏")
					return
				}

				this.navTo("/pages/course/course?id=" + item.id + "&column_id=" + this.item.id, {
					isLogin: true
				})
			},








			// 获取 专栏详情数据 
			async getCoureList() {
				let res = await columnApi.getColumnList(this.data)

				console.log(res)

				this.item = res.data
				this.columnList = res.data.column_courses
				this.item.content = this.item.content.replace(/\<img/gi, '<img style="width :100%;height:auto"')
				uni.setNavigationBarTitle({
					title: res.data.title
				})

			},


			async getGroupWork() {
				console.log(this.data)
				let res = await courseApi.groupWork({
					group_id: this.data.group_id,
					page: 1
				})
				console.log(res)
				this.rowsList = res.data.rows
				console.log(this.rowsList, '0000')
			},

			// 切换喜欢 
			async changeCollect() {
				uni.showLoading({
					title: "操作中...",
					mask: true
				})
				console.log(this.item.type)
				let data = {
					goods_id: this.item.id,
					type: "column"
				}
				try {
					let res
					this.item.isfava ? res = await courseApi.callSava(data) : res = await courseApi.addSava(data)
					if (res.code == 20000) {
						uni.hideLoading()
						if (this.item.isfava) {
							this.$util.msg('取消收藏成功')
							this.item.isfava = false
						} else {
							this.$util.msg('收藏成功')
							this.item.isfava = true
						}
					} else {
						uni.hideLoading()
						this.$util.msg(res.data)
						setTimeout(() => {
							this.navTo('/pages/login/login')
						}, 500)
					}
				} catch (e) {
					console.log(e)
				}
			},

		}
	}
</script>

<style lang="scss">
	.img {
		width: 100%;
		height: 420rpx;
		position: relative;

		img {
			width: 100%;
			height: 100%;
		}

		.item-time {
			font-size: 14rpx;
			color: #fff;
			position: absolute;
			padding: 10rpx;
			right: 10px;
			bottom: 10rpx;
			background-color: rgba(0, 0, 0, 0.4);
		}

	}

	.content {
		.title {
			padding: 20rpx;
			border-bottom: 1px solid #ccc;
		}

		.contentHtml {
			padding: 0 25rpx;
			box-sizing: border-box;

		}
	}

	img {
		width: 100% !important;
	}

	.btn {
		box-sizing: border-box;
		height: 140rpx;
		background-color: #fff;
		border-top: 1px solid #ccc;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #5ccc84;
			border-radius: 10rpx;
			color: #fff;
		}
	}

	.textMain {
		color: #62ce89;
	}
</style>
