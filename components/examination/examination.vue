<template>
	<view class="examination" >
		<view class="header" >	
		<view  v-if="item.type">
			{{this.obj[item.type]}}
		</view>
		<view style="color: #666;font-size: 12px;">第{{i}}题</view>
			
		</view>
		
		<view class="content">
			<!-- 标题 -->
			<view class="title" v-html="item.title"></view>
			
			<!-- 单选  多选 文本域 -->
			<view class="textarea" v-if="item.type=='answer'||item.type=='completion'">
				<textarea  placeholder="请输入答案..."></textarea>
				<view class="bg-main main-btn  mt-3">
					添加填空
				</view>
			</view>
			
			<view class="border rounded px-3 py-2 mb-2 flex align-start "
			 v-for="(ele,i) in item.options">
			<text class="mr-1">{{i==0?'A':i==1?'B':i==2?'C':i==3?'D':'E'}}</text>
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
				obj:{
					answer:"问答题",
					trueOrfalse:"判断题",
					checkbox:"多选题",
					radio:"单选题",
					completion:"填空题"
				}
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
			width: 100% !important;
			box-sizing: border-box;
			padding: 20rpx;
				// border-bottom: 0.5px solid #ccc;
				.title{
					margin-bottom: 10px;
				}
				
			.textarea {
		width: 100%;
		box-sizing: border-box;
		textarea{
			box-sizing: border-box;
			border: 1px solid #ccc;
			padding: 10px;
			width: 100%;
		}
	}	
		}
	}
	
</style>