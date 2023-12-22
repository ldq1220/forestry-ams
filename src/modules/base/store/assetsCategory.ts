import { defineStore } from 'pinia'
import { ref } from 'vue'

// 资产类别列表
const useAssetsCategory = defineStore('AssetsCategory', () => {
	const assetsCategory = ref()

	return {
		assetsCategory,
	}
})

export default useAssetsCategory
