<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<!-- <cl-multi-delete-btn /> -->
			<!-- 自定义列 -->
			<cl-column-custom :columns="custom" name="assetsFixedGoods" />
			<!-- <cl-column-custom :columns="Table?.columns" /> -->

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
			<cl-table ref="Table"></cl-table>
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
					<span class="dialog_footer">
						<el-button @click="infoDialog = false">关闭</el-button>
					</span>
				</template>
			</cl-dialog>
		</div>

		<!-- 领用对话框 -->
		<div class="receive">
			<cl-dialog title="领用" v-model="receiveVisible" class="receive">
				<div class="receive_box">
					<div class="info_dialog_content">
						<div class="content_item">
							<div class="item_label">编号</div>
							<div class="item_content">{{ receiveData.info.field3 }}</div>
						</div>
					</div>
					<div class="info_dialog_content">
						<div class="content_item">
							<div class="item_label">资产名称</div>
							<div class="item_content">{{ receiveData.info.field41 }}</div>
						</div>
					</div>
					<div class="info_dialog_content" style="margin-bottom: 10px">
						<div class="content_item">
							<div class="item_label">规划型号</div>
							<div class="item_content">{{ receiveData.info.field78 }}</div>
						</div>
					</div>

					<el-form :inline="true" :model="receiveData.form" class="demo-form-inline" :rules="receiveData.rules" ref="receiveDom">
						<el-form-item label="领用人" prop="personName">
							<!-- <el-input v-model="receiveData.form.personName" placeholder="请输入领用人" clearable /> -->
							<el-autocomplete v-model="receiveData.form.personName" :fetch-suggestions="querySearch" clearable class="inline-input w-50" placeholder="请输入领用人" />
						</el-form-item>
						<el-form-item label="领用部门" prop="deptName">
							<el-tree-select
								v-model="receiveData.form.deptName"
								:data="receiveData.form.departmentOptions"
								check-strictly
								:render-after-expand="false"
								show-checkbox
								check-on-click-node
								clearable
							/>
						</el-form-item>
						<el-form-item label="存放地点">
							<el-input v-model="receiveData.form.storagePlace" placeholder="请输入存放地点" clearable />
						</el-form-item>
						<el-form-item label="领用日期" prop="getDate">
							<el-date-picker v-model="receiveData.form.getDate" type="date" placeholder="领用日期" />
						</el-form-item>
						<el-form-item label="预计归还日期">
							<el-date-picker v-model="receiveData.form.dueReturnDate" type="date" placeholder="预计归还日期" />
						</el-form-item>
						<el-form-item label="领用原因">
							<el-input v-model="receiveData.form.getReason" placeholder="请输入领用原因" clearable />
						</el-form-item>
					</el-form>
				</div>
				<template #footer>
					<span class="dialog_footer">
						<el-button @click="receiveVisible = false">取消</el-button>
						<el-button type="primary" @click="handleReceiveSave">确定</el-button>
					</span>
				</template>
			</cl-dialog>
		</div>

		<!-- 报废对话框 -->
		<div class="scrap">
			<cl-dialog title="报废" v-model="scrapVisible" class="scrap">
				<div class="scrap_box">
					<div class="info_dialog_content">
						<div class="content_item">
							<div class="item_label">编号</div>
							<div class="item_content">{{ scrapData.info.field3 }}</div>
						</div>
					</div>
					<div class="info_dialog_content">
						<div class="content_item">
							<div class="item_label">资产名称</div>
							<div class="item_content">{{ scrapData.info.field41 }}</div>
						</div>
					</div>
					<div class="info_dialog_content" style="margin-bottom: 10px">
						<div class="content_item">
							<div class="item_label">规划型号</div>
							<div class="item_content">{{ scrapData.info.field78 }}</div>
						</div>
					</div>

					<el-form :inline="true" :model="scrapData.form" class="demo-form-inline" :rules="scrapData.rules" ref="scrapDom">
						<el-form-item label="报废负责人" prop="personName">
							<!-- <el-input v-model="scrapData.form.personName" placeholder="请输入报废负责人" /> -->
							<el-autocomplete v-model="scrapData.form.personName" :fetch-suggestions="querySearch" clearable class="inline-input w-50" placeholder="请输入报废负责人" />
						</el-form-item>

						<el-form-item label="处置方式" prop="dealType">
							<el-select v-model="scrapData.form.dealType" placeholder="请选的处置方式" clearable>
								<el-option label="回收" value="回收" />
								<el-option label="销毁" value="销毁" />
								<el-option label="捐赠" value="捐赠" />
							</el-select>
						</el-form-item>

						<el-form-item label="报废原因" prop="discardReason">
							<el-input v-model="scrapData.form.discardReason" placeholder="请输入报废原因" clearable />
						</el-form-item>
						<el-form-item label="报废日期" prop="discardDate">
							<el-date-picker v-model="scrapData.form.discardDate" type="date" placeholder="报废日期" />
						</el-form-item>
					</el-form>
				</div>
				<template #footer>
					<span class="dialog_footer">
						<el-button @click="scrapVisible = false">取消</el-button>
						<el-button type="primary" @click="handleScrapSave">确定</el-button>
					</span>
				</template>
			</cl-dialog>
		</div>

		<!-- 打印对话框 -->
		<div class="print">
			<cl-dialog v-model="printVisible" title="打印设置" width="700px" class="print" :close-on-click-modal="false">
				<div class="print_box" v-show="printInfo.labelArr.length == 0">
					<h3>广东省林业调查规划院</h3>
					<img :src="printInfo.qrCodeFilePath" alt="" />
					<div class="form_box">
						<div class="form_item" v-for="(item, index) in printData.labelArr" :key="index">
							<el-input v-model="item.title" placeholder="打印标题" class="inprt_input"></el-input>
							<el-select v-model="item.fieldId" class="m-2" placeholder="请选择打印内容">
								<el-option
									v-for="field in printInfo.fieldArr"
									:key="field.fieldId"
									:label="field.fieldName"
									:value="field.fieldId"
									@click="handleChangePrintContent(field.fieldName, index)"
								/>
							</el-select>
						</div>
					</div>
				</div>
				<div class="print_box" v-show="printInfo.labelArr.length !== 0">
					<h3>广东省林业调查规划院</h3>
					<img :src="printOptionsInfo.qrCodeFilePath" alt="" />

					<div class="form_box">
						<div class="info_dialog_content">
							<div class="content_item" v-for="item in printOptionsInfo.labelArr" :key="item.label">
								<div class="item_label">{{ item.label }}</div>
								<div class="item_content">{{ item.value }}</div>
							</div>
						</div>
					</div>
				</div>
				<template #footer>
					<div class="dialog_footer">
						<div class="print_status">
							状态
							<span>未打印</span>
						</div>
						<div class="footer_btns">
							<el-button @click="printVisible = false">取消</el-button>
							<el-button type="success" @click="handlePrintSave" v-show="printInfo.labelArr.length == 0">保存</el-button>
							<el-button type="success" @click="handlePrintUpdate" v-show="printInfo.labelArr.length != 0">修改</el-button>
							<!-- <el-button type="primary">保存&打印</el-button> -->
							<el-button type="primary" v-show="printInfo.labelArr.length != 0">打印</el-button>
						</div>
					</div>
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

