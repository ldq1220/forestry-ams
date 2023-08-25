import { defineStore } from 'pinia'
import { reactive } from 'vue'

const useAdvSearchStore = defineStore('useAdvSearchStore', () => {
	const searchData: any = reactive({
		// assetsFixedGoods: {},
	})

	return {
		searchData,
	}
})

export default useAdvSearchStore
