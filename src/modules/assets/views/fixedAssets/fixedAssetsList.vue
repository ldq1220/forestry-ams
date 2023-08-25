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

			<div class="date_picker">
				<span style="font-size: 12px; margin-right: 10px">入库日期</span>
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

			<!-- 资产状态筛选 -->
			<cl-filter label="资产状态">
				<!-- 配置props，选择后会自动过滤列表 -->
				<!-- <cl-select :options="options.status" prop="field14" /> -->
				<cl-select :options="options.status" prop="field14" />
			</cl-filter>

			<!-- 关键字搜索 -->
			<cl-search-key placeholder="请输入资产名名称" field="field41" />

			<!-- <cl-flex1 /> -->
			<!-- 高级搜索按钮 -->
			<cl-adv-btn />
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

		<!-- 详情对话框 -->
		<div class="info_dialog">
			<cl-dialog v-model="infoDialog" title="固定资产详情" width="800" center>
				<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
					<el-tab-pane label="基础信息" name="basics">
						<div class="info_dialog_content">
							<div class="content_item" v-for="(item, index) in fixedAssetsInfo.baseData" :key="index">
								<div class="item_label">{{ item.label }}</div>
								<div class="item_content">{{ item.value }}</div>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="价值信息" name="value">
						<div class="info_dialog_content">
							<div class="content_item" v-for="(item, index) in fixedAssetsInfo.valueData" :key="index">
								<div class="item_label">{{ item.label }}</div>
								<div class="item_content">{{ item.value }}</div>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="使用信息" name="use">
						<div class="info_dialog_content">
							<div class="content_item" v-for="(item, index) in fixedAssetsInfo.useData" :key="index">
								<div class="item_label">{{ item.label }}</div>
								<div class="item_content">{{ item.value }}</div>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="入账信息" name="enterAccount">
						<div class="info_dialog_content">
							<div class="content_item" v-for="(item, index) in fixedAssetsInfo.incomeData" :key="index">
								<div class="item_label">{{ item.label }}</div>
								<div class="item_content">{{ item.value }}</div>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="其他信息" name="else">
						<div class="info_dialog_content">
							<div class="content_item" v-for="(item, index) in fixedAssetsInfo.otherData" :key="index">
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

		<!-- 二维码标签对话框 -->
		<cl-dialog v-model="QRCdoeDialog" title="固定资产二维码标签" width="600" center>
			<div class="QRcode_box">
				<h3>广东省林业调查规划院</h3>
				<div class="flag"></div>
				<img src="" alt="" />
				<div class="code_info">
					<div class="content_item">
						<div class="item_label">编号</div>
						<div class="item_content">Y-201006-00005</div>
					</div>
					<div class="content_item">
						<div class="item_label">资产名称</div>
						<div class="item_content">Y-201006-00005</div>
					</div>
					<div class="content_item">
						<div class="item_label">使用部门</div>
						<div class="item_content">后勤服务科</div>
					</div>
					<div class="content_item">
						<div class="item_label">使用部门</div>
						<div class="item_content">后勤服务科</div>
					</div>
				</div>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="QRCdoeDialog = false">打印</el-button>
				</span>
			</template>
		</cl-dialog>

		<!-- 高级搜索 -->
		<cl-adv-search ref="AdvSearch">
			<template #slot-name="{ scope }">
				<el-input v-model="scope.name" />
			</template>
		</cl-adv-search>
	</cl-crud>
</template>

