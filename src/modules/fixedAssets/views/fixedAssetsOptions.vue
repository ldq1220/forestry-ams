<template>
	<div class="fixed_assets_options_box">
		<!-- 固定资产 -->
		<div class="fixed_assets_options">
			<h2>固定资产表配置</h2>
		</div>
	</div>
	<cl-crud ref="Crud" style="padding: 0; margin: 0 50px; height: 85%">
		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table">
				<template #column-createTime="">
					<el-checkbox label=""></el-checkbox>
				</template>
				<template #column-updateTime="">
					<el-checkbox label=""></el-checkbox>
				</template>
			</cl-table>
		</cl-row>
	</cl-crud>
</template>
<script setup name="fixedAssetsOptions" lang="ts">
import { useTable, useCrud } from '@cool-vue/crud'
import { service } from '/@/cool'

// cl-crud
const Crud = useCrud(
	{
		service: service.assets.fixed.assetsFixedField,
		dict: {
			api: {
				page: 'list',
			},
		},
	},
	(app) => {
		app.refresh()
	},
)
// cl-table
const Table = useTable({
	defaultSort: {
		prop: 'id',
		order: 'ascending',
	},
	columns: [
		{
			prop: 'fieldName',
			label: '字段名称',
		},
		{
			prop: 'inUse',
			label: '是否使用',
			width: 140,
		},
		{
			prop: 'searchEnable',
			label: '支持搜索',
			width: 140,
		},
		{
			prop: 'dataType',
			label: '类型',
		},
		{
			prop: 'options',
			label: '选项（单选或下拉类型）',
		},
	],
})
</script>

<style scoped lang="scss">
.fixed_assets_options_box {
	padding: 30px 50px 14px 50px;
	.fixed_assets_options {
		h2 {
			color: rgba(80, 80, 80, 1);
			font-size: 20px;
			font-weight: bold;
		}
	}
}
</style>
