<template>
	<el-tree-select v-model="value" node-key="value" :data="treeData" :render-after-expand="false" show-checkbox check-strictly :default-expanded-keys="expandedKeys" />
</template>

<script setup lang="ts" name="departmentTree">
import { onBeforeMount, ref } from 'vue'
import { useCool } from '/@/cool'
import useMiddle from '/@/modules/base/store/middle'

const { service } = useCool()
const middle = useMiddle()

const value = ref()
const treeData = ref()
const expandedKeys: any = ref([])

onBeforeMount(() => {
	getTreeData()
})

// 获取部门树
const getTreeData = () => {
	service.assets.department.getTreeData().then((res) => {
		treeData.value = res
	})
	// 由于组件挂载要 先与 打开编辑弹窗 故做延迟处理
	setTimeout(() => {
		expandedKeys.value[0] = middle.treeExpandedKeys
		disabledTreeItem(middle.disabledId, treeData.value)
	}, 500)
}

// 禁用节点
const disabledTreeItem = (id: string, data: any) => {
	data.forEach((item: { value: string; disabled: boolean; children: any }) => {
		if (item.value == id) {
			// 如果 这个有子节点 则禁用全部子节点
			if (item.children) {
				item.disabled = true
				disabledAllChilden(item.children) // 禁用节点所有子节点
			} else {
				item.disabled = true
			}
		}
		if (item.children && item.children.length > 0) {
			disabledTreeItem(id, item.children)
		}
	})
}

// 禁用节点所有子节点
const disabledAllChilden = (data: any[]) => {
	data.forEach((item) => {
		item.disabled = true
		if (item.children && item.children.length > 0) {
			disabledAllChilden(item.children)
		}
	})
}
</script>
