<template>
	<el-tree-select v-model="value" node-key="value" :data="TreeData" :render-after-expand="false" show-checkbox check-strictly :default-expanded-keys="expandedKeys" />
</template>

<script setup lang="ts" name="departmentTree">
import { onBeforeMount, ref } from 'vue'
import { useCool } from '/@/cool'
import useMiddle from '/@/modules/base/store/middle'

const { service } = useCool()
const middle = useMiddle()

const value = ref()
const TreeData = ref()
const expandedKeys: any = ref([])

// 获取部门树
const getTreeData = () => {
	service.assets.department.getTreeData().then((res) => {
		TreeData.value = res
	})
	// 由于组件挂载要 先与 打开编辑弹窗 故做延迟处理
	setTimeout(() => {
		expandedKeys.value[0] = middle.treeExpandedKeys
	}, 300)
}

onBeforeMount(() => {
	getTreeData()
})
</script>
