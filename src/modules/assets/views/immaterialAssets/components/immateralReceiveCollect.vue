<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 自定义列 -->
			<cl-column-custom :columns="custom" name="immateralReceiveCollect" />
			<!-- 生成领用汇总表 -->
			<el-button type="success" size="default" @click="handleAddDetails" v-permission="service.assets.summary.immaterialAssetsGetSummaryController.permission.add">生成领用汇总表</el-button>

			<cl-flex1 />

			<!-- 领用日期筛选 -->
			<div class="date_picker">
				<span style="font-size: 12px; margin-right: 10px">领用日期</span>
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
			<cl-search-key placeholder="搜索 资产名称/财厅编号" />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" @selection-change="selectionChange">
				<!-- 展开信息 -->
				<template #column-accessorylist="{ scope }">
					<div>
						<div v-if="scope.row.accessoryList != null && scope.row.accessoryList.length > 0">
							<div style="padding: 0 5%; margin: 12px 0 6px 0">
								<el-text>附属配件列表</el-text>
							</div>
							<el-table :data="scope.row.accessoryList" :stripe="true" :border="true" style="width: 90%; margin: 0 5% 12px 5%">
								<el-table-column label="配件名称" prop="name" header-align="center" />
								<el-table-column label="规格型号" prop="sku" header-align="center" />
								<el-table-column label="数量" prop="cnt" header-align="center" />
								<el-table-column label="购置日期" prop="buyDate" header-align="center" />
								<el-table-column label="原值(元)" prop="price" header-align="center" />
								<el-table-column label="生产厂商" prop="manufacturer" header-align="center" />
							</el-table>
						</div>
						<div v-if="scope.row.accessoryList == null || scope.row.accessoryList.length <= 0">
							<el-empty :image-size="72" description="暂无其他配件" />
						</div>
					</div>
				</template>
				<template #column-inventoryDate="{ scope }">
					{{ scope.row.inventoryDate?.slice(0, 10) }}
				</template>
				<template #column-op="{}"></template>
			</cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>
	</cl-crud>

	<!-- 生成领用汇总表 -->
	<cl-dialog title="生成领用汇总表" v-model="addDetailsDialog" width="30%" center draggable>
		<div style="padding-right: 40px">
			<el-form :model="form" label-width="120px" :rules="form.rules" ref="addDetailsFormDom">
				<el-form-item label="汇总表编号">
					<el-input :disabled="true" placeholder="汇总表编号由系统自动生成" />
				</el-form-item>
				<el-form-item label="汇总表名称" prop="name">
					<el-input v-model="form.name" placeholder="请输入汇总表名称" />
				</el-form-item>
				<el-form-item label="制表日期" prop="date">
					<el-date-picker v-model="form.date" type="date" placeholder="请选择制表日期" style="width: 100%" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
				</el-form-item>
				<el-form-item label="制表人">
					<el-autocomplete v-model="form.user" :fetch-suggestions="userListStore.userList" class="inline-input w-50" style="width: 100%" @select="handleSelect" />
				</el-form-item>
			</el-form>
		</div>
		<template #footer>
			<span>
				<el-button @click="addDetailsDialog = false">取消</el-button>
				<el-button type="primary" @click="handleSaveAddDetails">确定</el-button>
			</span>
		</template>
	</cl-dialog>
</template>
<script lang="ts" name="immateralReceiveCollect" setup>
import { useCrud, useTable } from '@cool-vue/crud'
import { useCool } from '/@/cool'
import { ref, reactive, onMounted } from 'vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'

import userList from '/@/modules/base/store/userList'

const { service } = useCool()
const userListStore = userList()

onMounted(() => {
	getColumns()
})

const putStorageTime: any = ref([]) // 领用日期
// 领用日期搜素
const handlePutStorageTime = () => {
	// if (putStorageTime.value == null) {
	// 	putStorageTime.value = []
	// 	refresh()
	// } else {
	// 	refresh()
	// }
}

