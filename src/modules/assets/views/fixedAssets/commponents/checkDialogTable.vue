<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<!-- <cl-refresh-btn /> -->
			<!-- 新增按钮 -->
			<el-button type="success" size="default">新增盘点记录</el-button>
			<!-- <cl-add-btn /> -->
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

<script lang="ts" name="菜单名称" setup>
import { useCrud, useTable, useUpsert } from '@cool-vue/crud'
import { useCool } from '/@/cool'

const { service } = useCool()

// const props = defineProps(['checkId'])

// cl-upsert
const Upsert = useUpsert({
	items: [],
})

// cl-table
const Table = useTable({
	columns: [
		{
			label: '编号',
			prop: 'field3',
		},
		{
			label: '资产名称',
			prop: 'field41',
		},
		{
			label: '规格型号',
			prop: 'field78',
		},
		{
			label: '存放地点',
			prop: 'field32',
		},
		{
			label: '入库日期',
			prop: 'field5',
		},
		{
			label: '资产原值（元）',
			prop: 'field9',
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
		service: service.assets.inventory.assetsFixedInventoryController,
		dict: {
			api: {
				page: 'getAssetsFixedInventoryRecordByPage4Plan',
			},
		},
		async onRefresh(params, { next, render }) {
			// 带上其他查询参数（分页查询）
			params['planId'] = 2

			const { list } = await next(params)
			// 渲染数据
			render(list)
		},
	},
	(app) => {
		app.refresh()
	},
)

// 刷新
// function refresh(params?: any) {
// 	Crud.value?.refresh(params)
// }
</script>
