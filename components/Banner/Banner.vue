<template>
	<view class="banner">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="flex justify-center" v-for="(item,index) in list " :key="index" @click="topage(item)">
				<img :src="item.src" alt="">
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name:"Banner",
		props:{
			list:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			topage(item){
				console.log(item)
				if(item.url){
					location.href=item.url
				}else{
					this.navTo(`/pages/course/course?id=${item.course_id}`)
				}
			}
		}
	}
</script>

<style lang="scss">
.banner,swiper{
	height: 300rpx;
	swiper-item{
		img{
			width: 720rpx;
			height: 100%;
		}	
	}
	
	
}
</style>