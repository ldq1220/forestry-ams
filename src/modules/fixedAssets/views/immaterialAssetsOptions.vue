<template>
	<cl-crud ref="Crud" style="padding: 10px; margin: 0 50px">
		<div class="fixed_assets_options_box">
			<!-- 固定资产 -->
			<div class="fixed_assets_options">
				<h2>无形资产表配置</h2>
			</div>
		</div>
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
		</cl-row>

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
					<div style="padding: 10px 40px" v-if="scope.row.dataType == 'options'">
						<el-form :model="form" :inline="true" class="demo-form-inline options_message">
							<el-form-item label="名称">
								<el-input v-model="form.name" placeholder="请输入选项名称" />
							</el-form-item>
							<el-form-item label="上级名称">
								<el-tree-select v-model="form.parentId" node-key="id" :props="form.options" :data="scope.row.optionList" check-strictly :render-after-expand="false" show-checkbox />
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="addOptionsNode(scope.row.id)">添加</el-button>
							</el-form-item>
						</el-form>

						<div class="option_tree">
							<el-tree :data="scope.row.optionList" :props="form.options" default-expand-all>
								<template #default="{ node, data }">
									<span class="custom-tree-node">
										<span>{{ node.label }}</span>
										<span>
											<a class="remove_tree_node" @click="remove(node, data)">删除</a>
										</span>
									</span>
								</template>
							</el-tree>
						</div>
					</div>
					<div v-else style="text-align: center">类型：{{ FixedAssetsOptions.type(scope.row.dataType) }}</div>
				</template>

				<template #column-inUse="{ scope }">
					<el-checkbox v-model="scope.inUse" :checked="scope.row.inUse === 1" @change="changeinUse(scope.row.id, scope.row.inUse)"></el-checkbox>
				</template>
				<template #column-searchEnable="{ scope }">
					<el-checkbox v-model="scope.searchEnable" :checked="scope.row.searchEnable === 1" @change="changeinSearchEnable(scope.row.id, scope.row.searchEnable)"></el-checkbox>
				</template>
				<template #column-dataType="{ scope }">
					{{ FixedAssetsOptions.type(scope.row.dataType) }}
				</template>
			</cl-table>
		</cl-row>

		<cl-row class="save">
			<el-button type="primary" @click="handleSave">保存</el-button>
		</cl-row>
	</cl-crud>
</template>
<script setup name="fixedAssetsOptions" lang="ts">
import { useTable, useCrud } from '@cool-vue/crud'
import { service } from '/@/cool'
import useFixedAssetsOptions from '/$/base/store/FixedAssetsOptionsDict'
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

const FixedAssetsOptions = useFixedAssetsOptions()

const form = reactive({
	name: '',
	parentId: undefined,
	options: {
		label: 'optionText',
		value: 'id',
		children: 'children',
	},
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

// 点击是否支持搜索
const changeinSearchEnable = (id: number, searchEnable: number) => {
	if (searchEnable === 1) {
		// 取消使用
		Table._value.data.forEach((item: { id: number; searchEnable: number }) => {
			if (item.id === id) return (item.searchEnable = 0)
		})
	} else {
		// 使用
		Table._value.data.forEach((item: { id: number; searchEnable: number }) => {
			if (item.id === id) return (item.searchEnable = 1)
		})
	}
}

// 添加下拉选选项框 节点
const addOptionsNode = (id: any) => {
	service.assets.fixed.fieldSelectOptionController
		.add({
			fieldId: id,
			optionText: form.name,
			parentId: form.parentId,
		})
		.then(() => {
			ElMessage.success('添加成功')
			form.name = ''
			form.parentId = undefined
			refresh()
		})
}

// 删除下拉选选项框 节点
const remove = (node: any, data: { id: any }) => {
	service.assets.fixed.fieldSelectOptionController
		.delete({
			ids: [data.id],
		})
		.then(() => {
			console.log(data.id)
			ElMessage.success('删除成功')
			refresh()
		})
}

// 保存配置
const handleSave = () => {
	service.assets.immaterial.immaterialAssetsFieldController.saveImmaterialAssetsFieldSet({ fmData: Table._value.data }).then(() => {
		ElMessage.success('保存成功')
		refresh()
	})
}

// cl-crud
const Crud = useCrud(
	{
		service: service.assets.immaterial.immaterialAssetsFieldController,
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

/**
 * 刷新
 */
function refresh() {
	Crud.value?.refresh()
}
</script>

<style lang="scss">
.option_tree {
	// width: 300px;
	// margin: 0 auto;
	.el-tree-node__content {
		.custom-tree-node {
			width: 100%;
			display: flex;
			justify-content: space-between;
		}
	}
}
</style>

<style scoped lang="scss">
.fixed_assets_options_box {
	// padding: 0px 0 14px 0;
	margin-bottom: 14px;
	text-align: center;
	.fixed_assets_options {
		h2 {
			color: rgba(80, 80, 80, 1);
			font-size: 20px;
			font-weight: bold;
		}
	}
}
.save {
	padding: 16px 0;
	justify-content: right;
}
.option_tree {
	.remove_tree_node:hover {
		color: red;
	}
}
</style>
