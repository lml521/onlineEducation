<template>
	<view>
		<!-- {{item}} -->
		<courseHeader :item="item" :time="time" :rowsList="rowsList"></courseHeader>
	
		<courseContent :item="item"></courseContent>
		<view  style="height:150rpx;"></view>
		<view class="btn">
			<button @click="navTo(`/pages/create-order/create-order?id=${item.id}&type=course`)">立即订购 ￥{{item.price}}</button>
			
		</view>
	</view>
</template>

<script>
	import courseHeader from '@/pages/course/components/course-header.vue'
	import indexApi from "@/api/index.js"
	import courseApi from "@/api/course.js"
	import courseContent from "@/pages/course/components/courseContent.vue"
	export default {
		components:{
			courseHeader,
			courseContent
		},
		data() {
			return {
				item:{},
				rowsList:[],
				time:{},
				data:{
					id: "",
					column_id: 0,
					group_id: 0,
					flashsale_id: 0,
				}
			};
		},
		onLoad(options){
			console.log(options.id)
			this.data.id=options.id
			this.data.group_id=options.group_id
			this.getCoureList()
			this.getGroupWork()
			this.getTimeList()
		       // 别问我啥意思。这是官方文档提供的
				// this.page = this.getOpenerEventChannel();
				// // 你可以在这里直接接受，这里不是$on
				// this.page.on('sendTestValue',(data)=>{
				// 	// 这是data 就是上个页面传递的对象了
				// 	console.log(data)
				// 	this.item=data.item
				// 	uni.setNavigationBarTitle({
				// 		title:this.item.title
				// 	})
				// })
		},
		onShow(){
				this.getGroupWork()
		},
		methods:{
			getTimeList(){
				if(this.item.group){
					setInterval(()=>{
						let res=this.$util.getTime(this.item.group.end_time)
						this.time=res
						// console.log(this.time)
					},1000)
						
					}
			},
		async getCoureList(){	
				let {code,data} = await indexApi.toCourse(this.data)
				console.log(code,data)
				if(code==20000){
					
					data.try=data.try.replace(/\<img/gi,'<img style="width :100%;height:auto"')
					this.item=data
					this.getTimeList()
					uni.setNavigationBarTitle({
							title:this.item.title
						})
				}
			},
			
			
			async getGroupWork(){
				console.log(this.data)
				let res =await courseApi.groupWork({group_id:this.data.group_id,page:1})
				console.log(res)
				this.rowsList=res.data.rows
				console.log(this.rowsList)
			}
			
			
			
		}
	}
</script>

<style lang="scss">
.btn{
	box-sizing: border-box;
	height: 140rpx;
	background-color: #fff;
	border-top: 1px solid #ccc;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20rpx;
	button{
		display: flex;
		    align-items: center;
		    justify-content: center;
		background-color: #5ccc84;
		border-radius: 10rpx;
		color: #fff;
	}
}
</style>
