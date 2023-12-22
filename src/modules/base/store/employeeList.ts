import { defineStore } from 'pinia'
import { ref } from 'vue'

//  员工 ===> 自动不全输入框
const useEmployeeList = defineStore('EmployeeList', () => {
	const employeeListData = ref()
	const employeeList = ref()
	// const querySearch
	return {
		employeeListData,
		employeeList,
	}
})

export default useEmployeeList
