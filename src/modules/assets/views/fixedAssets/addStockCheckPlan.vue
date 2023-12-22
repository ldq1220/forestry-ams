<template>
	<!-- 创建 盘点计划 -->
	<div class="not_finished">
		<span>修改未结束盘点计划</span>
		<el-tooltip content="对未结束的盘点计划进行修改" placement="top">
			<el-select v-model="routeParamsLabel" filterable placeholder="对未结束的盘点计划进行修改" style="width: 240px" @change="selectIncompleteRecord">
				<el-option v-for="item in incompleteRecords" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</el-tooltip>
	</div>

	<div class="form_box">
		<div class="form_title">创建盘点计划</div>
		<el-form :model="docInfoForm" :inline="true">
			<el-row>
				<el-form-item label="盘点编号">
					<el-input v-model="docInfoForm.inventoryNo" placeholder="由系统自动生成" disabled />
				</el-form-item>

				<el-form-item label="单位会计科目">
					<el-select v-model="docInfoForm.subject" placeholder="选择单位会计科目" disabled style="width: 192px">
						<el-option v-for="item in subjectList" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>

				<el-form-item label="计划名称">
					<el-input v-model="docInfoForm.planName" placeholder="请填写 计划名称" />
				</el-form-item>
			</el-row>

			<el-row>
				<el-form-item label="盘点负责人">
					<el-autocomplete v-model="docInfoForm.personName" :fetch-suggestions="userListStore.userList" placeholder="请选择" @select="handleSelect" />
				</el-form-item>

				<el-form-item label="盘点基准日期">
					<el-date-picker v-model="docInfoForm.baseDate" type="date" placeholder="请选择" format="YYYY-MM-DD" value-format="YYYY-MM-DD" style="width: 192px" />
				</el-form-item>

				<el-form-item label="盘点开始日期">
					<el-date-picker v-model="docInfoForm.startDate" type="date" placeholder="请选择" format="YYYY-MM-DD" value-format="YYYY-MM-DD" style="width: 192px" />
				</el-form-item>
			</el-row>

			<el-row>
				<el-form-item label="盘点结束日期">
					<el-date-picker v-model="docInfoForm.endDate" type="date" placeholder="请选择" format="YYYY-MM-DD" value-format="YYYY-MM-DD" style="width: 192px" />
				</el-form-item>

				<el-form-item label="盘点范围">
					<el-tree-select
						v-model="docInfoForm.range"
						:data="deptData"
						check-strictly
						filterable
						show-checkbox
						:render-after-expand="true"
						:check-on-click-node="true"
						:multiple="false"
						style="width: 192px"
					/>
				</el-form-item>

				<el-form-item label="存放地点">
					<el-input v-model="docInfoForm.storagePlace" placeholder="请填写 存放地点" />
				</el-form-item>
			</el-row>

			<!-- 物品清单 -->
			<div class="details">
				<div class="details_title">盘点清单</div>
				<div class="btns">
					<i style="display: inline-block; width: 40px"></i>
					<el-button @click="openAddDialog" type="primary" :icon="Plus">添加</el-button>
					<el-button @click="deleteSelections" type="danger" :icon="Delete">批量删除</el-button>
				</div>
			</div>
			<br />

			<el-table :data="goodsList" :stripe="true" :border="true" @selection-change="handleSelectionChange" style="width: 100%" :header-cell-style="{ backgroundColor: '#F5F5F5' }">
				<el-table-column type="selection" width="30" />
				<el-table-column type="index" align="center" />
				<el-table-column prop="goodsName" label="资产名称" header-align="center" align="center">
					<template #default="scope">
						<el-text v-if="docInfoForm.subject == '固定资产'">{{ scope.row.field41 }}</el-text>
						<el-text v-if="docInfoForm.subject == '无形资产'">{{ scope.row.field3 }}</el-text>
						<el-text v-if="docInfoForm.subject == '易耗品'">{{ scope.row.field3 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="customNo" label="资产编号" header-align="center" align="center" />
				<el-table-column prop="sku" label="规格型号" header-align="center" align="center">
					<template #default="scope">
						<el-text v-if="docInfoForm.subject == '固定资产'">{{ scope.row.field78 }}</el-text>
						<el-text v-if="docInfoForm.subject == '无形资产'"></el-text>
						<el-text v-if="docInfoForm.subject == '易耗品'">{{ scope.row.field20 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="assetsStatus" label="资产状态" header-align="center" width="200" align="center">
					<template #default="scope">
						<el-text v-if="docInfoForm.subject == '固定资产'">{{ scope.row.field12 }}</el-text>
						<el-text v-if="docInfoForm.subject == '无形资产'">{{ scope.row.field14 }}</el-text>
						<el-text v-if="docInfoForm.subject == '易耗品'">{{ scope.row.field6 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="cnt" label="数量" header-align="center" width="200" align="center">
					<template #default="scope">
						<el-text v-if="docInfoForm.subject == '固定资产'">{{ scope.row.surplusCnt }}</el-text>
						<el-text v-if="docInfoForm.subject == '无形资产'">{{ scope.row.surplusCnt }}</el-text>
						<el-text v-if="docInfoForm.subject == '易耗品'">{{ scope.row.surplusCnt }}</el-text>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="" width="120" header-align="center" align="center">
					<template #default="scope">
						<el-button link type="danger" size="small" @click="deleteGoodsFromList(scope.$index)">删除</el-button>
					</template>
				</el-table-column>

				<template #empty>
					<el-empty />
				</template>
			</el-table>

			<!-- 保存 -->
			<el-row class="save_btns">
				<cl-flex1 />
				<el-button @click="resetForm" style="width: 120px" :icon="RefreshRight">重置</el-button>
				<el-button type="success" @click="save(0)" style="width: 120px" :icon="Check">创建盘点</el-button>
			</el-row>
		</el-form>
	</div>

	<!-- 物品清单 添加 -->
	<cl-dialog v-model="addDialog" title="资产选择" center draggable width="950">
		<!-- 筛选条件 -->
		<cl-row>
			<div class="date_picker">
				<span style="display: inline-block; margin-right: 12px">入库日期</span>
				<el-date-picker v-model="putStorageTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 240px" />
			</div>
			<cl-flex1 />
			<el-input v-model="goodsSearParams.keyWord" placeholder="搜索 资产名称/编号" :prefix-icon="Search" style="width: 250px; margin-right: 12px" />
			<el-button type="warning" @click="page">搜索</el-button>
		</cl-row>
		<br />
		<!-- 数据列表 -->
		<cl-row>
			<el-table
				:data="fixedAssetsGoodsPage"
				stripe
				style="width: 100%"
				height="450"
				@sort-change="handleAddDialogSortChange"
				@select="handleAddDialogSelect"
				@select-all="handleAddDialogSelectAll"
				ref="multipleTableRef"
			>
				<el-table-column type="selection" width="30" />
				<el-table-column type="index" />
				<el-table-column prop="goodsName" label="资产名称" header-align="center">
					<template #default="scope">
						<el-text v-if="docInfoForm.subject == '固定资产'">{{ scope.row.field41 }}</el-text>
						<el-text v-if="docInfoForm.subject == '无形资产'">{{ scope.row.field3 }}</el-text>
						<el-text v-if="docInfoForm.subject == '易耗品'">{{ scope.row.field3 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="customNo" label="资产编号" header-align="center" />
				<el-table-column prop="sku" label="规格型号" header-align="center">
					<template #default="scope">
						<el-text v-if="docInfoForm.subject == '固定资产'">{{ scope.row.field78 }}</el-text>
						<el-text v-if="docInfoForm.subject == '无形资产'"></el-text>
						<el-text v-if="docInfoForm.subject == '易耗品'">{{ scope.row.field20 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="assetsStatus" label="资产状态" header-align="center" width="200">
					<template #default="scope">
						<el-text v-if="docInfoForm.subject == '固定资产'">{{ scope.row.field12 }}</el-text>
						<el-text v-if="docInfoForm.subject == '无形资产'">{{ scope.row.field14 }}</el-text>
						<el-text v-if="docInfoForm.subject == '易耗品'">{{ scope.row.field6 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="cnt" label="数量" header-align="center" width="200">
					<template #default="scope">
						<el-text v-if="docInfoForm.subject == '固定资产'">{{ scope.row.surplusCnt }}</el-text>
						<el-text v-if="docInfoForm.subject == '无形资产'">{{ scope.row.surplusCnt }}</el-text>
						<el-text v-if="docInfoForm.subject == '易耗品'">{{ scope.row.surplusCnt }}</el-text>
					</template>
				</el-table-column>
				<template #empty>
					<el-empty />
				</template>
			</el-table>
		</cl-row>
		<br />
		<!-- 分页条 -->
		<cl-row>
			<cl-flex1 />
			<el-pagination
				v-model:current-page="tablePager.page"
				v-model:page-size="tablePager.size"
				:page-sizes="[20, 50, 100]"
				layout="total, sizes, prev, pager, next, jumper"
				:total="tablePager.total"
				@size-change="handlePagerSizeChange"
				@current-change="handlePagerSelectChange"
			/>
		</cl-row>
		<br />
		<cl-row>
			<cl-flex1 />
			<el-button @click="closeAddDialog" style="width: 100px">取消</el-button>
			<el-button type="success" @click="addToGoodsList" style="width: 150px">{{ okText }}</el-button>
		</cl-row>
	</cl-dialog>
</template>

<script lang="ts" name="fixedAssetsReceivePage" setup>
import { onMounted, ref } from 'vue'
import { useCool } from '/@/cool'
import dayjs from 'dayjs'

import userList from '/@/modules/base/store/userList'
import { ElTable, ElMessage } from 'element-plus'
import { Plus, Delete, Check, RefreshRight, Search } from '@element-plus/icons-vue'

const { service, router } = useCool()
const userListStore = userList()
// 单位会计科目 选项数据
const subjectList = ref([
	{
		label: '固定资产',
		value: '固定资产',
	},
	{
		label: '无形资产',
		value: '无形资产',
	},
	{
		label: '易耗品',
		value: '易耗品',
	},
])
// 盘点计划  基础信息
const docInfoForm = ref({
	// 盘点(计划)编号
	inventoryNo: '',
	// 单位会计科目
	subject: '',
	// 盘点计划名称
	planName: '',
	// 盘点负责人（姓名）
	personName: '',
	// 盘点负责人（ID）
	personId: '',
	// 盘点基准日期  -- 默认当前时间
	baseDate: dayjs().format('YYYY-MM-DD'),
	// 盘点开始日期  -- 默认当前时间
	startDate: dayjs().format('YYYY-MM-DD'),
	// 盘点结束日期  -- 默认当前时间 + 1天
	endDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
	// 盘点范围
	range: '',
	// 存放地点
	storagePlace: '',
	//
	personInfo: {
		id: '',
		value: '',
	},
})
// 部门选项 数据
const deptData = ref()

onMounted(() => {
	// 从url中获取部分参数
	getParamsFromUrl()
	getIncompleteRecords()
	// 部门数据
	service.base.sys.department.list().then((res) => {
		// 把数据格式转化成树形的
		deptData.value = formatToTreeData(res)
	})
	// 加载 盘点清单 可选数据
	loadStockCheckGoodsListData()
})

const routeParamsId = ref()
const routeParamsLabel = ref()
const incompleteRecords: any = ref([])
// 从url中获取要修改的ID
const getParamsFromUrl = () => {
	const url = location.href
	if (url != null && url.indexOf('?') != -1) {
		const params = url.split('?')[1]
		if (params != null && params != '') {
			const arr = params.split('&')
			if (arr != null && arr.length > 0) {
				for (let i = 0; i < arr.length; i++) {
					// 获取dataType参数
					if (arr[i].indexOf('dataType=') != -1) {
						let dataType = arr[i].replaceAll('dataType=', '').trim()
						if (dataType == 'fixed') dataType = '固定资产'
						if (dataType == 'immaterial') dataType = '无形资产'
						if (dataType == 'consumable') dataType = '易耗品'
						// // 可能要转码，不然中文的码不对
						docInfoForm.value.subject = dataType
						continue
					} else if (arr[i].indexOf('id=') != -1) {
						let id = arr[i].replaceAll('id=', '').trim()
						routeParamsId.value = id
					}
				}
			}
		}
	}
}

// 获取未结束的数据
const getIncompleteRecords = () => {
	service.assets.stockCheck.stockCheckController
		.getIncompleteRecords({
			dataType: docInfoForm.value.subject,
		})
		.then((resp) => {
			if (resp != null && resp.data != null && resp.data.length > 0) {
				const curUpdateId = routeParamsId.value
				let curUpdateItemLabel = ''
				for (let i = 0; i < resp.data.length; i++) {
					incompleteRecords.value.push({
						label: resp.data[i].planName,
						value: resp.data[i].id,
					})
					if (curUpdateId != null && curUpdateId != '' && resp.data[i].id == curUpdateId) {
						curUpdateItemLabel = resp.data[i].planName
					}
				}

				// 如果是url带着参数（要修改的id）过来的
				if (curUpdateItemLabel != null && curUpdateItemLabel != '') {
					routeParamsLabel.value = curUpdateItemLabel
					selectIncompleteRecord(curUpdateId)
				}
			}
		})
}
// 选择未完成的领用单进行修改
const selectIncompleteRecord = (value: any) => {
	routeParamsId.value = value
	service.assets.stockCheck.stockCheckController
		.getById({
			id: value,
			dataType: docInfoForm.value.subject,
		})
		.then((resp) => {
			if (resp != null) {
				if (resp.status == null || parseInt(resp.status) == 0) {
					docInfoForm.value.inventoryNo = resp.inventoryNo ? resp.inventoryNo : ''
					docInfoForm.value.subject = resp.subject ? resp.subject : ''
					docInfoForm.value.planName = resp.planName ? resp.planName : ''
					docInfoForm.value.personName = resp.personName ? resp.personName : ''
					docInfoForm.value.personId = resp.personId ? resp.personId : ''
					docInfoForm.value.baseDate = resp.baseDate ? resp.baseDate : ''
					docInfoForm.value.startDate = resp.startDate ? resp.startDate : ''
					docInfoForm.value.endDate = resp.endDate ? resp.endDate : ''
					docInfoForm.value.range = resp.range ? resp.range : ''
					docInfoForm.value.storagePlace = resp.storagePlace ? resp.storagePlace : ''
					if (resp.personId) {
						docInfoForm.value.personInfo.id = resp.personId
						docInfoForm.value.personInfo.value = resp.personName
					}

					// 资产清单
					if (resp.goodsList != null && resp.goodsList.length > 0) {
						// 加载到列表
						goodsList.value = resp.goodsList
					}
				} else {
					routeParamsId.value = ''
					routeParamsLabel.value = ''
				}
			} else {
				routeParamsId.value = ''
				routeParamsLabel.value = ''
			}
		})
}
/** 通过选择写入到输入框 */
const handleSelect = (item: any) => {
	docInfoForm.value.personName = item.value
	docInfoForm.value.personInfo = item
}
// 格式化数据
const formatToTreeData = (list: any) => {
	let arr = []
	if (list != null && list.length > 0) {
		for (let i = 0; i < list.length; i++) {
			if (list[i].parentId == null || list[i].parentId == '') {
				getChildren(list[i], list)
				arr.push({
					label: list[i].name,
					value: list[i].name,
					children: list[i].children,
				})
			}
		}
	}
	return arr
}
// 找到下级
const getChildren = (item: any, list: any) => {
	if (list != null && list.length > 0) {
		for (let i = 0; i < list.length; i++) {
			if (list[i].parentId != null && list[i].parentId == item.id) {
				getChildren(list[i], list)
				if (item.children == null) item.children = []
				item.children.push({
					label: list[i].name,
					value: list[i].name,
					children: list[i].children,
				})
			}
		}
	}
}
// 加载 盘点清单 可选数据
const loadStockCheckGoodsListData = () => {
	if (docInfoForm.value.subject != null && docInfoForm.value.subject == '固定资产') {
		service.assets.pushStorageDoc.pushStorageDocController
			.getFixedStorageGoodsList({
				dataType: '盘点',
			})
			.then((resp: any) => {
				if (resp != null && resp.length > 0) {
					fixedAssetsGoodsList.value = resp
					tablePager.value.total = resp.length
					// 调用分页
					page()
				}
			})
	} else if (docInfoForm.value.subject != null && docInfoForm.value.subject == '无形资产') {
		service.assets.pushStorageDoc.pushStorageDocController
			.getImmaterialStorageGoodsList({
				dataType: '盘点',
			})
			.then((resp: any) => {
				if (resp != null && resp.length > 0) {
					fixedAssetsGoodsList.value = resp
					tablePager.value.total = resp.length
					// 调用分页
					page()
				}
			})
	} else if (docInfoForm.value.subject != null && docInfoForm.value.subject == '易耗品') {
		service.assets.pushStorageDoc.pushStorageDocController
			.getConsumableStorageGoodsList({
				dataType: '盘点',
			})
			.then((resp: any) => {
				if (resp != null && resp.length > 0) {
					fixedAssetsGoodsList.value = resp
					tablePager.value.total = resp.length
					// 调用分页
					page()
				}
			})
	}
}

// 物品清单 列表数据
let goodsList: any = ref([])

const addDialog = ref(false)

const putStorageTime: any = ref([])

const defaultOkText = '确认选择'
const okText = ref(defaultOkText)
// 搜索关键词
const goodsSearParams = ref({
	keyWord: '',
})
// 分页参数
const tablePager = ref({
	page: 1,
	size: 20,
	total: 0,
	begin: 0,
	end: 0,
})
const handlePagerSizeChange = (val: number) => {
	tablePager.value.size = val
	page()
}
const handlePagerSelectChange = (val: number) => {
	tablePager.value.page = val
	page()
}
// 数据分页
let fixedAssetsGoodsList: any = ref([])
let fixedAssetsGoodsPage: any = ref([])
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const page = () => {
	// 分页参数

	const tableDataList = filterData()

	const pager = tablePager.value
	getBegin()
	getEnd()
	let begin: number = pager.begin < pager.total ? pager.begin : 0
	fixedAssetsGoodsPage.value = []

	for (begin; begin < (pager.end < pager.total ? pager.end : pager.total); begin++) {
		fixedAssetsGoodsPage.value.push(tableDataList[begin])
	}
	// 把已选的勾上
	checkDefault()
}
const checkDefault = () => {
	if (addDialogSelections.value != null && addDialogSelections.value.length > 0) {
		const idCheck = fixedAssetsGoodsPage.value.map((item: any) => item.id)
		// 这里得加点延迟，不然会出现没有勾选的情况。。。
		setTimeout(() => {
			for (let i = 0; i < addDialogSelections.value.length; i++) {
				const row = addDialogSelections.value[i]
				if (row != null && row.id != null && idCheck.includes(row.id)) {
					multipleTableRef.value!.toggleRowSelection(row, true)
				}
			}
		}, 500)
	}
}
// 数据过滤
const filterData = () => {
	// 搜索参数
	// 入库时间
	const startTime = putStorageTime.value != null && putStorageTime.value.length > 0 ? dayjs(putStorageTime.value[0]).format('YYYY-MM-DD') : null
	const endTime = putStorageTime.value != null && putStorageTime.value.length > 1 ? dayjs(putStorageTime.value[1]).format('YYYY-MM-DD') : null
	// 关键词
	const keyWord = goodsSearParams.value.keyWord

	// 因为要支持搜索，所以这里不能直接使用原始数据
	let tableDataList = fixedAssetsGoodsList.value
	if ((startTime != null && startTime != '') || (endTime != null && endTime != '') || (keyWord != null && keyWord != '')) {
		// 搜索
		tableDataList = tableDataList.filter((item: any) => {
			let check = true
			let timeText = null

			if (keyWord != null && keyWord != '') {
				// 关键词 搜索：资产名称、财厅编号
				let name = '',
					CTNo = item['customNo'] != null && item['customNo'] != '' ? item['customNo'] : '',
					timeText = null
				if (docInfoForm.value.subject == '固定资产') {
					name = item['field41'] != null && item['field41'] != '' ? item['field41'] : ''
					timeText = item['field55'] != null && item['field55'] != '' ? item['field55'] : ''
				} else if (docInfoForm.value.subject == '无形资产') {
					name = item['field3'] != null && item['field3'] != '' ? item['field3'] : ''
					timeText = ''
				} else if (docInfoForm.value.subject == '易耗品') {
					name = item['field3'] != null && item['field3'] != '' ? item['field3'] : ''
					timeText = item['field19'] != null && item['field19'] != '' ? item['field19'] : ''
				}
				if (!((name != null && name.toLowerCase().indexOf(keyWord.toLowerCase()) != -1) || (CTNo != null && CTNo.toLowerCase().indexOf(keyWord.toLowerCase()) != -1))) {
					check = false
				}
			}

			// 入库日期
			let curDate = null
			if (startTime != null && startTime != '') {
				// 如果没转成date类型，先转成date类型
				if (curDate == null && timeText != null && timeText != '') curDate = dayjs(timeText)
				const d = dayjs(startTime)
				if (d == null || curDate == null || d.valueOf() > curDate.valueOf()) {
					check = false
				}
			}
			if (endTime != null && endTime != '') {
				// 如果没转成date类型，先转成date类型
				if (curDate == null && timeText != null && timeText != '') curDate = dayjs(timeText)
				const d = dayjs(endTime)
				if (d == null || curDate == null || d.valueOf() < curDate.valueOf()) {
					check = false
				}
			}

			return check
		})
	}
	tablePager.value.total = tableDataList.length
	return tableDataList
}
const getBegin = () => {
	const pager = tablePager.value
	if (pager.page <= 0) pager.page = 1
	pager.begin = (pager.page - 1) * pager.size
}
const getEnd = () => {
	const pager = tablePager.value
	pager.end = pager.page * pager.size
}
// 排序
const handleAddDialogSortChange = (column: any) => {
	let { prop, order } = column
	// 先清掉当前页的数据
	fixedAssetsGoodsPage.value = []
	// 排序
	if (prop == null || prop == '') prop = 'id'
	if (order == null || order == '') order = 'ascending'
	fixedAssetsGoodsList.value.sort((a: any, b: any) => {
		if (order == 'descending') return (b[prop] == null ? '' : b[prop].toString()).localeCompare(a[prop] == null ? '' : a[prop].toString())
		return (a[prop] == null ? '' : a[prop].toString()).localeCompare(b[prop] == null ? '' : b[prop].toString())
	})
	// 取分页数据
	page()
}
// 选择事件
// 保存选择的数据
const addDialogSelections: any = ref([])
const handleAddDialogSelect = (selections: any, row: any) => {
	// 如果row在selections里面，checkbox是选中状态，反之则反
	// 所以只要检查一下row在不在selections里，就可以确定，他是要添加还是要删除
	let check = false
	if (selections != null && selections.length > 0) {
		for (let i = 0; i < selections.length; i++) {
			if (row['id'] != null && selections[i]['id'] != null && row['id'] == selections[i]['id']) {
				check = true
				break
			}
		}
	}
	if (check) {
		// 添加
		const check = addDialogSelections.value.map((item: any) => item.id)
		if (!check.includes(row.id)) addDialogSelections.value.push(row)
	} else {
		// 删除
		for (let i = 0; i < addDialogSelections.value.length; i++) {
			if (row['id'] != null && addDialogSelections.value[i]['id'] != null && addDialogSelections.value[i]['id'] == row['id']) {
				addDialogSelections.value.splice(i, 1)
				break
			}
		}
	}
	okText.value = '确认选择' + (addDialogSelections.value.length > 0 ? '(' + addDialogSelections.value.length + '项)' : '')
}
// 全选按钮点击事件
const handleAddDialogSelectAll = (selections: any) => {
	if (selections == null || selections.length <= 0) {
		// 如果当前页的数据存在已选之中，要删掉
		const check = fixedAssetsGoodsPage.value.map((item: any) => item.id)
		addDialogSelections.value = addDialogSelections.value.filter((item: any) => !check.includes(item.id))
	} else {
		// 如果当前页的数据不存在已选之中，要添加
		const check = addDialogSelections.value.map((item: any) => item.id)
		for (let i = 0; i < fixedAssetsGoodsPage.value.length; i++) {
			const row = fixedAssetsGoodsPage.value[i]
			if (!check.includes(row.id)) {
				addDialogSelections.value.push(row)
			}
		}
	}
	okText.value = '确认选择' + (addDialogSelections.value.length > 0 ? '(' + addDialogSelections.value.length + '项)' : '')
}
// 打开资产选择窗口
const openAddDialog = () => {
	addDialog.value = true
	addDialogSelections.value = []
	okText.value = defaultOkText
}
// 添加到领用物品列表
const addToGoodsList = () => {
	if (addDialogSelections.value != null && addDialogSelections.value.length > 0) {
		const idCheck = goodsList.value.map((item: any) => item.id)
		for (let i = 0; i < addDialogSelections.value.length; i++) {
			const row = addDialogSelections.value[i]
			if (row['id'] != null && !idCheck.includes(row['id'])) {
				// 领取数量
				row['goodsCnt'] = 1
				goodsList.value.push(row)
			}
		}
	}
	// 关闭选择窗口
	addDialog.value = false
}

/** 删除物品清单数据 */
const deleteGoodsFromList = (index: any) => {
	goodsList.value.splice(index, 1)
}
let tableSelections: any[] = []
/** 表格多选事件 */
const handleSelectionChange = (value: any[]) => {
	tableSelections = []
	for (let i = 0; i < value.length; i++) {
		tableSelections.push(value[i].id)
	}
}

/** 按选中的来删除列表数据 */
const deleteSelections = () => {
	if (tableSelections != null && tableSelections.length > 0) {
		for (let i = 0; i < tableSelections.length; i++) {
			for (let k = 0; k < goodsList.value.length; k++) {
				if (goodsList.value[k].id === tableSelections[i]) {
					goodsList.value.splice(k, 1)
					break
				}
			}
		}
	}
}

/** 重置 */
const resetForm = () => {
	docInfoForm.value = {
		inventoryNo: '',
		subject: docInfoForm.value.subject,
		planName: '',
		personName: '',
		personId: '',
		baseDate: dayjs().format('YYYY-MM-DD'),
		startDate: dayjs().format('YYYY-MM-DD'),
		endDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
		range: '',
		storagePlace: '',
		personInfo: {
			id: '',
			value: '',
		},
	}
	goodsList.value = []
}
/** 添加窗口 点 取消 时，也要检查一下是否是修改的情况，修改的要重置一下表单，不然打开添加的时候，之前的数据会存在 */
const closeAddDialog = () => {
	addDialog.value = false
}

/** 保存 */
const save = (status: number) => {
	let docObj = {
		inventoryNo: '',
		subject: docInfoForm.value.subject ? docInfoForm.value.subject : '',
		planName: docInfoForm.value.planName ? docInfoForm.value.planName : '',
		personName: docInfoForm.value.personName ? docInfoForm.value.personName : '',
		personId: docInfoForm.value.personId ? docInfoForm.value.personId : '',
		baseDate: docInfoForm.value.baseDate ? docInfoForm.value.baseDate : '',
		startDate: docInfoForm.value.startDate ? docInfoForm.value.startDate : '',
		endDate: docInfoForm.value.endDate ? docInfoForm.value.endDate : '',
		range: docInfoForm.value.range ? docInfoForm.value.range : '',
		storagePlace: docInfoForm.value.storagePlace ? docInfoForm.value.storagePlace : '',
		status: status == null || status == undefined ? 0 : status,
	}
	if (docInfoForm.value.personInfo.value == docObj.personName) docObj.personId = docInfoForm.value.personInfo.id

	const goodsArr =
		goodsList.value != null && goodsList.value.length > 0
			? goodsList.value.map((item: any) => {
					return { id: item.id, surplusCnt: item.surplusCnt }
			  })
			: []

	if (docObj['planName'] == null || docObj['planName'] == '') {
		ElMessage.info('请填写【盘点计划名称】')
		return
	}
	if (docObj['personName'] == null || docObj['personName'] == '') {
		ElMessage.info('请选择【盘点负责人】')
		return
	}
	if (docObj['baseDate'] == null || docObj['baseDate'] == '') {
		ElMessage.info('请选择【盘点基准日期】')
		return
	}
	if (docObj['startDate'] == null || docObj['startDate'] == '') {
		ElMessage.info('请选择【盘点开始日期】')
		return
	}
	if (docObj['endDate'] == null || docObj['endDate'] == '') {
		ElMessage.info('请选择【盘点结束日期】')
		return
	}
	if (docObj['range'] == null || docObj['range'] == '') {
		ElMessage.info('请选择【盘点范围】')
		return
	}
	if (docObj['storagePlace'] == null || docObj['storagePlace'] == '') {
		ElMessage.info('请填写【存放地点】')
		return
	}

	docObj['goodsList'] = goodsArr

	if (routeParamsId.value == undefined || routeParamsId.value == null || routeParamsId.value == '') {
		service.assets.stockCheck.stockCheckController.add(docObj).then((res) => {
			if (res != null && res.code != null && parseInt(res.code) == 1000) {
				ElMessage.success('保存成功')
				// 重置表单
				resetForm()
				// 后退
				router.back()
			} else {
				ElMessage.error('保存失败')
			}
		})
	} else {
		docObj['id'] = routeParamsId.value
		service.assets.stockCheck.stockCheckController.updatePlan(docObj).then((res) => {
			if (res != null && res.code != null && parseInt(res.code) == 1000) {
				ElMessage.success('保存成功')
				// 重置表单
				resetForm()
				// 如果是列表过来的  后退
				if (location.href.indexOf('?id=') != -1 || location.href.indexOf('&id=') != -1) {
					router.back()
				}
			} else {
				ElMessage.error('保存失败')
			}
		})
	}
}
</script>

<style lang="scss">
.form_box {
	.el-form-item__label {
		min-width: 100px;
		justify-content: left;
	}
}
</style>

<style scoped lang="scss">
.not_finished {
	margin: 10px 0 20px 0;
	span {
		width: 140px;
		display: inline-block;
		font-size: 14px;
		color: rgba(80, 80, 80, 1);
	}
}
.form_box {
	background-color: #fff;
	padding: 20px;
	.form_title {
		text-align: center;
		color: rgba(80, 80, 80, 1);
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 20px;
	}
	.details {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
		color: rgba(80, 80, 80, 1);
		font-size: 14px;
		margin-bottom: 20px;
		.details_title {
			font-weight: bold;
		}
	}
	.save_btns {
		margin: 20px 20px 20px 0;
	}
}
</style>
