<template>
	<view>
		<view class="login-bg"></view>
		<view class="login">
			<view class="title">
				找回密码
			</view>
			<formInput 
			:type="type" :formlist="formlist"  v-model="form" >
			</formInput>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:"retrievePassword",
				form:{
					phone:""
				},
				formlist: [{
						type: "text",
						icon: "person",
						placeholder: "请输入手机号码",
						prop: "phone",
						show: true
					},
					{
						type: "code",
						icon: "locked",
						placeholder: "请输入验证码",
						prop: "code",
						show: true
					}, {
						type: "password",
						icon: "locked",
						placeholder: "请输入密码",
						prop: "password",
						show: true
					},
				{
					type: "password",
					icon: "locked",
					placeholder: "请输入确认密码",
					prop: "repassword",
					show: true
				},
					{
						type: "button",
						value: "立即找回"
					}
				]
					
				
			};
		}
	}
</script>

<style lang="scss">
.title{
	    font-size: 44rpx;
	    margin-bottom: 25px;
	    color: #35404b;
}
</style>
