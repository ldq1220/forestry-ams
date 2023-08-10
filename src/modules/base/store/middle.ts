import { defineStore } from 'pinia'
import { ref } from 'vue'

const useMiddle = defineStore('middle', () => {
	// 部门维护 页面 获取 点击编辑按钮 控制树形结构默认展开 的变量
	const treeExpandedKeys = ref()

	// 部门列表树 禁用行id
	const disabledId = ref()

	return {
		treeExpandedKeys,
		disabledId,
	}
})

export default useMiddle
