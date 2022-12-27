<template>
	<view class="examination">
		<view class="header">
			<view v-if="item.type">
				{{this.obj[item.type]}}
			</view>
			<view style="color: #666;font-size: 12px;">第{{i}}题</view>

		</view>

		<view class="content">
			<!-- 标题 -->
			<view class="title" v-html="item.title"></view>

			<!-- 单选  多选  -->
			<view class="textarea" v-if="item.type=='answer'||item.type=='completion'">
				<textarea placeholder="请输入答案..." @input="handelText" v-model="item.user_value[iNum]"
					v-for="(numItem,iNum) in item.user_value"></textarea>
				<view class="bg-main main-btn  mt-3" @click="handleAddCompletion" v-if="item.type=='completion'">
					添加填空
				</view>
			</view>

			<!-- 单选 -->

			<view v-if="item.type!=='checkbox'" class="border rounded px-3 py-2 mb-2 flex align-start "
				v-for="(ele,is) in item.options" @click="answer(is)"
				:class="{'border-main text-main':item.user_value==is}">
				<text class="mr-1">{{is==0?'A':is==1?'B':is==2?'C':is==3?'D':'E'}}</text>
				<text v-html="ele"></text>
			</view>

			<!-- 多选 -->
			<view v-if="item.type==='checkbox'" class="border rounded px-3 py-2 mb-2 flex align-start "
				v-for="(ele,is) in item.options" @click="answer(is)"
				:class="{'border-main text-main':item.user_value[is]==is}">
				<text class="mr-1">{{is==0?'A':is==1?'B':is==2?'C':is==3?'D':'E'}}</text>
				<text v-html="ele"></text>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		name: "examination",
		props: {
			i: {
				type: Number,
				default: 1,
			},
			item: {
				type: Object,
				default: () => {}
			}

		},
		data() {
			return {
				num: 1,
				obj: {
					answer: "问答题",
					trueOrfalse: "判断题",
					checkbox: "多选题",
					radio: "单选题",
					completion: "填空题"
				},

				data: []
			};
		},

		methods: {
			// 添加填空
			handleAddCompletion() {
				this.item.user_value.push("")
			},
			// 单选 多选 
			answer(is) {
				console.log(this.item)
				// 判断是多选还是 单选 
				// 多选 
				if (this.item.type == 'checkbox') {

					// 判断 当第一次点击添加 再次点击则取消这一项
					let indexs = this.item.user_value.findIndex(item => {
						return item == is
					})
					console.log(indexs, 5)
					if (indexs > -1) {
						this.item.user_value.splice(indexs, 1)
						return
					}
					console.log(this.item.user_value)


					// 判断 是否重复添加 
					let index = this.item.user_value.findIndex(item => {
						return item == is
					})
					console.log(index, 93)
					index < 0 ? this.item.user_value.push(is) : this.item.user_value


				} else {
					// 单选 
					// 判断 单选当 已经选中再次点击将会被取消高亮
					this.item.user_value = this.item.user_value == is ? -1 : is

					console.log(this.item.user_value)

				}
				// this.item.user_value<0?this.item.user_value=[]:this.item.user_value

				// let isPush=	this.item.user_value.findIndex(item=>{
				// 		return item==is
				// 	})
				// 	isPush<0?this.item.user_value.push(is):this.item.user_value
			},
			// 文本域 
			handelText(e) {
				this.item.user_value[0] = e.detail.value
				console.log(this.item)
			}
		}
	}
</script>

<style lang="scss">
	.examination {
		padding-bottom: 100rpx !important;

		.header {
			padding: 20rpx;
			display: flex;
			border-bottom: 0.5px solid #ccc;
			justify-content: space-between;
		}

		.content {
			width: 100% !important;
			box-sizing: border-box;
			padding: 20rpx;

			.title {
				margin-bottom: 10px;
			}

			.textarea {
				width: 100%;
				box-sizing: border-box;

				textarea {
					margin-top: 10px;
					box-sizing: border-box;
					border: 1px solid #ccc;
					padding: 10px;
					width: 100%;
				}
			}
		}
	}
</style>
