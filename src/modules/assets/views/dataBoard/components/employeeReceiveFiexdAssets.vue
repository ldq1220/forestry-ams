<template>
	<cl-crud ref="fixedCrud" class="employeeReceiveFiexdAssets_box">
		<p class="title">您当前在用的资产如下：</p>
		<p class="assets">固定资产</p>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="FixedTable" />
		</cl-row>
	</cl-crud>
</template>

<script lang="ts" name="employeeReceiveFiexdAssets" setup>
import { useCrud, useTable } from '@cool-vue/crud'
import { useCool } from '/@/cool'
import dayjs from 'dayjs'
import { ref } from 'vue'
import { checkPerm } from '/$/base'

const { service } = useCool()

// cl-table
const FixedTable = useTable({
	columns: [
		{
			prop: 'customNo',
			label: '编号',
		},
		{
			prop: 'goodsName',
			label: '资产名称',
			formatter(row) {
				if (curDataType.value == '固定资产') {
					return row['field41'] != null ? row['field41'] : ''
				} else if (curDataType.value == '无形资产') {
					return row['field3'] != null ? row['field3'] : ''
				} else if (curDataType.value == '易耗品') {
					return row['field3'] != null ? row['field3'] : ''
				}
				return ''
			},
		},
		{
			prop: 'category',
			label: '分类',
			formatter(row) {
				if (curDataType.value == '固定资产') {
					return row['field2'] != null ? row['field2'] : ''
				} else if (curDataType.value == '无形资产') {
					return row['field2'] != null ? row['field2'] : ''
				} else if (curDataType.value == '易耗品') {
					return row['field2'] != null ? row['field2'] : ''
				}
				return ''
			},
		},
		{
			prop: 'sku',
			label: '规格型号',
			formatter(row) {
				if (curDataType.value == '固定资产') {
					return row['field78'] != null ? row['field78'] : ''
				} else if (curDataType.value == '无形资产') {
					return row['fieldxxx'] != null ? row['fieldxxx'] : ''
				} else if (curDataType.value == '易耗品') {
					return row['field20'] != null ? row['field20'] : ''
				}
				return ''
			},
		},
		{
			prop: 'receiveDate',
			label: '领用日期',
			formatter(row) {
				return row.receiveDate != null ? dayjs(row.receiveDate).format('YYYY-MM-DD') : ''
			},
		},
	],
})
const curDataType = ref('固定资产')
// cl-crud
const fixedCrud = useCrud(
	{
		service: service.assets.fixed.assetsFixedGoodsController,
		async onRefresh(params, { next, done }) {
			const permission = checkPerm(service.assets.fixed.assetsFixedGoodsController.permission.getMyReceiveGoodsList)
			if (permission) {
				params['dataType'] = curDataType.value
				next(params)
			} else {
				done()
			}
		},
		dict: {
			api: {
				page: 'getMyReceiveGoodsList',
			},
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

<style scoped lang="scss">
.employeeReceiveFiexdAssets_box {
	width: 100%;
	height: auto;
	max-height: 400px;
	background-color: transparent;

	.title {
		color: rgba(80, 80, 80, 1);
		font-size: 14px;
		margin-bottom: 20px;
	}
	.assets {
		color: rgba(80, 80, 80, 1);
		font-size: 14px;
		font-weight: bold;
		margin-bottom: 16px;
	}
	.cl-table {
		max-height: 500px !important;
	}
}
</style>
