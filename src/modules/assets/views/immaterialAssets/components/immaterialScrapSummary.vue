<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<cl-flex1 />

			<!-- 制表日期筛选 -->
			<div class="date_picker">
				<span style="font-size: 12px; margin-right: 10px">制表日期</span>
				<el-date-picker
					v-model="putStorageTime"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					style="width: 240px"
					@change="handlePutStorageTime"
				/>
			</div>

			<!-- 关键字搜索 -->
			<cl-search-key placeholder="搜索" />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table">
				<!-- 展开信息 -->
				<template #column-detail="{ scope }">
					<div style="padding: 0 10px">
						<el-table :data="scope.row.goodsList" :stripe="true" :border="true" style="width: 90%; margin: 0 5% 12px 5%">
							<el-table-column label="资产名称" prop="field3" header-align="center" />
							<el-table-column label="资产分类" prop="field2" header-align="center" />
							<el-table-column label="财厅编号" prop="field4" header-align="center" />
							<el-table-column label="规格型号" prop="fieldnull" header-align="center" />
							<el-table-column label="存放地点" prop="field35" header-align="center" />
						</el-table>
					</div>
				</template>
				<template #column-op="{ scope }">
					<!-- 导出 -->
					<cl-export-btn link type="primary" size="small" :columns="exportColumns" :data="getExportExcelData(scope.row)" :filename="'领用汇总导出-' + new Date().getTime()" />
				</template>
			</cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>
	</cl-crud>
</template>

<script lang="ts" name="immateralScrapCollect" setup>
import { useCrud, useTable } from '@cool-vue/crud'
import { useCool } from '/@/cool'
import { ref } from 'vue'
import dayjs from 'dayjs'

const { service } = useCool()

const putStorageTime: any = ref([]) // 制表日期
// 制表日期搜素
const handlePutStorageTime = () => {
	// if (putStorageTime.value == null) {
	// 	putStorageTime.value = []
	// 	refresh()
	// } else {
	// 	refresh()
	// }
}

// cl-upsert

// cl-table
const Table = useTable({
	columns: [
		{
			label: '',
			type: 'selection',
			width: 40,
		},
		{
			label: '',
			type: 'index',
		},
		// 展开列
		{
			label: '',
			type: 'expand',
			prop: 'detail',
		},
		{
			label: '汇总编号',
			prop: 'summaryNo',
		},
		{
			label: '汇总表名称',
			prop: 'name',
		},
		{
			label: '数量',
			prop: 'cnt',
			width: 200,
		},
		{
			label: '制表人',
			prop: 'personName',
		},
		{
			label: '制表日期',
			prop: 'inventoryDate',
			formatter: function (row, column, value) {
				return value ? (value.indexOf(' ') != -1 ? value.split(' ')[0] : value) : ''
			},
			width: 200,
		},
		{
			label: '操作',
			prop: 'op',
			width: 120,
		},
	],
})

// cl-crud
const Crud = useCrud(
	{
		service: service.assets.summary.immaterialAssetsDiscardSummaryController,
		dict: {
			api: {
				page: 'page',
			},
		},
		async onRefresh(params, { next, render }) {
			if (putStorageTime.value != null && putStorageTime.value.length > 0) {
				params['startTime'] = dayjs(putStorageTime.value[0]).format('YYYY-MM-DD') // 制表日期（开始）
				params['endTime'] = dayjs(putStorageTime.value[1]).format('YYYY-MM-DD') // 制表日期（结束）
			} else {
				params['startTime'] = undefined // 制表日期（开始）
				params['endTime'] = undefined // 制表日期（结束）
			}
			const { list } = await next(params)
			// 渲染数据
			render(list)
		},
	},
	(app) => {
		app.refresh()
	},
)

// // 刷新
// function refresh(params?: any) {
// 	Crud.value?.refresh(params)
// }

// 导出 字段
const exportColumns = ref([
	{
		label: '汇总编号',
		prop: 'col1',
	},
	{
		label: '汇总表名称',
		prop: 'col2',
	},
	{
		label: '数量',
		prop: 'col3',
	},
	{
		label: '制表人',
		prop: 'col4',
	},
	{
		label: '制表日期',
		prop: 'col5',
	},
	{
		label: '',
		prop: 'col6',
	},
])
// 导出 数据
const getExportExcelData = (item: any) => {
	let data = []
	// 第1行
	data.push({
		col1: item && item.summaryNo ? item.summaryNo : '',
		col2: item && item.name ? item.name : '',
		col3: item && item.cnt ? item.cnt : '',
		col4: item && item.personName ? item.personName : '',
		col5: item && item.inventoryDate ? (item.inventoryDate.indexOf(' ') != -1 ? item.inventoryDate.split(' ')[0] : item.inventoryDate) : '',
		col6: '',
	})
	// 第2行
	data.push({
		col1: '序号',
		col2: '资产名称',
		col3: '资产分类',
		col4: '财厅编号',
		col5: '规格型号',
		col6: '存放地点',
	})
	// 第3行开始
	if (item != null && item.goodsList != null && item.goodsList.length > 0) {
		for (let i = 0; i < item.goodsList.length; i++) {
			// 写入这个资产物品的数据(占一行)
			const goods = item.goodsList[i]
			data.push({
				col1: i + 1,
				col2: goods.field3 ? goods.field3 : '',
				col3: goods.field2 ? goods.field2 : '',
				col4: goods.field4 ? goods.field4 : '',
				col5: goods.fieldnull ? goods.fieldnull : '',
				col6: goods.field35 ? goods.field35 : '',
			})
		}
	}
	return data
}
</script>