<script lang="ts" name="fixedAssetsList" setup>
import { useCrud, useTable, useUpsert, useAdvSearch } from '@cool-vue/crud'
import { useCool } from '/@/cool'
import { onMounted, reactive, ref, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
// import advSearchOrUpdateTree from './commponents/advSearchOrUpdateTree.vue'
import useAdvSearchStore from '/@/modules/base/store/advSearch'

const { service } = useCool()
const advSearchStore = useAdvSearchStore()

const custom = ref() // 自定义列 数据
const urls = ref()
const fixedAssetsInfo: any = reactive({
	baseData: [],
	valueData: [],
	useData: [],
	incomeData: [],
	otherData: [],
})
const activeName = ref('basics')
const infoDialog = ref(false)
const QRCdoeDialog = ref(false)
const searchEnable: any = ref([]) // 高级搜索数据
const putStorageTime: any = ref([]) // 入库日期
// 资产状态
const options = reactive({
	status: [
		{
			label: '闲置',
			value: 0,
			children: [
				{ label: '闲置1', value: 0 },
				{ label: '闲置2', value: 2 },
			],
		},
		{
			label: '闲置333',
			value: 0,
			children: [
				{ label: '闲置1', value: 0 },
				{ label: '闲置2', value: 2 },
			],
		},
	],
})
// 上传成功
function onSuccess<T extends { id: number }>(data: T) {
	// console.log(data.url)
	service.assets.fixed.assetsFixedGoodsController
		.import({
			// @ts-ignore
			filePath: data.url,
		})
		.then((res) => {
			console.log(res)

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
	service.assets.fixed.fieldCookieDataController?.getFixedAssetsNewCustomFields().then((res) => {
		let assetsFixedGoods = JSON.parse(localStorage.getItem('column-custom__assetsFixedGoods') as string)
		if (res.length > 0 && assetsFixedGoods.length > 0) {
			let lebelArr: any = []
			assetsFixedGoods.forEach((item: { label: any }) => {
				lebelArr.push(item.label)
			})
			res.forEach((item: { label: any }) => {
				if (lebelArr.indexOf(item.label) == -1) {
					assetsFixedGoods.push(item)
				}
			})

			localStorage.setItem('column-custom__assetsFixedGoods', JSON.stringify(assetsFixedGoods))
			// console.log(assetsFixedGoods)
		}
	})
}

// 获取表格显示字段 && 高级搜索 && 编辑form表单
const getColumns = () => {
	service.assets.fixed.assetsFixedGoodsController.getTableFields().then((res) => {
		// 表格配置项
		res.forEach((item: { fieldId: any; fieldName: any; searchEnable: number }) => {
			const obj = {
				prop: item.fieldId,
				label: item.fieldName,
				hidden: false,
			}
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
				width: 340,
				// @ts-ignore
				buttons({ scope }) {
					return [
						'edit',
						{
							label: '详情',
							type: 'info',
							onClick() {
								service.assets.fixed.assetsFixedGoodsController.getById({ id: scope.row.id }).then((res) => {
									Object.assign(fixedAssetsInfo, res)
									console.log(fixedAssetsInfo)
								})

								infoDialog.value = true
							},
						},
						'delete',
						{
							label: '二维码标签',
							type: 'info',
							onClick({}) {
								// ElMessage.success(scope.row.name + '正常')
								QRCdoeDialog.value = true
							},
						},
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
					// component: {
					// 	vm: advSearchOrUpdateTree,
					// 	props: {
					// 		treeData: item.optionList,
					// 		fieldId: item.fieldId,
					// 		page: 'fixedAssetsListAdvSearchAdvSearch',
					// 		type: 'adeSearch',
					// 	},
					// },
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
			} else if (item.searchEnable === 1 && ['text', 'number', 'interger', 'joinTable'].includes(item.dataType)) {
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
			} else if (['text', 'number', 'interger', 'joinTable'].includes(item.dataType)) {
				clUpsertOptions.items.push({
					label: item.fieldName,
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

	// 详情钩子
	// onInfo(data, { next, done }) {
	// 继续请求 info 接口，可以带其他自定义参数
	// next({
	// 	id: data.id,
	//	status: 1
	// });

	// 使用其他接口
	// service.demo.goods.info({ id: data.id }).then((res) => {
	// 	done(res);
	// });
	// console.log(data, custom.value)

	// 直接取列表的数据返回
	// done(data)
	// },
})

// cl-table
const Table: any = useTable({
	columns: [
		// {
		// 	prop: 'field1',
		// 	label: '所属单位',
		// 	// hidden: false,
		// 	orderNum: 0,
		// },
		// {
		// 	prop: 'field3',
		// 	label: '资产编号',
		// 	// hidden: false,
		// 	orderNum: 0,
		// },
		// {
		// 	prop: 'field5',
		// 	label: '取得日期',
		// 	orderNum: 0,
		// },
		// {
		// 	prop: 'field12',
		// 	label: '资产状态',
		// 	orderNum: 0,
		// },
		// {
		// 	type: 'op',
		// 	width: 200,
		// 	hidden: false,
		// 	buttons: ['info', 'edit', 'delete'],
		// },
	],
})

// cl-crud
const Crud = useCrud(
	{
		service: service.assets.fixed.assetsFixedGoodsController,
		async onRefresh(params, { next, render }) {
			// 带上其他查询参数（分页查询）
			// console.log(putStorageTime.value, putStorageTime.value.length > 0)
			console.log(advSearchStore.searchData.fixedAssetsListAdvSearch)

			if (putStorageTime.value.length > 0) {
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
			const { page, size, startCreateTime, endCreateTime, status, field14, ...req } = params // 解构

			params['moreSearch'] = {
				// field41: params['field41'], // 资产名称
				// field44: '',
				// field3: '000024',
				...req,
			}
			if (advSearchStore.searchData.fixedAssetsListAdvSearch) {
				for (const key in advSearchStore.searchData.fixedAssetsListAdvSearch) {
					params['moreSearch'][key] = advSearchStore.searchData.fixedAssetsListAdvSearch[key]
				}
			}

			console.log(params, req)

			// console.log(params)
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
function refresh(params?: any) {
	Crud.value?.refresh(params)
}

// 入库日期搜素
const handlePutStorageTime = () => {
	if (putStorageTime.value == null) {
		putStorageTime.value = []
		refresh()
	} else {
		refresh()
	}
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
