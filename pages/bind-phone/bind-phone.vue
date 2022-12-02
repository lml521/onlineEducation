<template>
	<view class="box">
		<view class="login-bg"></view>
		<view class="login">
			<view class="title">
				绑定手机号
			</view>
			<formInput :formlist="formlist" v-model="form" :type="type"></formInput>
		</view>
		
	</view>
</template>

<script>
	// bind_mobile
	import formInput from '@/components/formInput/formInput.vue'
	export default {
		data() {
			return {
				
				type:"SFZ",
				form:{
					phone:"",
					code:"",
				},
				formlist:[{
						type: "text",
						icon: "person",
						placeholder: "请输入手机号",
						prop: "phone",
						show: true
					},
					{
						type: "code",
						icon: "locked",
						placeholder: "请输入验证码",
						prop: "code",
						show: true
					},
					{
						type: "button",
						value: "绑 定"
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
