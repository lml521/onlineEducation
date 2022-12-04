<template>
	<view class="box">
		<!-- 资料编辑 -->
		<userList :list="list" @chooseImg="chooseImg" @editName="editName"
		 @chooseSex="chooseSex" v-model="form"></userList>
		<button class="btn" @click="submit">提 交</button>
	</view>
</template>

<script>
	import userList from '@/pages/tabbar/home/components/userList.vue' // 封装列表
	import userInfoList from "@/config/user-info-list.js" //列表数据
	import uploadApi from "@/api/upload.js"
	import loginApi from "@/api/login.js"
	import {
		mapGetters
	} from 'vuex'
	import {computed} from 'vue'
	export default {
		components: {
			userList
		},
		onShow() {
				list: userInfoList()
		},
		data() {
			return {
				list: userInfoList(),
				form:{
					nickname:this.$store.state.userinfo.nickname,
				}
			};
		},
		computed: {
			...mapGetters(["hasUserInfo"]),
		},	
		
		methods: {
			// 更换头像 
			chooseImg(e) {
				console.log(e)
				uni.chooseImage({
					count: 1, //默认9  /mobile/upload
					sizeType:['compressed'],
					success: async (res) => {
						const file = res.tempFilePaths[0];
						console.log(file)
						uni.showLoading({
							title: "更换头像中",
							mask: true,
						});
						let {code,data,message} =await uploadApi.uploadImg(file)
						if(code==20000){
						this.hasUserInfo.avatar=data
						this.$store.commit('setToken',this.hasUserInfo)
						this.list= userInfoList()
						uni.hideLoading()
						}else{
							this.$util.msg('头像更新失败')
							uni.hideLoading()
						}
					}
				})
			},
			// 更换昵称 
			editName(e) {
				console.log(e)
			},

			// 更换性别 
			chooseSex(e) {
				let arr = ['未知', '男', '女']
				uni.showActionSheet({
					itemList: arr,
					success: (res) => {
						console.log(arr[res.tapIndex]);
						this.hasUserInfo.sex = arr[res.tapIndex]
						this.list = userInfoList()
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},

			async submit() {
				this.hasUserInfo.nickname=this.form.nickname
				uni.showLoading({
					title: "提交中",
					mask: true,
				});

				let {code,data} = await loginApi.updateinfo(this.hasUserInfo)
				if (code == 20000) {
					this.$util.msg('保存成功')
					this.$store.commit('setToken',this.hasUserInfo)
				}
			}
		}
	}
</script>

<style lang="scss">
	.box {
		.btn {
			// margin-top: 10rpx;
			width: 690rpx;
			height: 80rpx;
			line-height: 80rpx;
			color: #fff;
			border-radius: 10rpx;
			background-color: #5ccc84;
		}
	}
</style>
