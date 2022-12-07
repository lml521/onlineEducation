<template>
	<view class="flex">
		<view class="tab-item  font-md" v-for="(item,i) in tabList"  :key="i"  :class="{active:i==index}" @click="changeActive(i)">
			{{item.title}}
			<view :class="{tabLine:i==index}" class=" animate__animated animate__fadeIn animate__faster"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tabBar-List",
		props:{
			index:{
				type:Number,
				default:0
			},
			tabList:{
				type:Array,
				default:()=>[
					{
						title:"课程",
						id:0
					},{
						title:"专栏",
						id:1
					}
				]
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			changeActive(index){
				console.log(index)
				this.$emit('changeActive',index)
				
				
			}
		}
		
	}
</script>

<style lang="scss">
.tab-item{
	    position: relative;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    justify-content: center;
	    flex: 1;
	    padding: 10px;
	    color: #888;
}
.active{
	    color: #00cf8a;
	    font-weight: 700;
}
.tabLine{
	    width: 25px;
	    height: 5px;
	    background-color: #00cf8a;
	    border-radius: 5px;
	    position: absolute;
	    bottom: 0;
}
</style>