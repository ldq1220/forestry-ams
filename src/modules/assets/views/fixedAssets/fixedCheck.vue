<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 自定义列 -->
			<cl-column-custom :columns="Table?.columns" />
			<!-- 新增按钮 -->

			<!-- 跳转到盘点计划新建页面 -->
			<router-link :to="'/assets/addStockCheckPlan?dataType=' + 'fixed'" style="color: #fff">
				<el-button type="primary" v-permission="service.assets.stockCheck.stockCheckController.permission.updatePlan">创建盘点计划</el-button>
			</router-link>
			<!-- <cl-add-btn /> -->
			<!-- 导出 -->
			<cl-export-btn :columns="Table?.columns" :data="onExportData" filename="固定资产库存盘点" />
			<!-- 删除按钮 -->
			<!-- <cl-multi-delete-btn /> -->
			<cl-flex1 />

			<!-- 盘点日期筛选 -->
			<div class="date_picker">
				<span style="font-size: 12px; margin-right: 10px">盘点日期</span>
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
			<cl-search-key placeholder="搜索盘点计划名称" />
			<!-- 高级搜索按钮 -->
			<!-- <cl-adv-btn /> -->
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table">
				<template #column-baseDate="{ scope }">
					{{ scope.row.baseDate?.slice(0, 10) }}
				</template>
				<template #column-startDate="{ scope }">
					{{ scope.row.startDate?.slice(0, 10) }}
				</template>
				<template #column-endDate="{ scope }">
					{{ scope.row.endDate?.slice(0, 10) }}
				</template>
			</cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert">
			<!-- 盘点负责人 -->
			<template #slot-personName="">
				<el-autocomplete v-model="personName" :fetch-suggestions="querySearch" class="inline-input w-50" style="width: 192px" />
			</template>
			<!-- 盘点基准日期 -->
			<template #slot-baseDate="">
				<el-date-picker v-model="baseDate" type="date" placeholder="请选择盘点基准日期" style="width: 192px" />
			</template>
			<!-- 盘点开始日期 -->
			<template #slot-startDate="">
				<el-date-picker v-model="startDate" type="date" placeholder="请选择盘点开始日期" style="width: 192px" />
			</template>
			<!-- 盘点结束日期 -->
			<template #slot-endDate="">
				<el-date-picker v-model="endDate" type="date" placeholder="请选择结束开始日期" style="width: 192px" />
			</template>
			<!-- 盘点范围 -->
			<template #slot-range="">
				<el-select v-model="rangeValue" class="m-2" style="width: 192px"></el-select>
			</template>
		</cl-upsert>
		<!-- 高级搜索弹窗 -->
		<!-- <cl-adv-search ref="AdvSearch" /> -->

		<!-- 盘点对话框 -->
		<cl-dialog :title="'盘点计划: ' + planName" v-model="checkDialogVisible" width="950" draggable>
			<el-table
				:data="checkDialogTableData"
				style="width: 100%"
				center
				:header-cell-style="{
					backgroundColor: '#F5F5F5', // 设置表头行的背景色
				}"
				height="500"
			>
				<el-table-column type="index" />
				<el-table-column prop="customNo" label="资产编号" width="200" align="center" header-align="center" />
				<el-table-column prop="goodsName" label="资产名称" align="center" header-align="center">
					<template #default="scope">
						<el-text v-if="curDataType == '固定资产'">{{ scope.row.field41 }}</el-text>
						<el-text v-if="curDataType == '无形资产'">{{ scope.row.field3 }}</el-text>
						<el-text v-if="curDataType == '易耗品'">{{ scope.row.field3 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="sku" label="规格型号" align="center" header-align="center">
					<template #default="scope">
						<el-text v-if="curDataType == '固定资产'">{{ scope.row.field78 }}</el-text>
						<el-text v-if="curDataType == '无形资产'">{{ scope.row.fieldnull }}</el-text>
						<el-text v-if="curDataType == '易耗品'">{{ scope.row.field20 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="storagePlace" label="存放地点" align="center" header-align="center">
					<template #default="scope">
						<el-text v-if="curDataType == '固定资产'">{{ scope.row.field32 }}</el-text>
						<el-text v-if="curDataType == '无形资产'">{{ scope.row.field35 }}</el-text>
						<el-text v-if="curDataType == '易耗品'">{{ scope.row.field15 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="putStorageDate" label="入库日期" align="center" header-align="center">
					<template #default="scope">
						<el-text v-if="curDataType == '固定资产'">{{ scope.row.field5 }}</el-text>
						<el-text v-if="curDataType == '无形资产'">{{ scope.row.field69 }}</el-text>
						<el-text v-if="curDataType == '易耗品'">{{ scope.row.field19 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="assetsValue" label="资产原值（元）" align="center" width="140" header-align="center">
					<template #default="scope">
						<el-text v-if="curDataType == '固定资产'">{{ scope.row.field9 }}</el-text>
						<el-text v-if="curDataType == '无形资产'">{{ scope.row.field11 }}</el-text>
						<el-text v-if="curDataType == '易耗品'">{{ scope.row.field5 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="stockCheckOp" label="盘点操作" width="150" fixed="right">
					<template #default="scope">
						<el-checkbox v-model="scope.row.check" label="" />
						<el-input :disabled="!scope.row.check" v-model="scope.row.checkCnt" placeholder="" style="width: 80px; margin-left: 12px" />
						<!-- <el-input-number :disabled="!scope.row.check" v-model="scope.row.checkCnt" :min="0" :max="scope.row.beforeCnt" style="width: 110px; margin-left: 6px" /> -->
					</template>
				</el-table-column>
			</el-table>

			<template #footer>
				<span>
					<el-button @click="checkDialogVisible = false">取消</el-button>
					<el-button type="success" @click="saveStockCheckData">保存</el-button>
				</span>
			</template>
		</cl-dialog>

		<!-- 新增盘点记录对话框 -->
		<cl-dialog title="新增盘点记录" v-model="addCheckDialogVisible" @close="closeAddCheckDialog">
			<div class="receive_box">
				<div class="info_dialog_content">
					<div class="content_item">
						<div class="item_label">资产编号</div>
						<el-input v-model="assetsNumber" placeholder="请输入资产编号" @input="handleInput" ref="assetsNumberInput"></el-input>
					</div>
				</div>
				<div class="info_dialog_content"></div>
				<div class="info_dialog_content" v-for="item in assetsInfo" :key="item.id">
					<div class="content_item">
						<div class="item_label">{{ item.label }}</div>
						<div class="item_content">{{ item.value }}</div>
					</div>
				</div>
				<div class="receive_box" v-if="assetsInfo.length == 0" v-loading="loading">
					<div class="info_dialog_content">
						<div class="content_item">
							<div class="item_label">资产名称</div>
							<div class="item_content"></div>
						</div>
					</div>
					<div class="info_dialog_content">
						<div class="content_item">
							<div class="item_label">规格型号</div>
							<div class="item_content"></div>
						</div>
					</div>
					<div class="info_dialog_content">
						<div class="content_item">
							<div class="item_label">存放地点</div>
							<div class="item_content"></div>
						</div>
					</div>
					<div class="info_dialog_content">
						<div class="content_item">
							<div class="item_label">取得日期</div>
							<div class="item_content"></div>
						</div>
					</div>
					<div class="info_dialog_content">
						<div class="content_item">
							<div class="item_label">资产原值（元）</div>
							<div class="item_content"></div>
						</div>
					</div>
				</div>
			</div>
			<template #footer>
				<span>
					<el-button @click="addCheckDialogVisible = false">取消</el-button>
					<el-button type="success" @click="handleSaveAddCheck" :disabled="!goodsId">确定</el-button>
				</span>
			</template>
		</cl-dialog>

		<!-- 盘点计划详情 -->
		<cl-dialog title="盘点计划详情" v-model="checkPlanInfoDialogVisible" width="950">
			<div class="receive_box check_detail_info">
				<div class="info_dialog_content">
					<div class="content_item">
						<div class="item_label" style="font-weight: bold">基本信息</div>
						<div class="item_content"></div>
					</div>
				</div>
				<div class="info_dialog_content"></div>
				<div class="info_dialog_content">
					<div class="content_item">
						<div class="item_label">盘点编号</div>
						<div class="item_content">{{ checkPlanInfoData.plan.inventoryNo }}</div>
					</div>
				</div>
				<div class="info_dialog_content">
					<div class="content_item">
						<div class="item_label">单位会计科目</div>
						<div class="item_content">{{ checkPlanInfoData.plan.subject }}</div>
					</div>
				</div>
				<div class="info_dialog_content">
					<div class="content_item">
						<div class="item_label">计划名称</div>
						<div class="item_content">{{ checkPlanInfoData.plan.planName }}</div>
					</div>
				</div>
				<div class="info_dialog_content">
					<div class="content_item">
						<div class="item_label">盘点负责人</div>
						<div class="item_content">{{ checkPlanInfoData.plan.personName }}</div>
					</div>
				</div>
				<div class="info_dialog_content">
					<div class="content_item">
						<div class="item_label">盘点基准日期</div>
						<div class="item_content">{{ checkPlanInfoData.plan.baseDate }}</div>
					</div>
				</div>
				<div class="info_dialog_content">
					<div class="content_item">
						<div class="item_label">盘点开始日期</div>
						<div class="item_content">{{ checkPlanInfoData.plan.startDate }}</div>
					</div>
				</div>
				<div class="info_dialog_content">
					<div class="content_item">
						<div class="item_label">盘点结束日期</div>
						<div class="item_content">{{ checkPlanInfoData.plan.endDate }}</div>
					</div>
				</div>
				<div class="info_dialog_content">
					<div class="content_item">
						<div class="item_label">盘点范围</div>
						<div class="item_content">{{ checkPlanInfoData.plan.range }}</div>
					</div>
				</div>
				<div class="info_dialog_content">
					<div class="content_item">
						<div class="item_label">存放地点</div>
						<div class="item_content">{{ checkPlanInfoData.plan.storagePlace }}</div>
					</div>
				</div>
			</div>
			<div class="check_detail">
				<p>盘点明细</p>
				<el-tabs v-model="activeName" class="demo-tabs">
					<el-tab-pane label="实盘" name="first">
						<el-table
							:data="checkPlanInfoData.inventoryRecords"
							style="width: 100%"
							center
							:header-cell-style="{
								backgroundColor: '#F5F5F5', // 设置表头行的背景色
							}"
						>
							<el-table-column type="index" />
							<el-table-column prop="customNo" label="资产编号" width="200" align="center" header-align="center" />
							<el-table-column prop="goodsName" label="资产名称" align="center" header-align="center">
								<template #default="scope">
									<el-text v-if="curDataType == '固定资产'">{{ scope.row.field41 }}</el-text>
									<el-text v-if="curDataType == '无形资产'">{{ scope.row.field3 }}</el-text>
									<el-text v-if="curDataType == '易耗品'">{{ scope.row.field3 }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="sku" label="规格型号" align="center" header-align="center">
								<template #default="scope">
									<el-text v-if="curDataType == '固定资产'">{{ scope.row.field78 }}</el-text>
									<el-text v-if="curDataType == '无形资产'">{{ scope.row.fieldnull }}</el-text>
									<el-text v-if="curDataType == '易耗品'">{{ scope.row.field20 }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="storagePlace" label="存放地点" align="center" header-align="center">
								<template #default="scope">
									<el-text v-if="curDataType == '固定资产'">{{ scope.row.field32 }}</el-text>
									<el-text v-if="curDataType == '无形资产'">{{ scope.row.field35 }}</el-text>
									<el-text v-if="curDataType == '易耗品'">{{ scope.row.field15 }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="putStorageDate" label="入库日期" align="center" header-align="center">
								<template #default="scope">
									<el-text v-if="curDataType == '固定资产'">{{ scope.row.field5 }}</el-text>
									<el-text v-if="curDataType == '无形资产'">{{ scope.row.field69 }}</el-text>
									<el-text v-if="curDataType == '易耗品'">{{ scope.row.field19 }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="assetsValue" label="资产原值（元）" align="center" width="140" header-align="center">
								<template #default="scope">
									<el-text v-if="curDataType == '固定资产'">{{ scope.row.field9 }}</el-text>
									<el-text v-if="curDataType == '无形资产'">{{ scope.row.field11 }}</el-text>
									<el-text v-if="curDataType == '易耗品'">{{ scope.row.field5 }}</el-text>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="盘盈" name="second">
						<el-table
							:data="checkPlanInfoData.profitRecords"
							style="width: 100%"
							center
							:header-cell-style="{
								backgroundColor: '#F5F5F5', // 设置表头行的背景色
							}"
						>
							<el-table-column type="index"></el-table-column>
							<el-table-column prop="customNo" label="资产编号" width="200" align="center" header-align="center" />
							<el-table-column prop="goodsName" label="资产名称" align="center" header-align="center">
								<template #default="scope">
									<el-text v-if="curDataType == '固定资产'">{{ scope.row.field41 }}</el-text>
									<el-text v-if="curDataType == '无形资产'">{{ scope.row.field3 }}</el-text>
									<el-text v-if="curDataType == '易耗品'">{{ scope.row.field3 }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="sku" label="规格型号" align="center" header-align="center">
								<template #default="scope">
									<el-text v-if="curDataType == '固定资产'">{{ scope.row.field78 }}</el-text>
									<el-text v-if="curDataType == '无形资产'">{{ scope.row.fieldnull }}</el-text>
									<el-text v-if="curDataType == '易耗品'">{{ scope.row.field20 }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="storagePlace" label="存放地点" align="center" header-align="center">
								<template #default="scope">
									<el-text v-if="curDataType == '固定资产'">{{ scope.row.field32 }}</el-text>
									<el-text v-if="curDataType == '无形资产'">{{ scope.row.field35 }}</el-text>
									<el-text v-if="curDataType == '易耗品'">{{ scope.row.field15 }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="putStorageDate" label="入库日期" align="center" header-align="center">
								<template #default="scope">
									<el-text v-if="curDataType == '固定资产'">{{ scope.row.field5 }}</el-text>
									<el-text v-if="curDataType == '无形资产'">{{ scope.row.field69 }}</el-text>
									<el-text v-if="curDataType == '易耗品'">{{ scope.row.field19 }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="assetsValue" label="资产原值（元）" align="center" width="140" header-align="center">
								<template #default="scope">
									<el-text v-if="curDataType == '固定资产'">{{ scope.row.field9 }}</el-text>
									<el-text v-if="curDataType == '无形资产'">{{ scope.row.field11 }}</el-text>
									<el-text v-if="curDataType == '易耗品'">{{ scope.row.field5 }}</el-text>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="盘亏" name="third">
						<el-table
							:data="checkPlanInfoData.lossRecords"
							style="width: 100%"
							center
							:header-cell-style="{
								backgroundColor: '#F5F5F5', // 设置表头行的背景色
							}"
						>
							<el-table-column type="index"></el-table-column>
							<el-table-column prop="customNo" label="资产编号" width="200" align="center" header-align="center" />
							<el-table-column prop="goodsName" label="资产名称" align="center" header-align="center">
								<template #default="scope">
									<el-text v-if="curDataType == '固定资产'">{{ scope.row.field41 }}</el-text>
									<el-text v-if="curDataType == '无形资产'">{{ scope.row.field3 }}</el-text>
									<el-text v-if="curDataType == '易耗品'">{{ scope.row.field3 }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="sku" label="规格型号" align="center" header-align="center">
								<template #default="scope">
									<el-text v-if="curDataType == '固定资产'">{{ scope.row.field78 }}</el-text>
									<el-text v-if="curDataType == '无形资产'">{{ scope.row.fieldnull }}</el-text>
									<el-text v-if="curDataType == '易耗品'">{{ scope.row.field20 }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="storagePlace" label="存放地点" align="center" header-align="center">
								<template #default="scope">
									<el-text v-if="curDataType == '固定资产'">{{ scope.row.field32 }}</el-text>
									<el-text v-if="curDataType == '无形资产'">{{ scope.row.field35 }}</el-text>
									<el-text v-if="curDataType == '易耗品'">{{ scope.row.field15 }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="putStorageDate" label="入库日期" align="center" header-align="center">
								<template #default="scope">
									<el-text v-if="curDataType == '固定资产'">{{ scope.row.field5 }}</el-text>
									<el-text v-if="curDataType == '无形资产'">{{ scope.row.field69 }}</el-text>
									<el-text v-if="curDataType == '易耗品'">{{ scope.row.field19 }}</el-text>
								</template>
							</el-table-column>
							<el-table-column prop="assetsValue" label="资产原值（元）" align="center" width="140" header-align="center">
								<template #default="scope">
									<el-text v-if="curDataType == '固定资产'">{{ scope.row.field9 }}</el-text>
									<el-text v-if="curDataType == '无形资产'">{{ scope.row.field11 }}</el-text>
									<el-text v-if="curDataType == '易耗品'">{{ scope.row.field5 }}</el-text>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>
			</div>
		</cl-dialog>
	</cl-crud>
</template>

<script lang="ts" name="fixedCheck" setup>
import { useCrud, useTable, useUpsert } from '@cool-vue/crud'
import { useCool, router } from '/@/cool'
import departmentTree from '../basicDataMaintenance/components/departmentTree.vue'
import { departmentFilter } from '../../../../cool/utils/departmentFilter'
import { ref, onMounted, reactive } from 'vue'
import dayjs from 'dayjs'
import { ElMessage, ElMessageBox } from 'element-plus'
import { checkPerm } from '/$/base'

const departmentData = ref()
onMounted(() => {
	service.assets.department.list().then((res) => {
		departmentData.value = res
	})
	getEmployeeList()
})

// 获取 员工
const getEmployeeList = () => {
	service.assets.employee.list().then((res) => {
		res.forEach((item) => {
			restaurants.value.push({ value: item.name })
		})
	})
}
// 自动补全输入框
const createFilter = (queryString: string) => {
	return (restaurant: any) => {
		return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
	}
}
const restaurants: any = ref([])
const querySearch = (queryString: string, cb: any) => {
	const results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value
	cb(results)
}

const { service } = useCool()
const putStorageTime: any = ref([]) // 盘点日期
//盘点日期搜素
const handlePutStorageTime = () => {
	if (putStorageTime.value == null) {
		putStorageTime.value = []
		refresh()
	} else {
		refresh()
	}
}

const baseDate = ref(new Date()) //基准盘点日期
const startDate = ref(new Date()) //基准开始日期
const endDate = ref() //基准结束日期
const rangeValue = ref('') // 盘点范围
const personName = ref('') // 盘点负责人

const checkDialogVisible = ref(false) // 盘点计划对话框
const planId = ref() // 当前盘点计划 id
const addCheckDialogVisible = ref(false) // 新增盘点对话框
const checkDialogTableData = ref() // 盘点对话框表格数据
const assetsNumber = ref() // 新增盘点距离 编号输入框
const assetsInfo: any = ref([]) // 资产编号 ==> 资产详情
const goodsId = ref() // 资产编号 ==> 资产详情 ==> id
const assetsNumberInput = ref()
const curDataType = ref('固定资产')

const checkPlanInfoDialogVisible = ref(false) // 盘点计划详情对话框
const activeName = ref('first') // 盘点计划详情对话框 盘点明细 tabs
const checkPlanInfoData: any = reactive({
	plan: {
		id: 2,
		createTime: '2023-08-28 16:57:42',
		updateTime: '2023-08-29 14:13:46',
		inventoryNo: 'PY-202308-01',
		planName: '2023年度资产清查',
		baseDate: '2023-08-31 23:59:59',
		startDate: '2023-09-01 08:30:00',
		endDate: '2023-09-05 18:00:00',
		personName: '李达发',
		range: '全部',
		storagePlace: '全部',
		subject: '固定资产',
	},
	// 全部盘点记录
	inventoryRecords: [],
	// 盘盈数据
	profitRecords: [],
	// 盘亏数据
	lossRecords: [],
})

const planName = ref()

// 通过资产编号 获取 资产详情
const loading = ref(false)
let debounceTimer: string | number | NodeJS.Timeout | undefined
const getAssetsInfo = () => {
	// 在此处编写原始的获取资源信息逻辑
	assetsInfo.value = []
	service.assets.fixed.assetsFixedGoodsController
		.getGoodsInventoryDataByCustomNo({
			customNo: assetsNumber.value,
		})
		.then((res) => {
			loading.value = false

			if (res.length !== 0) {
				goodsId.value = res[0].value
			} else {
				goodsId.value = undefined
			}
			assetsInfo.value = res.filter((item: any, index: number) => index >= 2)
		})
}
// 防抖
const handleInput = () => {
	loading.value = true
	clearTimeout(debounceTimer)
	debounceTimer = setTimeout(getAssetsInfo, 500)
}

// 关闭新增盘点记录对话框
const closeAddCheckDialog = () => {
	assetsNumber.value = ''
	assetsInfo.value = []
}

// 新增盘点记录
const handleSaveAddCheck = () => {
	if (goodsId.value) {
		service.assets.inventory.assetsFixedInventoryController
			.addAssetsFixedInventoryRecord({
				fmData: [
					{
						planId: planId.value,
						goodsId: goodsId.value,
					},
				],
			})
			.then(() => {
				addCheckDialogVisible.value = false
				assetsNumber.value = ''
				assetsInfo.value = []
				getCheckPlanList()
			})
	}
}

// 获取盘点记录表
const getCheckPlanList = () => {
	service.assets.inventory.assetsFixedInventoryController
		.getAssetsFixedInventoryRecordByPage4Plan({
			planId: planId.value,
			order: 'sortOrder',
			page: 1,
			size: 20,
			sort: 'ASC',
		})
		.then((res) => {
			checkDialogTableData.value = res.list
		})
}

// cl-upsert
const Upsert = useUpsert({
	props: {
		inline: true,
	},
	items: [
		{
			label: '盘点编号',
			prop: 'inventoryNo',
			component: {
				name: 'el-input',
				props: {
					placeholder: '盘点编号系统自动产生',
					disabled: true,
				},
			},
			span: 12,
		},
		{
			label: '单位会计科目',
			prop: 'subject',
			component: {
				name: 'el-select',
				props: {
					disabled: true,
					placeholder: '固定资产',
				},
				style: {
					width: '192px',
				},
			},
			span: 12,
		},
		{
			label: '计划名称',
			prop: 'planName',
			component: {
				name: 'el-input',
			},
			span: 12,
		},
		{
			label: '盘点负责人',
			prop: 'personName',
			component: {
				name: 'slot-personName',
			},
			span: 12,
		},
		{
			label: '盘点基准日期',
			prop: 'baseDate',
			component: {
				name: 'slot-baseDate',
			},
			span: 12,
		},
		{
			label: '盘点开始日期',
			prop: 'startDate',
			component: {
				name: 'slot-startDate',
			},
			span: 12,
		},
		{
			label: '盘点结束日期',
			prop: 'endDate',
			component: {
				name: 'slot-endDate',
			},
			span: 12,
		},
		{
			label: '盘点范围',
			prop: 'range',
			component: {
				vm: departmentTree,
				style: {
					width: '192px',
				},
			},
			span: 12,
		},
		{
			label: '存放地点',
			prop: 'storagePlace',
			component: {
				name: 'el-input',
			},
			span: 12,
		},
	],
	// 详情钩子
	onInfo(data, { done }) {
		baseDate.value = data.baseDate
		startDate.value = data.startDate
		endDate.value = data.endDate
		rangeValue.value = data.range
		personName.value = data.personName
		// 直接取列表的数据返回
		done(data)
	},
	// 打开后，数据加载完，onInfo 之后
	onOpened(data) {
		if (Upsert.value?.mode === 'update') {
			baseDate.value = data.baseDate
			startDate.value = data.startDate
			endDate.value = data.endDate
			rangeValue.value = data.range
			personName.value = data.personName
		} else if (Upsert.value?.mode === 'add') {
			baseDate.value = new Date()
			startDate.value = new Date()
			endDate.value = ''
			rangeValue.value = ''
			personName.value = ''
		}
	},
	// 提交钩子
	onSubmit(data, { next }) {
		data.range = departmentFilter(data.range, departmentData.value) || rangeValue.value // 盘点范围
		data.baseDate = baseDate.value
		data.startDate = startDate.value
		data.endDate = endDate.value
		data.personName = personName.value // 盘点负责人
		data.planName = data.planName ? data.planName : '' // 盘点计划名称
		data.storagePlace = data.storagePlace ? data.storagePlace : '' // 存放地点
		data.subject = '固定资产'
		next(data)
	},
})

// cl-table
const Table = useTable({
	columns: [
		{
			label: '',
			type: 'selection',
			width: 40,
		},
		{
			label: '',
			type: 'index',
		},
		{
			label: '盘点编号',
			prop: 'inventoryNo',
			width: 200,
		},
		{
			label: '盘点计划名称',
			prop: 'planName',
			width: 200,
		},
		{
			label: '盘点基准日期',
			prop: 'baseDate',
			width: 120,
		},
		{
			label: '盘点开始日期',
			prop: 'startDate',
			width: 120,
		},
		{
			label: '盘点结束日期',
			prop: 'endDate',
			width: 120,
		},
		{
			label: '盘点负责人',
			prop: 'personName',
			width: 120,
		},
		{
			label: '盘点范围',
			prop: 'range',
			width: 200,
		},
		{
			label: '存放地点',
			prop: 'storagePlace',
			width: 200,
		},
		{
			label: '单位会计科目',
			prop: 'subject',
			width: 120,
		},
		{
			type: 'op',
			width: 250,
			buttons({ scope }) {
				return [
					{
						label: '盘点',
						type: 'success',
						hidden: scope.row.status !== 0 || !checkPerm(service.assets.stockCheck.stockCheckController.permission.updateStockCheckData as any),
						onClick() {
							checkDialogVisible.value = true
							service.assets.stockCheck.stockCheckController
								.getById({
									id: scope.row.id.toString(),
								})
								.then((res) => {
									let goodsList = res.goodsList
									if (goodsList != null && goodsList.length > 0) {
										for (let i = 0; i < goodsList.length; i++) {
											// checkbox是否选中
											if (goodsList[i].status != null && goodsList[i].status === 1) {
												goodsList[i].check = true
											} else {
												goodsList[i].check = false
											}
											// 盘点数量
											if (!goodsList[i].check) {
												goodsList[i].checkCnt = goodsList[i].beforeCnt != null ? goodsList[i].beforeCnt : ''
											}
										}
									}
									planId.value = scope.row.id
									checkDialogTableData.value = goodsList
									planName.value = scope.row.planName
								})
						},
					},
					{
						label: '结束盘点',
						type: 'warning',
						hidden: scope.row.status !== 0 || !checkPerm(service.assets.stockCheck.stockCheckController.permission.updateStatus),
						onClick() {
							ElMessageBox.confirm('您确定要结束盘点嘛？', '结束盘点计划', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning',
								draggable: true,
							})
								.then(() => {
									service.assets.stockCheck.stockCheckController
										.updateStatus({
											planId: scope.row.id.toString(),
											status: 1,
										})
										.then(() => {
											ElMessage.success('结束盘点')
											refresh()
										})
								})
								.catch(() => {})
						},
					},
					{
						label: '编辑',
						type: 'primary',
						hidden: scope.row.status !== 0 || !checkPerm(service.assets.stockCheck.stockCheckController.permission.updatePlan as any),
						onClick() {
							router.push('/assets/addStockCheckPlan?dataType=fixed&id=' + scope.row.id)
						},
					},
					{
						label: '删除',
						type: 'warning',
						hidden: scope.row.status !== 0 || !checkPerm(service.assets.stockCheck.stockCheckController.permission.deletePlan as any),
						onClick() {
							ElMessageBox.confirm('确定要删除吗？', '确认操作', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning',
								draggable: true,
							})
								.then(() => {
									service.assets.stockCheck.stockCheckController
										.deletePlan({
											planId: scope.row.id.toString(),
										})
										.then(() => {
											ElMessage.success('删除盘点')
											refresh()
										})
								})
								.catch(() => {})
						},
					},
					{
						label: '查看',
						type: 'Info',
						hiddem: !checkPerm(service.assets.stockCheck.stockCheckController.permission.getStockCheckPlanData as any),
						onClick() {
							checkPlanInfoDialogVisible.value = true
							service.assets.stockCheck.stockCheckController
								.getStockCheckPlanData({
									id: scope.row.id.toString(),
								})
								.then((res) => {
									Object.assign(checkPlanInfoData, res)
								})
						},
					},
				]
			},
		},
	],
})

// cl-crud
const Crud = useCrud(
	{
		service: service.assets.stockCheck.stockCheckController,
		dict: {
			api: {
				page: 'getByPage',
			},
		},
		async onRefresh(params, { next, render }) {
			// 带上其他查询参数（分页查询）
			if (putStorageTime.value != null && putStorageTime.value.length > 0) {
				params['startCreateTime'] = dayjs(putStorageTime.value[0]).format('YYYY-MM-DD') // 入库日期（开始）
				params['endCreateTime'] = dayjs(putStorageTime.value[1]).format('YYYY-MM-DD') // 入库日期（结束）
			} else {
				params['startCreateTime'] = undefined // 入库日期（开始）
				params['endCreateTime'] = undefined // 入库日期（结束）
			}

			params['dataType'] = '固定资产'

			const { list } = await next(params)
			// 渲染数据
			render(list)
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

// 重定义导出接口
const onExportData = async () => {
	return service.assets.inventory.assetsFixedInventoryController.getAssetsFixedInventoryPlanByPage().then((res) => res.list)
}

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params)
}

// 保存 盘点数据
const saveStockCheckData = () => {
	const goodsList = checkDialogTableData.value.map((item: any) => {
		return {
			goodsId: item.id,
			status: item.check ? 1 : 0,
			checkCnt: item.check ? item.checkCnt : item.beforeCnt,
		}
	})
	service.assets.stockCheck.stockCheckController
		.updateStockCheckData({
			planId: planId.value,
			goodsList: goodsList,
		})
		.then((res) => {
			if (res != null && res.code != null && parseInt(res.code) == 1000) {
				checkDialogVisible.value = false
				ElMessage.success('保存成功')
				refresh()
			} else {
				ElMessage.error('保存失败')
			}
		})
}
</script>

<style lang="scss" scoped>
.receive_box {
	display: flex;
	flex-wrap: wrap;
	.info_dialog_content {
		width: 50%;
		display: flex;
		flex-wrap: wrap;
		.content_item {
			width: 100%;
			padding-right: 40px;
			display: flex;
			align-items: center;
			margin: 16px 0;
			.item_label {
				width: 100px;
				margin-right: 20px;
			}
			.item_content {
				flex-grow: 1;
				color: rgba(166, 166, 166, 1);
			}
		}
	}
}
.check_detail_info {
	.info_dialog_content {
		.content_item {
			margin: 12px 0;
		}
	}
}
.check_detail {
	p {
		margin: 30px 0 10px 0;
		font-weight: bold;
	}
}
</style>
