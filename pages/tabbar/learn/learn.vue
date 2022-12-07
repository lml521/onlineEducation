<template>
	<!-- 学习进度 -->
	<view class="box">
		<!-- {{hasLogin}} -->
		<view class="noLogin" v-if="!hasLogin">
			<!-- 学习进度 -->
			<img src="/static/noLogin.png" alt="">
			<view class="text">登录后才可以查看我的学习哦</view>
			<button class="btn " plain size="mini" @click="navTo('/pages/login/login')">立即登录</button>
		</view>
		
		<view class="loginBack" v-else>

			<view class="nav p-3">
				<navList :list="list"></navList>
			</view>
				<tabBar :index="index" @changeActive="changeActive"></tabBar>
		</view>
		
	</view>

</template>

<script>
	import tabBar from '@/components/tabBar-List/tabBar-List.vue'
	import {
		mapGetters
	} from "vuex";
	import learnNav from '@/config/learn-anv-list.js'
	import navList from '@/components/navList/navList.vue'
	export default {
		data() {
			return {
				list: learnNav(),
				index:0,
			};
		},
		components: {
			navList,
			tabBar
		},
		computed: {

			...mapGetters(["hasLogin"]),
		},
		methods:{
			changeActive(i){
				console.log(i)
				this.index=i
			}
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100%;
		overflow: hidden;
	}

	.noLogin {
		margin-top: 310rpx;
		text-align: center;

		img {
			width: 350rpx;
			height: 350rpx;
		}

		.text {
			font-size: 30rpx;
			color: #6c757d;
			margin: 15rpx 0;
		}
	}

	.nav {}
</style>
