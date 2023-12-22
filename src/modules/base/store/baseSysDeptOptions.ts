import { defineStore } from 'pinia'
import { ref } from 'vue'

// 部门列表
const useBaseSysDeptOptions = defineStore('BaseSysDeptOptions', () => {
	const baseSysDeptOptions = ref()

	return {
		baseSysDeptOptions,
	}
})

export default useBaseSysDeptOptions
