<template>
	<!-- 划拨单 -->
	<div class="not_finished">
		<span>修改未结束划拨单</span>
		<el-tooltip content="对未“结束划拨”的划拨单、资产清单进行修改" placement="top">
			<el-select v-model="routeParamsLabel" filterable placeholder="请选择" width="250" @change="selectIncompleteRecord">
				<el-option v-for="item in incompletePutStorageRecoeds" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</el-tooltip>
	</div>

	<div class="form_box">
		<div class="form_title">新建划拨单</div>
		<el-form :model="docInfoForm" :inline="true">
			<el-row>
				<el-form-item label="划拨给" required>
					<el-autocomplete v-model="docInfoForm.name" :fetch-suggestions="userListStore.userList" placeholder="请选择" @select="handleSelect" />
				</el-form-item>
				<el-form-item label="划拨日期" required>
					<el-date-picker v-model="docInfoForm.date" type="date" placeholder="请选择" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
				</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="存放地点" required>
					<el-input v-model="docInfoForm.storagePlace" placeholder="请输入存放地点" />
				</el-form-item>
				<el-form-item label="备注">
					<el-input style="width: 220px" v-model="docInfoForm.remark" placeholder="备注信息" />
				</el-form-item>
			</el-row>

			<!-- 划拨明细 -->
			<div class="details">
				<div class="details_title">划拨明细</div>
				<div class="btns">
					<i style="display: inline-block; width: 40px"></i>
					<el-button @click="openAddDialog" type="primary" :icon="Plus">添加</el-button>
					<el-button @click="deleteSelections" type="danger" :icon="Delete">批量删除</el-button>
				</div>
			</div>
			<br />

			<el-table :data="goodsList" :stripe="true" style="width: 100%" @selection-change="handleSelectionChange" :border="true" :header-cell-style="{ backgroundColor: '#F5F5F5' }">
				<el-table-column type="selection" width="40" align="center" />
				<el-table-column type="index" align="center" />
				<el-table-column prop="goodsName" label="资产名称" header-align="center" align="center">
					<template #default="scope">
						<el-text v-if="curSubject == '固定资产'">{{ scope.row.field41 }}</el-text>
						<el-text v-if="curSubject == '无形资产'">{{ scope.row.field3 }}</el-text>
						<el-text v-if="curSubject == '易耗品'">{{ scope.row.field3 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="customNo" label="资产编号" header-align="center" align="center" />
				<el-table-column prop="sku" label="规格型号" header-align="center" align="center">
					<template #default="scope">
						<el-text v-if="curSubject == '固定资产'">{{ scope.row.field78 }}</el-text>
						<el-text v-if="curSubject == '无形资产'"></el-text>
						<el-text v-if="curSubject == '易耗品'">{{ scope.row.field20 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="assetsStatus" label="资产状态" header-align="center" width="200" align="center">
					<template #default="scope">
						<el-text v-if="curSubject == '固定资产'">{{ scope.row.field12 }}</el-text>
						<el-text v-if="curSubject == '无形资产'">{{ scope.row.field14 }}</el-text>
						<el-text v-if="curSubject == '易耗品'">{{ scope.row.field6 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="cnt" label="数量" header-align="center" width="200" align="center">
					<template #default="scope">
						<el-text v-if="curSubject == '固定资产'">{{ scope.row.surplusCnt }}</el-text>
						<el-text v-if="curSubject == '无形资产'">{{ scope.row.surplusCnt }}</el-text>
						<el-text v-if="curSubject == '易耗品'">{{ scope.row.surplusCnt }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="goodsCnt" label="划拨数量" header-align="center" width="200" align="center">
					<template #default="scope">
						<el-input-number v-model="scope.row.goodsCnt" :min="1" :max="scope.row.surplusCnt ? scope.row.surplusCnt : 0" placeholder="划拨数量" />
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
				<el-button type="success" @click="save(0)" style="width: 120px" :icon="Check">暂存</el-button>
				<el-tooltip content="选择此项保存数据，后面就不能再对这个划拨单进行修改了，请谨慎操作" placement="top">
					<el-button type="danger" @click="save(1)" :icon="Check">保存并结束划拨</el-button>
				</el-tooltip>
			</el-row>
		</el-form>
	</div>

	<!-- 物品清单 添加 -->
	<cl-dialog v-model="addDialog" title="资产选择" center draggable width="950">
		<!-- 筛选条件 -->
		<cl-row>
			<div class="date_picker">
				<!-- <span style="display: inline-block; margin-right: 12px">入库日期</span> -->
				<el-select v-model="goodsSearParams.dateType" class="date-type-pick" placeholder="Select">
					<el-option v-for="item in dateTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
				<el-date-picker v-model="putStorageTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 240px" />
			</div>
			<el-select v-model="goodsSearParams.textType" class="date-type-pick right" placeholder="Select">
				<el-option v-for="item in textTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
			<el-input v-model="goodsSearParams.keyWord" placeholder="请输入" :prefix-icon="Search" style="width: 250px; margin-right: 12px" clearable />
		</cl-row>
		<cl-row>
			<div style="margin: 12px 0 0 0">
				<span style="display: inline-block; margin-right: 12px">使用部门</span>
				<el-input v-model="goodsSearParams.deptName" placeholder="请输入" :prefix-icon="Search" style="width: 250px; margin-right: 12px" clearable />
				<span style="display: inline-block; margin-right: 12px; margin-left: 12px">使用人</span>
				<el-input v-model="goodsSearParams.userName" placeholder="请输入" :prefix-icon="Search" style="width: 250px; margin-right: 12px" clearable />
				<el-button type="success" @click="page">搜索</el-button>
			</div>
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
				:border="true"
				:header-cell-style="{ backgroundColor: '#F5F5F5' }"
			>
				<el-table-column type="selection" width="40" align="center" />
				<el-table-column type="index" align="center" />
				<el-table-column prop="field3" label="资产名称" width="200" show-overflow-tooltip sortable align="left" />
				<el-table-column prop="customNo" label="资产编号" width="150" show-overflow-tooltip sortable align="left" />
				<el-table-column prop="field8" label="使用人" width="120" show-overflow-tooltip sortable align="center" />
				<el-table-column prop="fieldnull" label="使用部门" width="120" show-overflow-tooltip sortable align="left" />
				<el-table-column prop="field20" label="规划型号" width="120" show-overflow-tooltip sortable align="left" />
				<el-table-column prop="field15" label="存放地点" width="120" sortable align="center" />
				<el-table-column prop="field35" label="取得日期" width="120" sortable align="center" />
				<el-table-column prop="field19" label="入库日期" width="120" show-overflow-tooltip sortable align="center" />
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

<script lang="ts" name="consumableGoodsTransfer" setup>
import { onMounted, ref } from 'vue'
import { useCool } from '/@/cool'
import dayjs from 'dayjs'

import userList from '/@/modules/base/store/userList'
import { ElTable, ElMessage } from 'element-plus'
import { Plus, Delete, Check, RefreshRight, Search } from '@element-plus/icons-vue'

const { service } = useCool()
const userListStore = userList()

const curSubject = ref('易耗品')

// 物品清单 列表数据
let goodsList: any = ref([])

const addDialog = ref(false)

const putStorageTime: any = ref([])

// 入库单信息
const docInfoForm: any = ref({
	userId: '', // 入库人ID
	name: '', // 入库人姓名
	date: dayjs().format('YYYY-MM-DD'), // 入库日期，默认当天，允许修改
	storagePlace: '', // 存放地点
	remark: '', // 备注
	// 这个是用在最后校验数据的，如果这个userInfo里的name跟docInfoForm的name一样的话，那么把userInfo的id给到docInfoForm的userId，否则要清空docInfoForm的userId
	userInfo: {
		id: '',
		value: '',
	},
})
const defaultOkText = '确认选择'
const okText = ref(defaultOkText)
const dateTypeOptions = ref([
	{
		label: '取得日期',
		value: '取得日期',
	},
	{
		label: '入库日期',
		value: '入库日期',
	},
])
const textTypeOptions = ref([
	{
		label: '资产名称',
		value: '资产名称',
	},
	{
		label: '资产编号',
		value: '资产编号',
	},
	{
		label: '规格型号',
		value: '规格型号',
	},
	{
		label: '存放地点',
		value: '存放地点',
	},
])
// 搜索关键词
const goodsSearParams = ref({
	keyWord: '',
	dateType: '取得日期',
	textType: '资产名称',
	deptName: '',
	userName: '',
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
	const dateType: string = goodsSearParams.value.dateType
	const textType: string = goodsSearParams.value.textType
	const deptName: string = goodsSearParams.value.deptName
	const userName: string = goodsSearParams.value.userName

	// 因为要支持搜索，所以这里不能直接使用原始数据
	let tableDataList = fixedAssetsGoodsList.value
	if (
		(startTime != null && startTime != '') ||
		(endTime != null && endTime != '') ||
		(keyWord != null && keyWord != '') ||
		(deptName != null && deptName != '') ||
		(userName != null && userName != '')
	) {
		// 搜索
		tableDataList = tableDataList.filter((item: any) => {
			let check = true

			if (keyWord != null && keyWord != '') {
				// 关键词 搜索
				let checkText = ''
				if (textType != null && textType == '资产编号') {
					checkText = item['customNo'] != null && item['customNo'] != '' ? item['customNo'] : ''
				} else if (textType != null && textType == '规格型号') {
					checkText = ''
				} else if (textType != null && textType == '存放地点') {
					checkText = item['field15'] != null && item['field15'] != '' ? item['field15'] : ''
				} else {
					checkText = item['field3'] != null && item['field3'] != '' ? item['field3'] : ''
				}
				if (checkText == null || checkText.toLowerCase().indexOf(keyWord.toLowerCase()) == -1) {
					check = false
				}
			}

			// 入库日期
			let timeText = ''
			if (dateType != null && dateType == '取得日期') {
				timeText = ''
			} else {
				timeText = item['field19'] != null && item['field19'] != '' ? item['field19'] : ''
			}
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

			// 使用部门
			if (deptName != null && deptName != '') {
				let checkText = ''
				if (checkText == null || checkText.toLowerCase().indexOf(deptName.toLowerCase()) == -1) {
					check = false
				}
			}
			// 使用人
			if (userName != null && userName != '') {
				let checkText = item['field8'] != null && item['field8'] != '' ? item['field8'] : ''
				if (checkText == null || checkText.toLowerCase().indexOf(userName.toLowerCase()) == -1) {
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
// 添加到划拨物品列表
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

/** 通过选择写入到输入框 */
const handleSelect = (item: any) => {
	docInfoForm.value.name = item.value
	docInfoForm.value.userInfo = item
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

const routeParamsId = ref()
const routeParamsLabel = ref()
const incompletePutStorageRecoeds: any = ref([])
onMounted(() => {
	getParamsFromUrl()
	loadFixedAssetsGoodsListData()
	getIncompleteRecoeds()
})

// 查询是否还有未完成入库的入库单
const getIncompleteRecoeds = () => {
	service.assets.goodsTransfer.goodsTransferDocController
		.getIncompleteRecoeds({
			dataType: curSubject.value,
		})
		.then((resp) => {
			if (resp != null && resp.data != null && resp.data.length > 0) {
				const curUpdateId = routeParamsId.value
				let curUpdateItemLabel = ''
				for (let i = 0; i < resp.data.length; i++) {
					incompletePutStorageRecoeds.value.push({
						label: resp.data[i].name + '_' + dayjs(resp.data[i].putStorageDate).format('YYYY-MM-DD'),
						value: resp.data[i].id,
					})
					if (curUpdateId != null && curUpdateId != '' && resp.data[i].id == curUpdateId) {
						curUpdateItemLabel = resp.data[i].name + '_' + dayjs(resp.data[i].putStorageDate).format('YYYY-MM-DD')
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
// 从url中获取要修改的ID
const getParamsFromUrl = () => {
	const url = location.href
	if (url != null && url.indexOf('?') != -1) {
		const params = url.split('?')[1]
		if (params != null && params != '') {
			const arr = params.split('&')
			if (arr != null && arr.length > 0) {
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].indexOf('id=') != -1) {
						routeParamsId.value = arr[i].replaceAll('id=', '').trim()
						continue
					}
				}
			}
		}
	}
}
// 选择未完成的划拨单进行修改
const selectIncompleteRecord = (value: any) => {
	routeParamsId.value = value
	service.assets.goodsTransfer.goodsTransferDocController
		.getById({
			id: value,
			dataType: curSubject.value,
		})
		.then((resp) => {
			if (resp != null) {
				if (resp.putStorageDate != null && resp.putStorageDate != '') {
					docInfoForm.value.userId = resp.userId ? resp.userId : ''
					docInfoForm.value.name = resp.name ? resp.name : ''
					docInfoForm.value.date = resp.putStorageDate ? resp.putStorageDate : ''
					docInfoForm.value.remark = resp.remark ? resp.remark : ''
					docInfoForm.value.storagePlace = resp.storagePlace ? resp.storagePlace : ''
					if (resp.userId) {
						docInfoForm.value.userInfo.id = resp.userId
						docInfoForm.value.userInfo.value = resp.name
					}
					// 资产清单
					if (resp.goodsList != null && resp.goodsList.length > 0) {
						// 这里的数据要放会这个可选的列表，不然他如果再列表删掉了，可选那里也不会出来的
						let addCnt = 0
						const checkIds = fixedAssetsGoodsList.value.map((item: any) => item.id)
						for (let i = 0; i < resp.goodsList.length; i++) {
							if (resp.goodsList[i].id != null && !checkIds.includes(resp.goodsList[i].id)) {
								// 检查一下这个数据的ID是否已经存在于可选列表，不存在添加，存在修改剩余数量（这个是无形资产/易耗品的）
								fixedAssetsGoodsList.value.push(JSON.parse(JSON.stringify(resp.goodsList[i])))
							}
							addCnt++
							// 检查一下是否有划拨数量，没有要加一个
							if (resp.goodsList[i].goodsCnt == null || resp.goodsList[i].goodsCnt == '' || parseInt(resp.goodsList[i].goodsCnt) <= 0) {
								resp.goodsList[i].goodsCnt = 1
							}
						}
						// 总数量也要修改，不然分页不对
						tablePager.value.total += addCnt
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

// 加载固定资产库存数据   ---   划拨明细，选择物品的列表用这份数据
const loadFixedAssetsGoodsListData = () => {
	service.assets.pushStorageDoc.pushStorageDocController
		.getConsumableStorageGoodsList({
			dataType: '划拨',
		})
		.then((resp: any) => {
			if (resp != null && resp.length > 0) {
				fixedAssetsGoodsList.value = resp
				tablePager.value.total = resp.length
				// 调用分页
				page()
			} else {
				fixedAssetsGoodsList.value = []
				tablePager.value.total = 0
				page()
			}
		})
}

/** 重置 */
const resetForm = () => {
	docInfoForm.value = {
		userId: '',
		name: '',
		date: dayjs().format('YYYY-MM-DD'),
		remark: '',
		userInfo: {
			id: '',
			value: '',
		},
	}
	goodsList.value = []
	routeParamsId.value = ''
	routeParamsLabel.value = ''
}
/** 添加窗口 点 取消 时，也要检查一下是否是修改的情况，修改的要重置一下表单，不然打开添加的时候，之前的数据会存在 */
const closeAddDialog = () => {
	addDialog.value = false
}

/** 保存 */
const save = (status: number) => {
	let docObj = {
		date: docInfoForm.value.date ? docInfoForm.value.date : '',
		name: docInfoForm.value.name ? docInfoForm.value.name : '',
		remark: docInfoForm.value.remark ? docInfoForm.value.remark : '',
		dataType: curSubject.value,
		status: status == null || status == undefined ? 0 : status,
		storagePlace: docInfoForm.value.storagePlace,
	}
	if (docInfoForm.value.userInfo.value == docObj.name) docObj['userId'] = docInfoForm.value.userInfo.id

	// 由于需要填写 领取数量，所以不能只取ID，还要把数量带上
	const goodsArr =
		goodsList.value != null && goodsList.value.length > 0
			? goodsList.value.map((item: any) => {
					return { id: item.id, goodsCnt: item.goodsCnt }
			  })
			: []
	if (docObj['name'] == null || docObj['name'] == '') {
		ElMessage.info('请填写【划拨给】')
		return
	}
	if (docObj['date'] == null || docObj['date'] == '') {
		ElMessage.info('请填写【划拨日期】')
		return
	}
	if (docObj['storagePlace'] == null || docObj['storagePlace'] == '') {
		ElMessage.info('请填写【存放地点】')
		return
	}
	docObj['goodsList'] = goodsArr

	if (routeParamsId.value == undefined || routeParamsId.value == null || routeParamsId.value == '') {
		service.assets.goodsTransfer.goodsTransferDocController.add(docObj).then((res) => {
			if (res != null && res.code != null && parseInt(res.code) == 1000) {
				ElMessage.success('保存成功')
				// 重置表单
				resetForm()
			} else {
				ElMessage.error('保存失败')
			}
		})
	} else {
		// 修改
		docObj['id'] = routeParamsId.value
		service.assets.goodsTransfer.goodsTransferDocController.updateDoc(docObj).then((res) => {
			if (res != null && res.code != null && parseInt(res.code) == 1000) {
				ElMessage.success('保存成功')
				// 重置表单
				resetForm()
				if (status != null && status == 1) {
					// 要把这个入库单从选项里删除，不然他还是能选择
					deleteDocFromSelectOptions(docObj['id'])
				}
			} else {
				ElMessage.error('保存失败')
			}
		})
	}
}
// 从选项里删除
const deleteDocFromSelectOptions = (id: any) => {
	for (let i = 0; i < incompletePutStorageRecoeds.value.length; i++) {
		const item = incompletePutStorageRecoeds.value[i]
		if (item.value == id) {
			incompletePutStorageRecoeds.value.splice(i, 1)
			break
		}
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
		width: 120px;
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
.date-type-pick {
	width: 100px;
	float: left;
	margin-right: 2px;
}
.date-type-pick.right {
	margin-left: 24px;
}
</style>
