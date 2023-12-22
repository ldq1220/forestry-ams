import { defineStore } from 'pinia'
import { ref } from 'vue'

//  员工 ===> 自动不全输入框
const useAssetsStatus = defineStore('AssetsStatus', () => {
	const assetsStatus = ref()
	return {
		assetsStatus,
	}
})

export default useAssetsStatus
