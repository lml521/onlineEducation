<template>
	<view>
		<view  style="background-color: #f5f5f1;" :style="getStyle" :class="getClass" ></view>
	</view>
</template>

<script>
	export default {
		name:"skeleton",
		props:{
			// 宽度
			width:{
				type:[Number,String],
				default:""
			},
			// 高度
			height:{
				type:[Number,String],
				default:""
			},
			// 圆角
			circle:{
				type:Boolean,
				default:false,
			},
			// 动态类名
			oClass:{
				type:String,
				default:""
			},
			
			
		},
		
		computed:{
			getStyle(){
				return `width:${this.width}; height:${this.height}`
			},
			getClass(){
				let c=""//
				if(this.circle){
					c+="rounded-circle"
				}
				return `${c} ${this.oClass}`
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>