<template>
	<view class="examination" >

		<view class="header" >
		<view  v-if="item.type=='answer'">
			问答题
		</view>
			<view v-if="item.type=='radio'">单选</view>
			<view style="color: #666;font-size: 12px;">第{{i}}题</view>
			
		</view>
		
		<view class="content">
			<!-- 标题 -->
			<view class="title" v-html="item.title"></view>
			
			<!-- 单选  多选 文本域 -->
			<view class="" v-if="item.type=='answer'">
				<textarea name="" id="" cols="30" rows="10" placeholder="请输入答案..."></textarea>
				
			</view>
			
			<view class="border rounded px-3 py-2 mb-2 flex align-start border-main text-main" v-for="(ele,i) in item.options">
			<text class="mr-1">{{i}}</text>
			<text v-html="ele"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"examination",
		props:{
			i:{
				type:Number,
				default:1,
			},
			item:{
				type:Object,
				default:()=>{}
			}
			
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.examination{
		// margin-top: 200rpx;
		.header{
			padding: 20rpx;
			display: flex;
			border-bottom: 0.5px solid #ccc;
			justify-content: space-between;
		}
		.content{
			padding: 20rpx;
				border-bottom: 0.5px solid #ccc;
				.title{
					margin-bottom: 10px;
				}
		}
	}
</style>