<script lang="ts" name="fixedAssetsList" setup>
import { useCrud, useTable, useUpsert, useAdvSearch } from '@cool-vue/crud'
import { useCool } from '/@/cool'
import { onMounted, reactive, ref, watch } from 'vue'
import { ElMessage, type TabsPaneContext } from 'element-plus'
import dayjs from 'dayjs'
// import { ElMessage } from 'element-plus'
// import advSearchOrUpdateTree from './commponents/advSearchOrUpdateTree.vue'
import useAdvSearchStore from '/@/modules/base/store/advSearch'

const { service } = useCool()
const advSearchStore = useAdvSearchStore()

const custom = ref() // 自定义列 数据
const fixedAssetsInfo: any = reactive({
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
	status: [
		{
			label: '闲置',
			value: '闲置',
		},
		{
			label: '待处置',
			value: '待处置',
		},
		{
			label: '待报废',
			value: '待报废',
		},
	],
})

const receiveVisible = ref(false) // 领用对话框
const receiveDom = ref()
const receiveData: any = reactive({
	form: {
		goodsId: undefined,
		personName: undefined,
		deptName: undefined,
		storagePlace: undefined,
		getDate: new Date(),
		dueReturnDate: new Date(),
		getReason: undefined,
		departmentOptions: [],
		props: {
			label: 'name',
			value: 'id',
			children: 'children',
		},
	},
	info: {},
	rules: {
		personName: [{ required: true, message: '请输入领用人', trigger: 'change' }],
		deptName: [{ required: true, message: '请选择领用部门', trigger: 'blur' }],
		getDate: [{ required: true, message: '请选择领用日期', trigger: 'blur' }],
	},
})

