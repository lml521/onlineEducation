<template>
	<view>
		<view class="p-2 " style="border-bottom: 1px solid #ccc;">
			<view class="flex justify-between">
				<text class="h4 font-weight-bold">{{item.testpaper.title}}</text>
				<text class="font-sm text-success">考试成功</text>
			</view>
			<view class="flex my-3">
				<text class="flex-1">题目总数: {{item.testpaper.question_count}}</text>
				<text class="flex-1 text-danger">最终得分：正在阅卷</text>
			</view>


		</view>
		<view class="p-3">
			<view class="flex text-light-muted">
			{{item.created_time}}
		</view>
		</view>
		<view class="divider"></view>



	</view>
</template>

<script>
	import testListApi from "@/api/testList.js"
	export default {
		props: {
			item: {
				type: Object,
				default: () => {
					return {
						answer_status: 1,
						created_time: "2022-12-14 11:39:11",
						id: 2506,
						read_status: 0,
						score: 0,
						testpaper: {
							id: 148,
							title: "htrdhrte",
							total_score: 100,
							pass_score: 60,
							expire: 60,
							question_count: 10
						}

					}
				}
			}
		},
		data() {
			return {

			};
		},

		methods: {

		}
	}
</script>

<style lang="scss">

</style>
