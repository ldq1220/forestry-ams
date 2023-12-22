<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<!-- <cl-add-btn /> -->
			<!-- 删除按钮 -->
			<!-- <cl-multi-delete-btn /> -->
			<!-- 自定义列 -->
			<cl-column-custom :columns="custom" name="assetsFixedGoods" />
			<!-- 批量修改 -->
			<el-button type="primary" size="default" @click="handleBatchUpdate" v-permission="service.assets.pushStorageDoc.pushStorageDocController.permission.batchUpdateInfo">批量修改</el-button>

			<div class="upload" v-permission="service.assets.immaterial.immaterialAssetsGoodsController.permission.import">
				<cl-upload
					v-model="urls"
					type="file"
					:show-file-list="false"
					:limit="1"
					:limit-upload="false"
					multiple="false"
					text="财厅编号更新导入"
					accept=".xls,.xlsx"
					@success="onSuccess"
					:auto-upload="true"
				></cl-upload>
			</div>

			<!-- 导出 -->
			<cl-export-btn type="success" :columns="exportColumns" :filename="'无形资产表-' + dayjs().format('YYYY-MM-DD')" :data="onExportData">导出</cl-export-btn>

			<cl-flex1 />

			<!-- 入库日期筛选 -->
			<div class="date_picker">
				<span style="font-size: 12px; margin-right: 10px">入库日期</span>
				<el-date-picker v-model="putStorageTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 220px" />
			</div>

			<!-- 资产状态筛选 -->
			<cl-filter label="资产状态">
				<!-- 配置props，选择后会自动过滤列表 -->
				<cl-select style="width: 120px" :options="assetsStatusStore.assetsStatus" prop="field14" />
			</cl-filter>

			<!-- 关键字搜索 -->
			<cl-search-key placeholder="搜索资产名称" />

			<!-- <cl-flex1 /> -->
			<!-- 高级搜索按钮 -->
			<cl-adv-btn />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" @selection-change="selectionChange">
				<!-- 资产编号 -->
				<template #column-customNo="{ scope }">
					{{ scope.row.customNo }}
					<el-tooltip content="复制资产编号" placement="top" effect="dark">
						<span class="customNo_copy_icon" @click="copy_customNo(scope.row.customNo)">
							<el-icon><copy-document /></el-icon>
						</span>
					</el-tooltip>
				</template>
			</cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 批量修改对话框 -->
		<batchUpdateDialog :visiable="visiable" dataType="无形资产" :selectionChangeData="selectionChangeData" @closeDialog="closeDialog" />

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert">
			<template #slot-op-btns="{ scope }">
				<el-button type="primary" @click="addRow(scope)" :icon="Plus">添加</el-button>
				<el-button type="danger" @click="deleteRow(scope)" :icon="Delete">删除</el-button>
			</template>
			<template #slot-accessory-list="{ scope }">
				<el-table :data="scope.accessoryList" :stripe="true" style="width: 100%" @select="accessoryDataSelect" @select-all="accessoryDataSelect">
					<el-table-column type="selection" width="40" />
					<el-table-column type="index" />
					<el-table-column prop="name" label="配件名称" header-align="center">
						<template #default="scope2">
							<el-input v-model="scope2.row.name" placeholder="请填写" />
						</template>
					</el-table-column>
					<el-table-column prop="sku" label="规格型号" header-align="center">
						<template #default="scope2">
							<el-input v-model="scope2.row.sku" placeholder="请填写" />
						</template>
					</el-table-column>
					<el-table-column prop="cnt" label="数量" header-align="center" width="120">
						<template #default="scope2">
							<el-input-number v-model="scope2.row.cnt" placeholder="请填写" :min="1" :precision="0" class="full-width" />
						</template>
					</el-table-column>
					<el-table-column prop="buyDate" label="购置日期" header-align="center">
						<template #default="scope2">
							<el-date-picker v-model="scope2.row.buyDate" type="date" placeholder="请选择" format="YYYY-MM-DD" value-format="YYYY-MM-DD" style="width: 100%" />
						</template>
					</el-table-column>
					<el-table-column prop="price" label="原值(元)" header-align="center">
						<template #default="scope2">
							<el-input-number :precision="2" v-model="scope2.row.price" placeholder="请填写" class="full-width" />
						</template>
					</el-table-column>
					<el-table-column prop="manufacturer" label="生产厂商" header-align="center">
						<template #default="scope2">
							<el-input v-model="scope2.row.manufacturer" placeholder="请填写" />
						</template>
					</el-table-column>
					<template #empty>
						<el-empty />
					</template>
				</el-table>
			</template>
		</cl-upsert>

		<!-- 详情对话框 -->
		<div class="info_dialog">
			<cl-dialog v-model="infoDialog" title="无形资产详情" width="950" center draggable>
				<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
					<el-tab-pane label="基础信息" name="basics">
						<div class="info_dialog_content">
							<div class="content_item" v-for="(item, index) in immaterialAssetsInfo.baseData" :key="index">
								<div class="item_label">{{ item.label }}</div>
								<div class="item_content">{{ item.value }}</div>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="价值信息" name="value">
						<div class="info_dialog_content">
							<div class="content_item" v-for="(item, index) in immaterialAssetsInfo.valueData" :key="index">
								<div class="item_label">{{ item.label }}</div>
								<div class="item_content">{{ item.value }}</div>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="使用信息" name="use">
						<div class="info_dialog_content">
							<div class="content_item" v-for="(item, index) in immaterialAssetsInfo.useData" :key="index">
								<div class="item_label">{{ item.label }}</div>
								<div class="item_content">{{ item.value }}</div>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="入账信息" name="enterAccount">
						<div class="info_dialog_content">
							<div class="content_item" v-for="(item, index) in immaterialAssetsInfo.incomeData" :key="index">
								<div class="item_label">{{ item.label }}</div>
								<div class="item_content">{{ item.value }}</div>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="其他信息" name="else">
						<div class="info_dialog_content">
							<div class="content_item" v-for="(item, index) in immaterialAssetsInfo.otherData" :key="index">
								<div class="item_label">{{ item.label }}</div>
								<div class="item_content">{{ item.value }}</div>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="附属附件" name="accessoryList">
						<el-table :data="immaterialAssetsInfo.accessoryList" :stripe="true" style="width: 100%">
							<el-table-column type="index" width="40" />
							<el-table-column prop="name" label="配件名称" header-align="center">
								<template #default="scope">
									<el-text>{{ scope.row.name ? scope.row.name : '-' }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="sku" label="规格型号" header-align="center">
								<template #default="scope">
									<el-text>{{ scope.row.sku ? scope.row.sku : '-' }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="cnt" label="数量" width="130" header-align="center">
								<template #default="scope">
									<el-text>{{ scope.row.cnt ? scope.row.cnt : '-' }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="buyDate" label="购置日期" header-align="center">
								<template #default="scope">
									<el-text>{{ scope.row.buyDate ? scope.row.buyDate : '-' }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="price" label="原值(元)" header-align="center">
								<template #default="scope">
									<el-text>{{ scope.row.price ? scope.row.price : '-' }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="manufacturer" label="生产厂商" header-align="center">
								<template #default="scope">
									<el-text>{{ scope.row.manufacturer ? scope.row.manufacturer : '-' }}</el-text>
								</template>
							</el-table-column>
							<template #empty>
								<el-empty />
							</template>
						</el-table>
					</el-tab-pane>
				</el-tabs>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="infoDialog = false">关闭</el-button>
					</span>
				</template>
			</cl-dialog>
		</div>

		<!-- 高级搜索 -->
		<cl-adv-search ref="AdvSearch">
			<template #slot-name="{ scope }">
				<el-input v-model="scope.name" />
			</template>
		</cl-adv-search>
	</cl-crud>
</template>

<script lang="ts" name="immaterialAssetsList" setup>
import { useCrud, useTable, useUpsert, useAdvSearch } from '@cool-vue/crud'
import { onMounted, reactive, ref, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { useCool } from '/@/cool'
import useDepartmentOptions from '/@/modules/base/store/departmentOptions'
import useEmployeeList from '/@/modules/base/store/employeeList'
import useGoodsSupplier from '/@/modules/base/store/goodsSupplier'
import useAssetsCategory from '/@/modules/base/store/assetsCategory'
import useAssetsStatus from '/@/modules/base/store/assetsStatus'
import batchUpdateDialog from '../../components/batchUpdateDialog.vue'
import { CopyDocument, Plus, Delete } from '@element-plus/icons-vue'
import useClipboard from 'vue-clipboard3'

const { toClipboard } = useClipboard()
const departmentOptionsStore = useDepartmentOptions()
const employeeListStore = useEmployeeList()
const goodsSupplierStore = useGoodsSupplier()
const assetsCategoryStore = useAssetsCategory()
const assetsStatusStore = useAssetsStatus()

const { service } = useCool()

const custom = ref() // 自定义列 数据
const urls = ref()
const immaterialAssetsInfo: any = reactive({
	baseData: [],
	valueData: [],
	useData: [],
	incomeData: [],
	otherData: [],
	accessoryList: [],
})
const activeName = ref('basics')
const infoDialog = ref(false)
const searchEnable: any = ref([]) // 高级搜索数据
const putStorageTime: any = ref([]) // 入库日期

// 复制资产编号
const copy_customNo = async (copyText: string) => {
	try {
		await toClipboard(copyText)
		ElMessage.success('复制成功')
	} catch (e) {
		console.error(e)
	}
}

// 批量修改
const visiable = ref(false)
const selectionChangeData = ref([])
const handleBatchUpdate = () => {
	selectionChangeData.value.length === 0 ? ElMessage.info('请选择批量修改项') : (visiable.value = true)
}
const closeDialog = () => {
	visiable.value = false
	refresh()
}
const selectionChange = (row: any) => {
	selectionChangeData.value = row
}

// 上传成功
function onSuccess<T extends { id: number }>(data: T) {
	service.assets.immaterial.immaterialAssetsGoodsController
		.updateAssetsCTNo({
			// @ts-ignore
			filePath: data.url,
		})
		.then(() => {
			// 导入结果
			ElMessage.success('导入成功')
			refresh()
		})
}

onMounted(() => {
	addOptionsNode() //新加的字段查询方法
	getColumns() // 获取表格显示字段

	// 监听自定义列的变化
	watch(custom, () => {
		Table.value.columns = custom.value
	})
})

// 新加的字段查询方法
const addOptionsNode = () => {
	service.assets.fixed.fieldCookieDataController?.getImmaterialAssetsNewCustomFields().then((res) => {
		let assetsFixedGoods = JSON.parse(localStorage.getItem('column_custom_immaterialAssetsGoods') as string) || []
		if (res.length > 0 || assetsFixedGoods.length > 0) {
			let lebelArr: any = []
			assetsFixedGoods.forEach((item: { label: any }) => {
				lebelArr.push(item.label)
			})
			res.forEach((item: { label: any }) => {
				if (lebelArr.indexOf(item.label) == -1) {
					assetsFixedGoods.push(item)
				}
			})

			localStorage.setItem('column_custom_immaterialAssetsGoods', JSON.stringify(assetsFixedGoods))
		}
	})
}

// 列设定一些宽度
const addStyle = (obj: any, item: any) => {
	if (item.fieldName === '所属单位') {
		obj.width = 250
		obj.headerAlign = 'center'
		obj.align = 'left'
	} else if (item.fieldName === '资产分类') {
		obj.width = 250
		obj.headerAlign = 'center'
		obj.align = 'left'
	} else if (item.fieldName === '财厅编号') {
		obj.width = 200
		obj.headerAlign = 'center'
		obj.align = 'center'
	} else if (item.fieldName === '资产名称') {
		obj.width = 200
		obj.headerAlign = 'center'
		obj.align = 'center'
	} else {
		obj.width = 150
	}
}

// 获取表格显示字段 && 高级搜索 && 编辑form表单
const getColumns = () => {
	service.assets.immaterial.immaterialAssetsGoodsController.getTableFields().then((res) => {
		// 表格配置项
		res.forEach((item: { fieldId: string; fieldName: any; dataType: string; searchEnable: number }) => {
			const obj: any = {
				prop: item.fieldId,
				label: item.fieldName,
				hidden: false,
			}
			addStyle(obj, item)
			if (item.fieldId === 'customNo') {
				obj.width = 180
			}
			if (['date', 'number', 'integer'].includes(item.dataType)) {
				obj.sortable = 'asc'
			}
			if (item.dataType === 'date') {
				obj.formatter = (row: any) => {
					return row[item.fieldId] ? dayjs(row[item.fieldId]).format('YYYY-MM-DD') : ''
				}
			}
			Table.value.columns.push(obj)

			// 设置高级搜索数据
			if (item.searchEnable === 1) {
				searchEnable.value.push(item)
			}
		})

		custom.value = Table.value.columns // 给自定义列 数据
		// 给 导出添加数据
		custom.value.forEach((item: any) => {
			exportColumns.value.unshift(item)
		})

		if (Table.value.columns.length > 0) {
			Table.value.columns.push({
				type: 'op',
				width: 240,
				// @ts-ignore
				buttons({ scope }) {
					return [
						'edit',
						{
							label: '详情',
							type: 'info',
							onClick() {
								service.assets.immaterial.immaterialAssetsGoodsController.getImmaterialGoodsInfoById({ id: scope.row.id }).then((res) => {
									Object.assign(immaterialAssetsInfo, res)
								})

								infoDialog.value = true
							},
						},
						'delete',
					]
				},
			})
		}

		// 高级搜索 || 编辑输入框form
		res.forEach((item: any) => {
			if (item.searchEnable === 1 && item.dataType === 'options') {
				// 高级搜索
				AdvSearchOptions.items.push({
					label: item.fieldName,
					prop: item.fieldId,
					component: {
						name: 'el-tree-select',
						props: {
							data: item.optionList,
							props: {
								label: 'optionText',
								value: 'optionText',
								children: 'children',
								disabled: 'disabled',
							},
							clearable: true,
							filterable: true,
							'default-expand-all': true,
							'check-strictly': true,
						},
					},
				})
			} else if (item.searchEnable === 1 && ['text', 'number', 'integer'].includes(item.dataType)) {
				AdvSearchOptions.items.push({
					label: item.fieldName,
					prop: item.fieldId,
					component: {
						name: 'el-input',
					},
				})
			} else if (item.searchEnable === 1 && ['joinTable'].includes(item.dataType) && item.joinTableMethod.includes('employee')) {
				AdvSearchOptions.items.push({
					label: item.fieldName,
					prop: item.fieldId,
					component: {
						name: 'el-autocomplete',
						props: {
							placeholder: `请输入${item.fieldName}`,
							'fetch-suggestions': employeeListStore.employeeList,
						},
					},
				})
			} else if (item.searchEnable === 1 && ['joinTable'].includes(item.dataType) && item.joinTableMethod.includes('department')) {
				AdvSearchOptions.items.push({
					label: item.fieldName,
					prop: item.fieldId,
					component: {
						name: 'el-tree-select',
						props: {
							data: departmentOptionsStore.departmentOptions,
							clearable: true,
							filterable: true,
							'check-strictly': true,
							'render-after-expand': false,
							'show-checkbox': true,
							'check-on-click-node': true,
							'default-expand-all': true,
						},
					},
				})
			} else if (item.searchEnable === 1 && ['joinTable'].includes(item.dataType) && item.joinTableMethod.includes('goodsSupplier')) {
				AdvSearchOptions.items.push({
					label: item.fieldName,
					prop: item.fieldId,
					component: {
						name: 'el-tree-select',
						props: {
							data: goodsSupplierStore.goodsSupplier,
							props: {
								label: 'supplierName',
								value: 'supplierName',
								children: 'children',
								disabled: 'disabled',
							},
							clearable: true,
							filterable: true,
							'default-expand-all': true,
							'check-strictly': true,
						},
					},
				})
			} else if (item.searchEnable === 1 && ['joinTable'].includes(item.dataType) && item.joinTableMethod.includes('assetsCategory')) {
				AdvSearchOptions.items.push({
					label: item.fieldName,
					prop: item.fieldId,
					component: {
						name: 'el-tree-select',
						props: {
							data: assetsCategoryStore.assetsCategory,
							props: {
								label: 'categoryName',
								value: 'categoryName',
								children: 'children',
								disabled: 'disabled',
							},
							clearable: true,
							filterable: true,
							'default-expand-all': true,
							'check-strictly': true,
						},
					},
				})
			}
		})

		// 编辑输入框
		res.forEach((item: any) => {
			if (item.dataType === 'options') {
				clUpsertOptions.items.push({
					label: item.fieldName,
					prop: item.fieldId,
					group: item.belongTab,
					hidden: item.fieldName === '使用部门',
					component: {
						name: 'el-tree-select',
						props: {
							data: item.optionList,
							props: {
								label: 'optionText',
								value: 'optionText',
								children: 'children',
								disabled: 'disabled',
							},
							clearable: true,
							filterable: true,
							'default-expand-all': true,
							'check-strictly': true,
						},
					},
					props: {
						labelWidth: '125',
					},
				})
			} else if (['text', 'number', 'integer'].includes(item.dataType)) {
				clUpsertOptions.items.push({
					label: item.fieldName,
					prop: item.fieldId,
					group: item.belongTab,
					component: {
						name: 'el-input',
						props: {
							disabled: item.fieldName === '资产编号',
						},
					},
					props: {
						labelWidth: '125',
					},
				})
			} else if (['joinTable'].includes(item.dataType) && item.joinTableMethod.includes('employee')) {
				clUpsertOptions.items.push({
					label: item.fieldName,
					prop: item.fieldId,
					group: item.belongTab,
					component: {
						name: 'el-autocomplete',
						props: {
							placeholder: `请输入${item.fieldName}`,
							'fetch-suggestions': employeeListStore.employeeList,
						},
					},
					props: {
						labelWidth: '125',
					},
				})
			} else if (['joinTable'].includes(item.dataType) && item.joinTableMethod.includes('department')) {
				clUpsertOptions.items.push({
					label: item.fieldName,
					prop: item.fieldId,
					group: item.belongTab,
					component: {
						name: 'el-tree-select',
						props: {
							data: departmentOptionsStore.departmentOptions,
							clearable: true,
							filterable: true,
							'check-strictly': true,
							'render-after-expand': false,
							'show-checkbox': true,
							'check-on-click-node': true,
							'default-expand-all': true,
						},
					},
					props: {
						labelWidth: '125',
					},
				})
			} else if (['joinTable'].includes(item.dataType) && item.joinTableMethod.includes('goodsSupplier')) {
				clUpsertOptions.items.push({
					label: item.fieldName,
					prop: item.fieldId,
					group: item.belongTab,
					component: {
						name: 'el-tree-select',
						props: {
							data: goodsSupplierStore.goodsSupplier,
							props: {
								label: 'supplierName',
								value: 'supplierName',
								children: 'children',
								disabled: 'disabled',
							},
							clearable: true,
							filterable: true,
							'default-expand-all': true,
							'check-strictly': true,
						},
					},
					props: {
						labelWidth: '125',
					},
				})
			} else if (['joinTable'].includes(item.dataType) && item.joinTableMethod.includes('assetsCategory')) {
				clUpsertOptions.items.push({
					label: item.fieldName,
					prop: item.fieldId,
					group: item.belongTab,
					value: '无形资产',
					component: {
						name: 'el-tree-select',
						props: {
							data: assetsCategoryStore.assetsCategory,
							props: {
								label: 'categoryName',
								value: 'categoryName',
								children: 'children',
								disabled: 'disabled',
							},
							clearable: true,
							filterable: true,
							'default-expand-all': true,
							'check-strictly': true,
						},
					},
					props: {
						labelWidth: '125',
					},
				})
			} else if (item.dataType === 'date') {
				clUpsertOptions.items.push({
					label: item.fieldName,
					prop: item.fieldId,
					group: item.belongTab,
					component: {
						name: 'el-date-picker',
						props: {
							placeholder: `请选择${item.fieldName}`,
							format: 'YYYY-MM-DD',
							'value-format': 'YYYY-MM-DD',
						},
					},
					props: {
						labelWidth: '125',
					},
				})
			}
		})
	})
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event)
}

// cl-upsert
const clUpsertOptions: any = reactive({
	items: [
		{
			type: 'tabs',
			props: {
				type: 'card',
				labels: [
					{
						label: '基础信息',
						value: 'baseData',
					},
					{
						label: '价值信息',
						value: 'valueData',
					},
					{
						label: '使用信息',
						value: 'useData',
					},
					{
						label: '入账信息',
						value: 'incomeData',
					},
					{
						label: '其他信息',
						value: 'otherData',
					},
					{
						label: '附属配件',
						value: 'accessoryData',
					},
				],
			},
		},
		{
			group: 'accessoryData',
			props: {
				labelWidth: '0 !important',
			},
			prop: 'op-btns',
			component: {
				name: 'slot-op-btns',
			},
		},
		{
			group: 'accessoryData',
			props: {
				labelWidth: '0 !important',
			},
			prop: 'accessory',
			component: {
				name: 'slot-accessory-list',
			},
		},
	],
})
const Upsert = useUpsert({
	...clUpsertOptions,

	dialog: {
		width: 950,
		draggable: true,
	},
	async onSubmit(params, { next, done }) {
		if (Upsert.value?.mode === 'update') {
			if (params.cnt > params.amount) {
				done()
				return ElMessage.error('余额不能大于总数')
			}

			next(params)
		} else if (Upsert.value?.mode === 'add') {
			next(params)
		}
	},
	// 详情钩子
	onInfo(data, { done }) {
		// 使用其他接口
		service.assets.immaterial.immaterialAssetsGoodsController.getImmaterialGoodsInfo({ id: data.id }).then((res) => {
			done(res)
		})
	},
})

// cl-table
const Table: any = useTable({
	columns: [
		{
			type: 'selection',
		},
		{
			type: 'index',
		},
	],
})

// cl-crud
const Crud = useCrud(
	{
		service: service.assets.immaterial.immaterialAssetsGoodsController,
		async onRefresh(params, { next, render }) {
			// 带上其他查询参数（分页查询）

			if (putStorageTime.value != null && putStorageTime.value.length > 0) {
				params['startCreateTime'] = dayjs(putStorageTime.value[0]).format('YYYY-MM-DD') // 入库日期（开始）
				params['endCreateTime'] = dayjs(putStorageTime.value[1]).format('YYYY-MM-DD') // 入库日期（结束）
			} else {
				params['startCreateTime'] = undefined // 入库日期（开始）
				params['endCreateTime'] = undefined // 入库日期（结束）
			}

			params['status'] = params['field14'] // 资产状态
			// params['field3'] = '000024' // 资产状态

			// 高级搜索
			// eslint-disable-next-line
			const { page, size, startCreateTime, endCreateTime, status, field14, keyWord, ...req } = params // 解构

			params['moreSearch'] = {
				// field41: params['field41'], // 资产名称
				// field44: '',
				// field3: '000024',
				...req,
			}

			// 在点击列排序的时候，这个moreSearch里面会加了一个排序的sort、order在里面，这会让后端SQL直接报错，如果有这两个东西在里面，得去掉这两个
			if (params['moreSearch'] != null && params['moreSearch'].sort != null) delete params['moreSearch'].sort
			if (params['moreSearch'] != null && params['moreSearch'].order != null) delete params['moreSearch'].order

			const { list } = await next(params)
			// 渲染数据
			render(list)
		},
		dict: {
			api: {
				page: 'getAllImmaterialGoodsListByPage',
				list: 'queryAll',
				add: 'addImmaterialGoodsInfo',
				update: 'updateImmaterialGoodsInfo',
				delete: 'deleteImmaterialGoodsInfo',
				info: 'getImmaterialGoodsInfo',
			},
		},
		onDelete(selection, { next }) {
			next({
				id: selection[0].id,
			})
		},
	},
	(app) => {
		app.refresh()
	},
)

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params)
}

// 导出
const exportColumns: any = ref([
	{
		prop: 'customContent',
		label: '供应商',
		hidden: false,
		orderNum: 0,
	},
])

const onExportData = () => {
	if (selectionChangeData.value.length === 0) {
		return ElMessage.info('请选择导出项')
	} else {
		selectionChangeData.value.forEach((item: any) => {
			Object.assign(item, {
				customContent: item.customNo,
			})
		})

		setTimeout(() => {
			Table.value.clearSelection()
		}, 0)

		return selectionChangeData.value
	}
}

// 高级搜索
const AdvSearchOptions: any = reactive({
	items: [],
	op: ['close', 'reset', 'search'],
})
const AdvSearch = useAdvSearch(AdvSearchOptions)

// 添加行
let idCheckArr: any[] = []
const addRow = (scope: any) => {
	let id = new Date().getTime()
	if (idCheckArr.includes(id)) id += 1000
	idCheckArr.push(id)
	scope['accessoryList'].push({ id: id, name: '', cnt: 1, sku: '', buyDate: dayjs(new Date()).format('YYYY-MM-DD'), price: '0.00', manufacturer: '' })
}
// 附属配件 表格选择事件
let accessoryDataSelections: any[] = []
const accessoryDataSelect = (selections: any[]) => {
	accessoryDataSelections = []
	if (selections != null && selections.length > 0) {
		for (let i = 0; i < selections.length; i++) {
			accessoryDataSelections.push(selections[i].id)
		}
	}
}
// 删除行
const deleteRow = (scope: any) => {
	if (accessoryDataSelections != null && accessoryDataSelections.length > 0 && scope['accessoryList'] != null && scope['accessoryList'].length > 0) {
		for (let i = 0; i < accessoryDataSelections.length; i++) {
			for (let k = 0; k < scope['accessoryList'].length; k++) {
				if (scope['accessoryList'][k]['id'] == accessoryDataSelections[i]) {
					scope['accessoryList'].splice(k, 1)
					break
				}
			}
		}
	}
}
</script>

<style lang="scss">
.upload__ {
	.cl-upload--file:not(.is-drag) .cl-upload__list {
		display: none;
	}
}

.el-dialog__header {
	border-bottom: 1px solid #f0f0f0;
	margin-right: 0;
}
.el-dialog__footer {
	border-top: 1px solid #f0f0f0;
}
.el-dialog__headerbtn {
	top: 0;
}
.info_dialog {
	.el-dialog__title {
		font-size: 14px;
		color: rgba(80, 80, 80, 1);
	}
}
.el-dialog--center .el-dialog__footer {
	text-align: right;
}

.el-form-item .el-form-item__label {
	// min-width: 125px !important;
	// width: auto !important;
	min-width: unset !important;
	justify-content: left;
}
.el-form-item__label {
	justify-content: left;
}
</style>

<style scoped lang="scss">
// 复制
.customNo_copy_icon {
	cursor: pointer;
}
.customNo_copy_icon:hover {
	color: var(--el-color-primary);
}
// 详情
.info_dialog_content {
	display: flex;
	flex-wrap: wrap;
	.content_item {
		width: 50%;
		display: flex;
		margin: 16px 0;
		.item_label {
			min-width: 110px;
		}
		.item_content {
			color: rgba(166, 166, 166, 1);
		}
	}
}
// 二维码
.QRcode_box {
	display: flex;
	flex-direction: column;
	align-items: center;
	h3 {
		color: rgba(80, 80, 80, 1);
		font-size: 14px;
	}
	.flag {
		width: 80px;
		height: 80px;
		background-color: pink;
		margin: 20px 0;
	}
	.code_info {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		.content_item {
			width: 50%;
			display: flex;
			margin: 16px 0;

			.item_label {
				min-width: 80px;
				margin-left: 50px;
			}
			.item_content {
				color: rgba(166, 166, 166, 1);
			}
		}
	}
}

.full-width {
	width: 100%;
}
</style>
