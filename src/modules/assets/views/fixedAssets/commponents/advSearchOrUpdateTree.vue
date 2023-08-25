<template>
	<el-tree-select v-model="treeValue" node-key="value" :data="newArray" check-strictly :render-after-expand="false" show-checkbox check-on-click-node @check="changenode" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useAdvSearchStore from '/@/modules/base/store/advSearch'

const advSearchStore = useAdvSearchStore()
const treeValue = ref()
const props: any = defineProps(['treeData', 'fieldId', 'page', 'type'])

watch(treeValue, (newValue) => {
	// 取消选择 清除pinia 中的字段
	if (newValue === undefined) {
		delete advSearchStore.searchData[props.page][props.fieldId]
	}
})

// 点击树形节点
const changenode = (currentData: any) => {
	// console.log(advSearchStore.searchData[props.page])
	// 高级搜索
	if (props.type === 'adeSearch') {
		if (advSearchStore.searchData[props.page]) {
			let obj = { [currentData.fieldId]: currentData.value }
			Object.assign(advSearchStore.searchData[props.page], obj)
		} else {
			let obj = {
				[props.page]: { [currentData.fieldId]: currentData.value },
			}
			Object.assign(advSearchStore.searchData, obj)
		}
	}
}

// 重写数据格式
const newArray = ref()
const transformArray = (array: any) => {
	return array.map((item: { optionText: any; children: string | any[]; fieldId: string }) => {
		const transformedItem = {
			value: item.optionText,
			label: item.optionText,
			fieldId: props.fieldId,
			children: [],
		}

		// 递归处理 children
		if (item.children && item.children.length > 0) {
			transformedItem.children = transformArray(item.children)
		}

		return transformedItem
	})
}
if (props.treeData) {
	newArray.value = transformArray(props.treeData)
}
</script>

<style scoped lang="scss"></style>
