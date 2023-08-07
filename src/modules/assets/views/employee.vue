<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<!-- <cl-refresh-btn /> -->
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

<script lang="ts" name="assets-employee" setup>
import { useCrud, useTable, useUpsert } from '@cool-vue/crud'
import { useCool } from '/@/cool'

const { service } = useCool()

// cl-upsert
const Upsert = useUpsert({
	dialog: {
		width: '500px',
	},
	items: [
		{
			prop: 'name',
			label: '姓名',
			required: true,
			component: { name: 'el-input' },
		},
		{
			prop: 'gender',
			label: '性别',
			component: {
				name: 'el-radio-group',
				options: [
					{
						label: '男',
						value: 1,
					},
					{
						label: '女',
						value: 0,
					},
				],
			},
		},
		{
			prop: 'deptId',
			label: '所属部门',
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
				'deptId',
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
			label: '姓名',
		},
		{
			prop: 'gender',
			label: '性别',
			dict: [
				{
					label: '男',
					value: 1,
					type: 'success',
				},
				{
					label: '女',
					value: 0,
					type: 'danger',
				},
			],
		},
		{
			prop: 'deptName',
			label: '所属部门',
			width: 160,
		},
		{
			prop: 'createTime',
			label: '创建日期',
			width: 160,
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
		service: service.assets.employee,
	},
	(app) => {
		app.refresh()
	},
)
</script>
