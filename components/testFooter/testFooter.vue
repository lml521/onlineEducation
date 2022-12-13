<template>
	<view>
		<view class="footer">
			<view v-for="(item,index) in list " :key="index+1"  class="item" hover-class="active"
				:hover-stay-time="100" @click="handelbtn(item)">
				<text v-if="item.icon&&item.direction=='left'"   :class="{colorCCC:index==0}" class="iconfont icon-shangyibu"></text>
				<text v-if="item.icon&&item.direction=='right'" :class="{colorCCC:index==i}"   class="iconfont icon-xiayibu"></text>
				<text v-if="item.icon && !item.direction" :class="item.icon"></text>
				<view v-if="item.title">{{item.title||4}}</view>
				<view v-if="item.title==''"><text style="color: #5ccc94;">1</text>/4</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import list from '@/config/testList.js'
	export default {
		name:"testFooter",
		props:{
			i:{
				type:Number,
				default:1
			}
		},
		data() {
			return {
				list:list()
			};
		},
		methods:{
			handelbtn(item){
				console.log(item)
				if(item.event){
					this.$emit(item.event)
					
				}
			}
		}
	}
</script>

<style lang="scss">
.footer{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.item{
		flex: 1;
		width: 100%;
		height: 100%;
		text-align: center;
		display: flex;
		align-content: center;
		justify-content: center;
		flex-direction: column;
		view{
			font-size: 12px;
		}
		// flex-direction: row;
	}
}
.colorCCC{
	color: #a9a5a0;
}
.active {
		background-color: #f5f5f5;
	}
</style>