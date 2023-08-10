import { defineStore } from 'pinia'
import { ref } from 'vue'

const useFixedAssetsOptions = defineStore('FixedAssetsOptionsDict', () => {
	const typeData = ref()

	// 过滤字典
	const type = (type: string) => {
		let text = ''
		typeData.value.forEach((item: { id: string; value: any }) => {
			if (item.id == type) return (text = item.value)
		})
		return text
	}

	return {
		typeData,
		type,
	}
})

export default useFixedAssetsOptions
