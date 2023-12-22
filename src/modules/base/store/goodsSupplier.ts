import { defineStore } from 'pinia'
import { ref } from 'vue'

// 供应商列表
const useGoodsSupplier = defineStore('GoodsSupplier', () => {
	const goodsSupplier = ref()

	return {
		goodsSupplier,
	}
})

export default useGoodsSupplier
