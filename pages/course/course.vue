<template>
	<view>
		<courseHeader :item="item" :time="time" :rowsList="rowsList"></courseHeader>
		<courseContent :item="item"></courseContent>
		<view style="height:150rpx;" v-if="!item.isbuy"></view>
		<view class="btn" v-if="!item.isbuy">
			<button @click="navTo(`/pages/create-order/create-order?id=${item.id}&type=course`)">立即订购
				￥{{item.price}}</button>
		</view>
	</view>
</template>

<script>
	import courseHeader from '@/pages/course/components/course-header.vue'
	import indexApi from "@/api/index.js"
	import courseApi from "@/api/course.js"
	import courseContent from "@/pages/course/components/courseContent.vue"
	export default {
		components: {
			courseHeader,
			courseContent
		},
		data() {
			return {
				item: {},
				rowsList: [],
				time: {},
				data: {
					id: "",
					column_id: 0,
					group_id: 0,
					flashsale_id: 0,
				}
			};
		},
		async onLoad(options) {
			this.data.id = options.id
			this.data.group_id = options.group_id
			await this.getCoureList()
			if (this.item.group) {
				this.getGroupWork()
			}
			this.time = this.$util.getTime(this.item.group.end_time)
			this.getTimeList()
		},

		methods: {
			getTimeList() {
				if (this.item.group) {
					setInterval(() => {
						this.time = this.$util.getTime(this.item.group.end_time)
					}, 1000)
				}
			},
			async getCoureList() {
				let {code,data} = await indexApi.toCourse(this.data)
				if (code == 20000) {
					data.try = data.try.replace(/\<img/gi, '<img style="width :100%;height:auto"')
					this.item = data
					this.getTimeList()
					uni.setNavigationBarTitle({
						title: this.item.title
					})
				} else {
					this.$util.msg(data)
					setTimeout(() => {
						this.navBack()
					}, 1000)
				}
			},


			async getGroupWork() {
				let res = await courseApi.groupWork({
					group_id: this.data.group_id,
					page: 1
				})
				this.rowsList = res.data.rows
			}
		}
	}
</script>

<style lang="scss">
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
</style>
