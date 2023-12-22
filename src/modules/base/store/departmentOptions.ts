import { defineStore } from 'pinia'
import { ref } from 'vue'

// 部门列表
const useDepartmentOptions = defineStore('DepartmentOptions', () => {
	const departmentOptions = ref()

	return {
		departmentOptions,
	}
})

export default useDepartmentOptions
