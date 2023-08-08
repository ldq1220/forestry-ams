<template>
	<cl-crud ref="Crud">
		<cl-row>
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

const { service } = useCool()

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
				name: 'el-select',
				options: [],
				props: {
					multiple: false,
					'multiple-limit': 3,
				},
			},
		},
	],
	// 获取部门列表
	async onOpen() {
		service.assets.department.list().then((res) => {
			Upsert.value?.setOptions(
				'parentId',
				res.map((e) => {
					return {
						label: e.name || '',
						value: e.id,
					}
				}),
			)
		})
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
			prop: 'parentId',
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