const scrapVisible = ref(false) // 报废对话框
const scrapDom = ref()
const scrapData: any = reactive({
	form: {
		goodsId: undefined,
		personName: undefined,
		dealType: undefined,
		discardReason: undefined,
		discardDate: new Date(),
	},
	info: {},
	rules: {
		personName: [{ required: true, message: '请输入报废负责人', trigger: 'change' }],
		dealType: [{ required: true, message: '请选择处置方式', trigger: 'blur' }],
		discardDate: [{ required: true, message: '请选择报废日期', trigger: 'blur' }],
	},
})
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

const printVisible = ref(false) // 打印对话框
//打印标签设置下拉框，需要用到的数据
const printInfo = ref()
const printOptionsInfo: any = reactive({
	id: '',
	qrCodeFilePath: '',
	labelArr: [],
})
const printData = reactive({
	labelArr: [
		{
			title: '',
			fieldId: '',
		},
		{
			title: '',
			fieldId: '',
		},
		{
			title: '',
			fieldId: '',
		},
		{
			title: '',
			fieldId: '',
		},
		{
			title: '',
			fieldId: '',
		},
		{
			title: '',
			fieldId: '',
		},
		{
			title: '',
			fieldId: '',
		},
		{
			title: '',
			fieldId: '',
		},
	],
})
// 选择打印内容
const handleChangePrintContent = (fieldName: any, index: any) => {
	printData.labelArr[index].title = fieldName
}
// 保存打印配置
const handlePrintSave = () => {
	service.assets.label.assetsGoodsLabelController
		.addGoodsLabel({
			goodsId: printInfo.value.id + '',
			labelArr: printData.labelArr,
		})
		.then(() => {
			// 查询固定资产标物品签信息（标签详情）
			service.assets.fixed.assetsFixedGoodsController.getLabelUseableData({ id: printInfo.value.id }).then((res) => {
				printInfo.value.labelArr = res.labelArr
				// 如果已经配置过打印设置
				if (res.labelArr.length > 0) {
					// 查询固定资产标物品签信息（标签详情）
					service.assets.label.assetsGoodsLabelController.getGoodsLabel({ goodsId: printInfo.value.id }).then((res) => {
						Object.assign(printOptionsInfo, res)
						ElMessage.success('保存成功')
					})
				}
			})
		})
}
// 修改打印设置
const handlePrintUpdate = () => {
	printInfo.value.labelArr = []
	console.log(printOptionsInfo.labelArr)

	printData.labelArr = printOptionsInfo.labelArr.map((item: { label: any; fieldId: any }) => {
		return {
			title: item.label,
			fieldId: item.fieldId,
		}
	})
}

