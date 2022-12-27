<template>
	<view>

		<view class="scroll-row-item course course-one flex p-2">
			<view class="position-relative">
				<img :src="item.cover" />
			</view>
			<view class="right flex flex-column flex-shrink">
				<view class="font-lg">
					{{item.title}}
				</view>
				<view class="flex flex-1 align-end">
					<view class="border rounded p-2 text-danger flex align-center"
						style="background-color: rgb(255, 247, 240); border-color: rgb(255, 227, 203);">
						<view class="font-lg">
							￥{{item.t_price}}
						</view>
						<view class="font text-light-muted">
							￥{{item.price}}
						</view>
						<view class="mx-2">
							|
						</view>
						<view class="font">
							{{item.sub_count}}人
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="divider"></view>
		<tabBar :index="index" :tabList="tabList" @changeActive="changeActive"></tabBar>
		<!-- 简介 -->
		<view class="flex flex-column" v-if="index==0">
			<view class="p-3">
				<view class="mb-1" style="font-size: 19px;">
					{{item.title}}
				</view>
				<view class="font-sm text-light-muted">
					{{item.sub_count}}人学过
				</view>
			</view>
			<view class="divider"></view>
			<view class="uni-card uni-border uni-card--full">
				<view class="uni-card__header uni-border-bottom">
					电子书简介
				</view>
				<view class="p-2" v-html="item.try">

				</view>

			</view>
		</view>

		<view class="" v-else>
			<view class="p-3">
				<view class="border rounded bg-light text-muted p-2">
					共 {{item.book_details.length}} 节
				</view>

				<view class="flex align-center align-center p-3 border-bottom" v-for="(ele,index) in item.book_details"
					:key="index" @click="navTo(`/pages/book/book?id=${ele.id}&book_id=${item.id}`)"
					hover-class="bg-light">
					<view style="width: 90rpx;">{{index+1|formIndex}}</view>
					<view class="flex " style="flex-direction: column !important;">
						<view>{{ele.title}}</view>
						<view>

							<text class="border text-danger rounded border-danger font-small px-1 mt-1 mr-1"
								v-if="ele.isfree">免费试看</text>
						</view>
					</view>

				</view>

			</view>
		</view>

	</view>
</template>

<script>
	import bbsApi from "@/api/bbs.js"
	import tabBar from '@/components/tabBar-List/tabBar-List.vue'
	export default {
		components: {
			tabBar
		},
		data() {
			return {
				id: "",
				item: {},
				index: 0,
				tabList: [{
						title: '简介',
						type: 'course',
						page: 1,
						list: [],
						loadMore: "more"
					},
					{
						title: '目录',
						type: 'column',
						page: 1,
						list: [],
						loadMore: "more"
					}
				],
			};
		},
		onLoad(options) {
			console.log(options)
			this.id = options.id
			this.getBookDetailList()
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
		},
		methods: {


			// 获取数据
			async getBookDetailList() {
				let res = await bbsApi.getBookDetailList({
					id: this.id
				})
				console.log(res)
				if (res.code == 20000) {
					this.item = res.data

					uni.setNavigationBarTitle({
						title: this.item.title
					})
				}
			},

			// 切换tab
			changeActive(i) {
				this.index = i
			},

		}
	}
</script>

<style lang="scss">
	.position-relative {
		width: 260rpx;
		height: 380rpx;
		padding-right: 20rpx;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.uni-card {
		.uni-card__header {
			padding: 20rpx;
			border-bottom: 1px solid #ccc;
		}
	}
</style>
