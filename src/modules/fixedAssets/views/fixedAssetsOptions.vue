<template>
	<div class="fixed_assets_options_box">
		<!-- 固定资产 -->
		<div class="fixed_assets_options">
			<h2>固定资产表配置</h2>
		</div>
	</div>
	<cl-crud ref="Crud" style="padding: 0; margin: 0 50px; height: 80%">
		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table">
				<template #column-fieldName="{ scope }">
					<span v-if="scope.row.customField !== 1">{{ scope.row.fieldName }}</span>
					<span v-else>
						<el-input :placeholder="scope.row.fieldName"></el-input>
					</span>
				</template>

				<!-- 展开信息 -->
				<template #column-id="{ scope }">
					<div style="padding: 10px 200px" v-if="scope.row.dataType == 'options'">
						<el-form :model="form" :inline="true" class="demo-form-inline">
							<el-form-item label="名称">
								<el-input v-model="form.name" placeholder="请输入选项名称" clearable />
							</el-form-item>
						</el-form>
					</div>
					<div v-else style="text-align: center">类型：{{ FixedAssetsOptions.type(scope.row.dataType) }}</div>
				</template>

				<template #column-inUse="{ scope }">
					<el-checkbox v-model="scope.inUse" :checked="scope.row.inUse === 1" @change="changeinUse(scope.row.id, scope.row.inUse)"></el-checkbox>
				</template>
				<template #column-searchEnable="{ scope }">
					<el-checkbox v-model="scope.searchEnable" :checked="scope.row.inUse === 1"></el-checkbox>
				</template>
				<template #column-dataType="{ scope }">
					{{ FixedAssetsOptions.type(scope.row.dataType) }}
				</template>
			</cl-table>
		</cl-row>
	</cl-crud>
	<cl-row class="save">
		<el-button type="primary">保存</el-button>
	</cl-row>
</template>
<script setup name="fixedAssetsOptions" lang="ts">
import { useTable, useCrud } from '@cool-vue/crud'
import { service } from '/@/cool'
import useFixedAssetsOptions from '/$/base/store/FixedAssetsOptionsDict'
import { reactive } from 'vue'

const FixedAssetsOptions = useFixedAssetsOptions()

const form = reactive({
	name: '',
	value: '',
})

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
const Table: any = useTable({
	defaultSort: {
		prop: 'id',
		order: 'ascending',
	},
	columns: [
		{
			prop: 'sortOrder',
			label: '序号',
			width: 100,
		},

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
		// 展开列
		{
			label: '#',
			type: 'expand',
			prop: 'id',
		},
		{
			prop: 'dataType',
			label: '类型',
		},
		// {
		// 	prop: 'options',
		// 	label: '选项（单选或下拉类型）',
		// },
	],
})

// 点击是否使用单选框
const changeinUse = (id: number, inUse: number) => {
	if (inUse === 1) {
		// 取消使用
		Table._value.data.forEach((item: { id: number; inUse: number }) => {
			if (item.id === id) return (item.inUse = 0)
		})
	} else {
		// 使用
		Table._value.data.forEach((item: { id: number; inUse: number }) => {
			if (item.id === id) return (item.inUse = 1)
		})
	}
}
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
.save {
	padding: 16px 50px;
	justify-content: right;
}
</style>
