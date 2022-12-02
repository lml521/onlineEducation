<template>
	<view class="content animate__animated animate__fadeInDown">
			124
		<view class="text-area">
			<text class="title text-main">{{title}}</text>
			<view class="animated bounceOutLeft"></view>
			<view class="iconfont icon-info">
				
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api/login.js'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		created(){
			this.login()
		},
		methods: {
			async login(){
				let res =await api.login()
				// console.log(res)
				
			}

		}
	}
</script>

<style>

</style>