const custom = ref()
const getColumns = () => {
	service.assets.immaterial.immaterialAssetsGoodsController.getTableFields().then((res) => {
		// 表格配置项
		res.forEach((item: { fieldId: any; fieldName: any; searchEnable: number; dataType: string }) => {
			const obj: any = {
				prop: item.fieldId,
				label: item.fieldName,
				hidden: false,
			}
			if (['date', 'number', 'integer'].includes(item.dataType)) {
				obj.sortable = 'asc'
			}
			if (item.dataType === 'date') {
				obj.formatter = (row: any) => {
					return row[item.fieldId] ? dayjs(row[item.fieldId]).format('YYYY-MM-DD') : ''
				}
			}

			Table.value?.columns.push(obj)
		})

		custom.value = Table.value?.columns // 给自定义列 数据
	})
}

// cl-table
const Table = useTable({
	defaultSort: {
		prop: 'sortOrder',
		order: 'ascending',
	},
	columns: [
		{
			label: '',
			type: 'selection',
			width: 40,
			fixed: 'left',
		},
		{
			label: '',
			type: 'index',
			fixed: 'left',
		},
		// 展开列
		{
			label: '',
			type: 'expand',
			prop: 'accessorylist',
			width: 40,
			fixed: 'left',
		},
		{
			label: '领用人',
			prop: 'detailUser',
		},
		{
			label: '领用日期',
			prop: 'detailDate',
			formatter(row) {
				return dayjs(row.detailDate).format('YYYY-MM-DD')
			},
		},
		{
			label: '操作',
			prop: 'op',
			width: 120,
			fixed: 'right',
		},
	],
})

// cl-crud
const Crud = useCrud(
	{
		service: service.assets.goodsReceive.goodsReceiveDocController,
		dict: {
			api: {
				page: 'getImmaterialReceiveGoodsListByPage',
			},
		},
		async onRefresh(params, { next, render }) {
			if (putStorageTime.value != null && putStorageTime.value.length > 0) {
				params['startTime'] = dayjs(putStorageTime.value[0]).format('YYYY-MM-DD') // 领用日期（开始）
				params['endTime'] = dayjs(putStorageTime.value[1]).format('YYYY-MM-DD') // 领用日期（结束）
			} else {
				params['startTime'] = undefined // 领用日期（开始）
				params['endTime'] = undefined // 领用日期（结束）
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

// 选择领用汇总项
const checkTableData = ref([])
const addDetailsDialog = ref(false)
const addDetailsFormDom = ref()
const form: any = reactive({
	name: '',
	date: dayjs(),
	user: '',
	rules: {
		name: [{ required: true, message: '请填写汇总表名称', trigger: 'blur' }],
		date: [{ required: true, message: '请选择领用日期', trigger: 'blur' }],
	},
	userInfo: {},
})
const selectionChange = (selection: any) => {
	checkTableData.value = selection
}
// 打开 生成领用汇总表 对话框
const handleAddDetails = () => {
	if (checkTableData.value.length === 0) return ElMessage.warning('请选择领用汇总项')
	addDetailsDialog.value = true
}
// 确定 生成领用汇总表
const handleSaveAddDetails = async () => {
	await addDetailsFormDom.value.validate()

	const goodsIds = checkTableData.value.map((item: any) => item.id)

	service.assets.summary.immaterialAssetsGetSummaryController
		.add({
			name: form.name,
			inventoryDate: form.date,
			personName: form.user,
			goodsIds: goodsIds,
			userId: form.user != null && form.userInfo != null && form.userInfo.value == form.user ? form.userInfo.id : '',
		})
		.then(() => {
			addDetailsDialog.value = false
			ElMessage.success('领用汇总表生成成功')
			form.name = ''
			form.date = dayjs()
			form.user = ''
			form.userInfo = {}
			Table.value?.clearSelection()
		})
}
const handleSelect = (item: any) => {
	form.user = item.value
	form.userInfo = item
}
</script>
