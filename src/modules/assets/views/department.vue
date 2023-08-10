<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" name="assets-department" setup>
import { useCrud, useTable, useUpsert } from '@cool-vue/crud'
import { useCool } from '/@/cool'
import { deepTree } from '/@/cool/utils'
import useMiddle from '/@/modules/base/store/middle'

import departmentTree from '../components/departmentTree.vue'

const { service } = useCool()
const middle = useMiddle()

// cl-upsert
const Upsert = useUpsert({
	dialog: {
		width: '500px',
	},
	items: [
		{
			prop: 'name',
			label: '部门名称',
			required: true,
			component: { name: 'el-input' },
		},
		{
			prop: 'parentId',
			label: '上级部门',
			component: {
				vm: departmentTree,
			},
		},
	],
	async onOpened(data) {
		// 更新树形结构默认展开列的 控制变量
		middle.treeExpandedKeys = data.parentId
		middle.disabledId = data.id
	},
})

// cl-table
const Table = useTable({
	defaultSort: {
		prop: 'id',
		order: 'ascending',
	},
	columns: [
		{
			type: 'selection',
		},
		{
			prop: 'name',
			label: '部门名称',
		},
		{
			prop: 'parentName',
			label: '上级部门',
		},
		{
			prop: 'createTime',
			label: '创建时间',
			sortable: 'desc',
		},
		{
			type: 'op',
			buttons: ['edit', 'delete'],
		},
	],
})

// cl-crud
const Crud = useCrud(
	{
		service: service.assets.department,
		onRefresh(_, { render }) {
			service.assets.department.list().then((list) => {
				list.map((e: any) => {
					e.permList = e.perms ? e.perms.split(',') : []
				})
				render(deepTree(list))
			})
		},
	},
	(app) => {
		app.refresh()
	},
)
</script>