onMounted(() => {
	addOptionsNode() //新加的字段查询方法
	getColumns() // 获取表格显示字段
	// getFixedStatusOption() // 获取资产状态列表
	// getUpsertOptions() // 配置入库、编辑form
	getDepartmentList() // 获取部门列表
	getEmployeeList() // 获取员工列表

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
				width: 300,
				// @ts-ignore
				buttons({ scope }) {
					return [
						'edit',
						{
							label: '详情',
							type: 'primary',
							onClick() {
								// ElMessage.success(scope.row + '正常')
								service.assets.fixed.assetsFixedGoodsController.getById({ id: scope.row.id }).then((res) => {
									Object.assign(receiveData.info, res.data)
								})

								infoDialog.value = true
							},
						},
						{
							label: '打印',
							type: 'primary',
							onClick() {
								printData.labelArr = [
									{
										title: '',
										fieldId: '',
									},
									{
										title: '',
										fieldId: '',
									},
									{
										title: '',
										fieldId: '',
									},
									{
										title: '',
										fieldId: '',
									},
									{
										title: '',
										fieldId: '',
									},
									{
										title: '',
										fieldId: '',
									},
									{
										title: '',
										fieldId: '',
									},
									{
										title: '',
										fieldId: '',
									},
								]
								service.assets.fixed.assetsFixedGoodsController.getLabelUseableData({ id: scope.row.id }).then((res) => {
									printInfo.value = res
									printInfo.value.id = scope.row.id
									printVisible.value = true

									// 如果已经配置过打印设置
									if (res.labelArr.length > 0) {
										// 查询固定资产标物品签信息（标签详情）
										service.assets.label.assetsGoodsLabelController.getGoodsLabel({ goodsId: scope.row.id }).then((res) => {
											Object.assign(printOptionsInfo, res)
											printOptionsInfo.id = scope.row.id
										})
									}
								})
							},
						},
						{
							label: '领用',
							type: 'success',
							hidden: scope.row.field12 !== '闲置',
							onClick() {
								receiveVisible.value = true
								// ElMessage.success(scope.row + '正常')
								service.assets.fixed.assetsFixedGoodsController.info({ id: scope.row.id }).then((res) => {
									receiveData.form.goodsId = res.id
									Object.assign(receiveData.info, res)
								})
							},
						},
						{
							label: '报废',
							type: 'danger',
							hidden: scope.row.field12 !== '待报废',
							onClick() {
								scrapVisible.value = true
								service.assets.fixed.assetsFixedGoodsController.info({ id: scope.row.id }).then((res) => {
									scrapData.form.goodsId = res.id
									Object.assign(scrapData.info, res)
								})
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

// 获取 员工
const getEmployeeList = () => {
	service.assets.employee.list().then((res) => {
		console.log(res)
		res.forEach((item) => {
			restaurants.value.push({ value: item.name })
		})
	})
}

// 领用对话框确定
const handleReceiveSave = async () => {
	await receiveDom.value.validate()
	// eslint-disable-next-line
	const { departmentOptions, props, ...reqData } = receiveData.form
	service.assets.fixed.assetsFixedGoodsGetController.add(reqData).then(() => {
		ElMessage.success('领用成功')
		receiveVisible.value = false
		Object.assign(receiveData.form, {
			goodsId: undefined,
			personName: undefined,
			deptName: undefined,
			storagePlace: undefined,
			getDate: new Date(),
			dueReturnDate: new Date(),
			getReason: undefined,
			departmentOptions: [],
		})

		refresh()
	})
}

// 报废对话框确定
const handleScrapSave = async () => {
	await scrapDom.value.validate()
	service.assets.fixed.fixedAssetsGoodsDiscardController.add(scrapData.form).then(() => {
		ElMessage.success('报废成功')
		scrapVisible.value = false
		Object.assign(scrapData.form, {
			goodsId: undefined,
			personName: undefined,
			dealType: undefined,
			discardReason: undefined,
			discardDate: new Date(),
		})

		refresh()
	})
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
		dict: {
			api: {
				page: 'getInventoryByPage',
			},
			label: {
				add: '入库',
			},
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

// 详情tab切换
const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event)
}

// 获取部门列表
const getDepartmentList = async () => {
	service.assets.department.list().then((res) => {
		receiveData.form.departmentOptions = formatTreeData(transformData(res))
	})
}
// 改写部门数据列表方法 改写成树形结构数据
const transformData = (data: any[]) => {
	const map = {}
	const result: any[] = []

	// 将每个对象按照 id 存储到 map 中
	data.forEach((item) => {
		map[item.id] = { ...item, children: [] }
	})

	// 遍历每个对象，将其添加到对应的父对象的 children 数组中
	data.forEach((item) => {
		if (item.parentId && map[item.parentId]) {
			map[item.parentId].children.push(map[item.id])
		} else {
			result.push(map[item.id])
		}
	})

	return result
}
// 树形结构再次重写 格式 [ label: name, value : name :children: children]
const formatTreeData = (treeData: any) => {
	return treeData.map((node: { name: any; children: string | any[] }) => {
		const newNode = {
			label: node.name,
			value: node.name,
			children: [],
		}
		if (node.children && node.children.length > 0) {
			newNode.children = formatTreeData(node.children)
		}
		return newNode
	})
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

.el-form-item__label {
	min-width: 125px !important;
	// width: auto !important;
}
.el-form-item__label {
	justify-content: left;
}

// 领用
.receive,
.scrap {
	.el-form-item {
		width: 50% !important;
		margin-right: 0;
	}

	.el-input {
		width: 220px !important;
	}
	.el-form-item__label {
		min-width: 110px !important;
	}
}

// 打印
.print {
	.el-dialog__body {
		padding: 20px 40px !important;
	}
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
// 领用
.receive_box,
.scrap_box {
	display: flex;
	flex-wrap: wrap;
	.info_dialog_content {
		width: 50%;
		.content_item {
			width: 100%;
		}

		.item_content {
			flex-grow: 1;
		}
	}
}
// 打印
.print {
	.print_box {
		// width: 600px;
		padding: 20px;
		border: 1px solid rgba(128, 128, 128, 1);
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0;
		img {
			margin: 20px 0;
			display: block;
			width: 100px;
			height: 100px;
		}
		.form_box {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.form_item {
				width: 46%;
				margin-bottom: 20px;
				// padding-right: 14px;
				display: flex;
				.inprt_input {
					margin-right: 12px;
					width: 130px !important;
					font-size: 12px;
				}
				.el-select {
					flex-grow: 1;
				}
			}
		}

		// .form_item:nth-child(n) {
		// 	margin-right: 14px;
		// }
	}
	.dialog_footer {
		display: flex;
		justify-content: space-between;
		.print_status {
			font-size: 12px;
			color: rgba(80, 80, 80, 1);
		}
	}
}
</style>
