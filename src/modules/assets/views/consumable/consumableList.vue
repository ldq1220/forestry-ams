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
			<!-- <cl-column-custom :columns="Table?.columns" /> -->

			<div class="upload__">
				<!-- <cl-upload v-model="urls" multiple text="财厅数据表导入" :limit="1" type="file" accept=".xls,.xlsx" @success="onSuccess" /> -->
				<cl-upload
					v-model="urls"
					type="file"
					:show-file-list="false"
					:limit="1"
					:limit-upload="false"
					multiple="false"
					text="财厅数据表导入"
					accept=".xls,.xlsx"
					@success="onSuccess"
					:auto-upload="true"
				></cl-upload>
			</div>

			<cl-flex1 />

			<!-- 入库日期筛选 -->
			<div class="date_picker">
				<span style="font-size: 12px; margin-right: 10px">入库日期</span>
				<el-date-picker v-model="putStorageTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 220px" />
			</div>

			<!-- 资产状态筛选 -->
			<cl-filter label="资产状态">
				<!-- 配置props，选择后会自动过滤列表 -->
				<!-- <cl-select :options="options.status" prop="field14" /> -->
				<cl-select style="width: 120px" :options="options.status" prop="field14" />
			</cl-filter>

			<!-- 关键字搜索 -->
			<cl-search-key placeholder="搜索资产名称" />

			<!-- <cl-flex1 /> -->
			<!-- 高级搜索按钮 -->
			<cl-adv-btn />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table">
				<!-- 入库日期 -->
				<template #column-field19="{ scope }">
					{{ dayjs(scope.row.field19).format('YYYY-MM-DD') }}
				</template>
			</cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />

		<!-- 详情对话框 -->
		<div class="info_dialog">
			<cl-dialog v-model="infoDialog" title="固定资产详情" width="800" center>
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

<script lang="ts" name="consumableList" setup>
import { useCrud, useTable, useUpsert, useAdvSearch } from '@cool-vue/crud'
import { onMounted, reactive, ref, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { useCool } from '/@/cool'

const { service } = useCool()

const custom = ref() // 自定义列 数据
const urls = ref()
const immaterialAssetsInfo: any = reactive({
	baseData: [],
	valueData: [],
	useData: [],
	incomeData: [],
	otherData: [],
})
const activeName = ref('basics')
const infoDialog = ref(false)
const searchEnable: any = ref([]) // 高级搜索数据
const putStorageTime: any = ref([]) // 入库日期
// 资产状态
const options = reactive({
	status: [],
})
// 上传成功
function onSuccess<T extends { id: number }>(data: T) {
	service.assets.immaterial.immaterialAssetsGoodsController
		.import({
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
	getFixedStatusOption() // 获取资产状态列表

	// 监听自定义列的变化
	watch(custom, () => {
		Table.value.columns = custom.value
	})
})

// 新加的字段查询方法
const addOptionsNode = () => {
	service.assets.fixed.fieldCookieDataController?.getConsumableAssetsNewCustomFields().then((res) => {
		let assetsFixedGoods = JSON.parse(localStorage.getItem('column_custom_consumableAssetsGoods') as string) || []
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

			localStorage.setItem('column_custom_consumableAssetsGoods', JSON.stringify(assetsFixedGoods))
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
	service.assets.consumable.consumableAssetsGoodsController.getTableFields().then((res) => {
		// 表格配置项
		res.forEach((item: { fieldId: any; fieldName: any; searchEnable: number }) => {
			const obj = {
				prop: item.fieldId,
				label: item.fieldName,
				hidden: false,
			}
			addStyle(obj, item)
			Table.value.columns.push(obj)

			// 设置高级搜索数据
			if (item.searchEnable === 1) {
				searchEnable.value.push(item)
			}
		})

		custom.value = Table.value.columns // 给自定义列 数据

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
								service.assets.immaterial.immaterialAssetsGoodsController.getById({ id: scope.row.id }).then((res) => {
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
			} else if (item.searchEnable === 1 && ['text', 'number', 'integer', 'joinTable'].includes(item.dataType)) {
				AdvSearchOptions.items.push({
					label: item.fieldName,
					prop: item.fieldId,
					component: {
						name: 'el-input',
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
			} else if (['text', 'number', 'integer', 'joinTable'].includes(item.dataType) && item.fieldName !== '数量') {
				clUpsertOptions.items.push({
					label: item.fieldName,
					prop: item.fieldId,
					group: item.belongTab,
					component: {
						name: 'el-input',
					},
				})
			} else if (['text', 'number', 'integer', 'joinTable'].includes(item.dataType) && item.fieldName === '数量') {
				clUpsertOptions.items.push({
					// label: item.fieldName,
					label: '数量',
					prop: item.fieldId,
					group: item.belongTab,
					component: {
						name: 'el-input',
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
				})
			}
		})
	})
}

// 获取资产状态列表
const getFixedStatusOption = () => {
	service.assets.fixed.assetsFixedGoodsController.getFixedAssetsStatusLabel().then((res) => {
		options.status = res
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
				],
			},
		},
	],
})
const Upsert = useUpsert({
	...clUpsertOptions,
	async onSubmit(params, { next, done }) {
		if (Upsert.value?.mode === 'update') {
			if (params.cnt > params.amount) {
				done()
				return ElMessage.error('余额不能大于总数')
			}
			next(params)
		} else {
			next(params)
		}
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
		service: service.assets.consumable.consumableAssetsGoodsController,
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
			const { page, size, startCreateTime, endCreateTime, status, field14,keyWord, ...req } = params // 解构

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
				delete: 'deleteById',
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

// 高级搜索
const AdvSearchOptions: any = reactive({
	items: [],
	op: ['close', 'reset', 'search'],
})
const AdvSearch = useAdvSearch(AdvSearchOptions)
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

.el-form-item__label {
	min-width: 125px !important;
	// width: auto !important;
}
.el-form-item__label {
	justify-content: left;
}
</style>

<style scoped lang="scss">
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
</style>
