<template>
	<section>
		<h2>axios</h2>
		<template v-if="data.resData.length">
			<div class="todo" v-for="todo in data.resData" :key="todo.id">
				<span class="name">{{todo.name}} email: </span>
				<span class="email">{{todo.email}}</span>
			</div>
			<div class="info">以上数据来源于 
				<a href="http://jsonplaceholder.typicode.com/" target="_blank">http://jsonplaceholder.typicode.com/</a>
			</div>
		</template>
		<template v-else>
			<div class="noData">暂无数据</div>
		</template>
	</section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import axiosService from '@/services/axios'
import Loading from '@/utils/loading'

const data = reactive({
	resData: []
})
async function getInitData() {
	Loading.show()
	const response = await axiosService.getData(1)
	// const response = await axiosService.setData({ postId: 1 })
	console.log(response)
	data.resData = response
	Loading.hide()
}

onMounted(() => {
	getInitData()
})

</script>

<style lang="scss" scoped>
	section {
		background: #ffffff;
		padding: 10px 20px;
		border-radius: 10px;
		div.todo {
			text-align: left;
			padding: 8px 0;
			.name {
				color: #000000;
			}
			.email {
				color: blue;
			}
		}
		div.info {
			margin: 20px auto;
			font-size: 12px;
			a {
				color: blue;
				text-decoration: underline;
			}
		}
		div.noData {
			font-size: 14px;
			margin: 20px auto;
		}
	}
</style>