<template>
	<!-- 学习进度 -->
	<view class="box">
		<!-- {{hasLogin}} -->
		<view class="noLogin" v-if="!hasLogin">
			<!-- 学习进度 -->
			<img src="/static/noLogin.png" alt="">
			<view class="text">登录后才可以查看我的学习哦</view>
			<button class="btn " plain size="mini" @click="navTo('/pages/login/login')">立即登录</button>
		</view>

		<view class="loginBack" v-else>

			<view class="nav p-3">
				<navList :list="list"></navList>
			</view>
			<tabBar :index="index" @changeActive="changeActive"></tabBar>

			<!-- 搜索结果列表 -->
			<swiper :style="{height: height}" class="flex-1 flex flex-column" @change="handleChange" :current="index"
				:duration="200">
				<swiper-item class="flex" v-for="(item,index) in tabList" :key="index" :style="{height: height}">

					<scroll-view @scrolltolower="handleLoadMore(item)" class="flex-1" scroll-y="true">
						<index-item :item="ele" v-for="(ele,i) in item.list" :key="i">
							<view slot="desc" class="font-sm text-light-muted my-1">学习进度</view>
							<view class="font-sm">
								<text v-if="i == 0" class="text-danger mr-1">最近学习</text>
								<text class="text-muted">已学习 {{ ele.progress }}%</text>
							</view>
						</index-item>

						<uni-load-more :status="item.loadMore">

						</uni-load-more>
						<view class="" style="height: 100px !important;"></view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>



	</view>

</template>

<script>
	import tabBar from '@/components/tabBar-List/tabBar-List.vue'
	import {
		mapGetters
	} from "vuex";
	import learnNav from '@/config/learn-anv-list.js'
	import navList from '@/components/navList/navList.vue'

	import learnAPi from "@/api/learn.js"
	export default {
		data() {
			return {
				height: "",
				list: learnNav(),
				index: 0,
				tabList: [{
						title: '课程',
						type: 'course',
						page: 1,
						list: [],
						loadMore: "more"
					},
					{
						title: '专栏',
						type: 'column',
						page: 1,
						list: [],
						loadMore: "more"
					}
				],
			};
		},
		components: {
			navList,
			tabBar
		},
		computed: {

			...mapGetters(["hasLogin"]),
		},
		onShow(e) {
			if (this.hasLogin) {
				this.tabList.forEach((item) => {
					item.page = 1
					item.loadMore = "more"
				})
				this.initLoad()
			}
			uni.$on("progress", () => {
				
					this.initLoad()
			
			})
		},
		created() {
			this.height = uni.getSystemInfoSync().windowHeight - uni.upx2px(80) + 'px'
			this.initLoad()
		},
		methods: {
			async initLoad() {
				const tabList = this.tabList[this.index]


				const response = await learnAPi.getHistoryList({
					type: tabList.type,
					page: tabList.page,
				})
				if (response.code == 20000) {
					tabList.list = tabList.page === 1 ? response.data.rows : [...tabList.list, ...response.data.rows]
					tabList.loadMore = response.data.rows.length < 10 ? 'noMore' : 'more'
					console.log(tabList)
				} else {
					tab.loadStatus = 'more'
					if (tab.page > 1) {
						tab.page = tab.page - 1
					}
				}


			},



			// 切换tab
			changeActive(i) {
				this.index = i
			},
			// 左右滑动
			handleChange(e) {
				this.index = e.detail.current
				const tab = this.tabList[this.index]
				console.log(tab)
				if (tab.loadMore === "more" && tab.page === 1) {
					this.initLoad()
				}
			},
			// 上拉加载
			handleLoadMore(item) {
				console.log(item, 1)
				if (item.loadMore !== 'more') return
				item.page = item.page + 1
				this.initLoad()
			}
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100%;
		overflow: hidden;
	}

	.noLogin {
		margin-top: 310rpx;
		text-align: center;

		img {
			width: 350rpx;
			height: 350rpx;
		}

		.text {
			font-size: 30rpx;
			color: #6c757d;
			margin: 15rpx 0;
		}
	}

	page {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
