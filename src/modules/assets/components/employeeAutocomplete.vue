<template>
	<!-- 员工 自动补全输入框 -->
	<div>
		<el-autocomplete v-model="name" :fetch-suggestions="querySearch" class="inline-input w-50" :placeholder="props.placeholder" />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCool } from '/@/cool'

const { service } = useCool()

const props = defineProps(['placeholder', 'field14'])
// const props = defineProps({
// 	field14: any,
// 	placeholder: String,
// })

onMounted(() => {
	getEmployeeList()
})

const name = ref()

// 获取 员工
const getEmployeeList = () => {
	service.assets.employee.list().then((res) => {
		res.forEach((item) => {
			restaurants.value.push({ value: item.name })
		})
	})
}

// 自动补全输入框
const createFilter = (queryString: string) => {
	return (restaurant: any) => {
		return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
	}
}
const restaurants: any = ref([])
const querySearch = (queryString: string, cb: any) => {
	const results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value
	cb(results)
}
</script>

<style scoped lang="scss"></style>
