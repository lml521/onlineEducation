<template>
	<view class="login-box">
		<view class="login-bg"></view>
		<view class="login">
			<view class="loginTitle">{{type=='login'?'登 录':'注 册'}}</view>
			<!-- 表单 -->

			<formInput :type="type" :formlist="formlist" :agreement="agreement" 
			v-model="form" @changeLogin="toAccount">
			</formInput>

			<view class="register">
				<text class="text-success" @click="toAccount">
					{{type=='login'?'注册账号':'去登录'}}</text>
				<text v-if="type=='login'" class="text-light-muted" @click="navTo('/pages/forget/forget')">忘记密码？</text>
			</view>

			<view class="weixinIcon">
				<uni-icons type='weixin' size="30" color="#6dd091"></uni-icons>
			</view>

			<view v-if="type=='login'" class="agreement">
				<checkbox-group @change="changeCheckBox">
					<checkbox style="transform: scale(0.7);" :checkes="agreement" />
					<text class="text-light-muted">已阅读并同意用户协议&隐私声明</text>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>

<script>
	import formInput from "@/components/formInput/formInput.vue" //封装表单
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			formInput,
		},
		computed: {
			...mapGetters(["hasLogin"]),
		},
		data() {
			return {
				//登录 注册
				type: "login",
				agreement: false,
				form: {
					username: "",
					password: "",
					repassword: "",

				},
				// 表单数据 
				formlist: [{
						type: "text",
						icon: "person",
						placeholder: "请输入用户名",
						prop: "username",
						show: true
					},
					{
						type: "password",
						icon: "locked",
						placeholder: "请输入密码",
						prop: "password",
						show: true
					}, {
						type: "password",
						icon: "locked",
						placeholder: "请输入确认密码",
						prop: "repassword",
						show: false
					},

					{
						type: "button",
						value: "登 录"
					}
				]
			};
		},
		methods: {
			toAccount() {
				if (this.type == 'reg') {
					this.type = 'login'
					this.formlist[2].show = false
					this.formlist[3].value = '登 录'
				} else {
					this.type = 'reg'
					this.formlist[2].show = true
					this.formlist[3].value = '注 册'
				}
				for (let i in this.form) {
					this.form[i] = ""
				}
			},
			// 切换 多选
			changeCheckBox() {
				console.log(this.agreement)
				this.agreement=!this.agreement
			}
		}
	}
</script>

<style lang="scss">
	.loginTitle {
		font-size: 44rpx;
		color: #35404b;
		margin-bottom: 20rpx;
	}

	.register {
		margin-top: 70rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
	}

	.weixinIcon {
		margin: 70rpx auto 40rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		border: 1px solid #5ccc84;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 60rpx;
		color: #5ccc84;
	}

	.agreement {
		text-align: center;
	}
</style>
