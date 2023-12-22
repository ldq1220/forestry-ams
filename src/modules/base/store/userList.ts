import { defineStore } from 'pinia'
import { ref } from 'vue'

//  用户 ===> 自动补全输入框
const userList = defineStore('userList', () => {
	const userList = ref()
	// const querySearch
	return {
		userList,
	}
})

export default userList
