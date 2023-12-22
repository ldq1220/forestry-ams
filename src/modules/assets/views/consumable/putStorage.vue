<template>
	<!-- 入库单 -->
	<div class="not_finished">
		<span>修改未结束入库单</span>
		<el-tooltip content="对未“结束入库”的入库单、资产清单进行修改" placement="top">
			<el-select v-model="routeParamsLabel" filterable placeholder="请选择" width="250" @change="selectIncompletePutStorageRecoed">
				<el-option v-for="item in incompletePutStorageRecoeds" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</el-tooltip>
	</div>

	<div class="form_box">
		<div class="form_title">新建入库单</div>
		<el-form :model="docInfoForm" :inline="true">
			<el-row>
				<el-form-item label="入库人" required>
					<el-autocomplete v-model="docInfoForm.name" :fetch-suggestions="userListStore.userList" placeholder="请选择" @select="handleSelect" />
				</el-form-item>
				<el-form-item label="入库日期" required>
					<el-date-picker v-model="docInfoForm.date" type="date" placeholder="请选择" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
				</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="上传采购单">
					<cl-upload v-model="shoppingListImgUrl" />
				</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="备注">
					<el-input v-model="docInfoForm.remark" placeholder="备注信息" />
				</el-form-item>
			</el-row>

			<!-- 物品清单 -->
			<div class="details">
				<div class="details_title">资产清单</div>
				<div class="btns">
					<i style="display: inline-block; width: 40px"></i>
					<el-button @click="addDialog = true" type="primary" :icon="Plus">添加</el-button>
					<el-button @click="deleteSelections" type="danger" :icon="Delete">批量删除</el-button>
					<div class="upload__">
						<cl-upload
							:ref="setRefs('upload')"
							type="file"
							text="从财厅数据表读取"
							:show-file-list="false"
							:limit="1"
							:limit-upload="false"
							multiple="false"
							accept=".xls,.xlsx"
							@success="onSuccess"
							:auto-upload="true"
						></cl-upload>
					</div>
				</div>
			</div>
			<br />

			<el-table
				:data="goodsList"
				:stripe="true"
				style="width: 100%"
				@selection-change="handleSelectionChange"
				:border="true"
				:header-cell-style="{ backgroundColor: '#F5F5F5' }"
				:height="elTableHeight"
			>
				<el-table-column type="selection" width="40" align="center" />
				<el-table-column type="index" width="40" align="center" />

				<el-table-column type="expand" style="background-color: #efefef" align="center">
					<template #default="props">
						<div>
							<div v-if="props.row.accessoryList != null && props.row.accessoryList.length > 0">
								<div style="padding: 0 5%; margin: 12px 0 6px 0">
									<el-button link type="primary" size="small" @click="updateGoodsAccessoryList(props.$index)" style="font-size: 15px" title="点击修改配件信息">
										附属配件列表
									</el-button>
								</div>
								<el-table :data="props.row.accessoryList" :stripe="true" :border="true" style="width: 90%; margin: 0 5% 12px 5%" :header-cell-style="{ backgroundColor: '#F5F5F5' }">
									<el-table-column label="配件名称" prop="name" header-align="center" align="center" />
									<el-table-column label="规格型号" prop="sku" header-align="center" align="center" />
									<el-table-column label="数量" prop="cnt" header-align="center" align="center" />
									<el-table-column label="购置日期" prop="buyDate" header-align="center" align="center" />
									<el-table-column label="原值(元)" prop="price" header-align="center" align="center" />
									<el-table-column label="生产厂商" prop="manufacturer" header-align="center" align="center" />
								</el-table>
							</div>
							<div v-if="props.row.accessoryList == null || props.row.accessoryList.length <= 0">
								<el-empty :image-size="72" description="暂无其他配件" />
							</div>
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="field3" label="资产名称" header-align="center" align="left" />
				<el-table-column prop="field4" label="财厅编号" header-align="center" align="center" width="200" />
				<el-table-column prop="field20" label="规格型号" header-align="center" align="center" />
				<el-table-column prop="cnt" label="数量" header-align="center" align="center" width="100" />
				<el-table-column prop="field15" label="存放地点" header-align="center" align="center" />
				<el-table-column prop="field5" label="资产原值(元)" header-align="center" align="center" width="120" />
				<el-table-column fixed="right" label="操作" width="120" header-align="center" align="center">
					<template #default="scope">
						<el-button link type="primary" size="small" @click="updateGoodsFromList(scope.$index)">修改</el-button>
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
				<el-tooltip content="选择此项保存数据，后面就不能再对这个入库单进行修改了，请谨慎操作" placement="top">
					<el-button type="danger" @click="save(1)" :icon="Check">保存并结束入库</el-button>
				</el-tooltip>
			</el-row>
		</el-form>
	</div>

	<!-- 物品清单 添加/修改 -->
	<cl-dialog v-model="addDialog" :title="dialogIsOnUpdate ? '修改' : '添加'" center draggable width="950" :before-close="beforeAddDialogClose">
		<el-tabs v-model="addDialogTabsValue">
			<el-tab-pane v-for="(options, key, index) in clUpsertOptions" :key="index" :label="tabNames[key]" :name="key">
				<div v-if="key.toString() != 'accessoryData'">
					<div v-for="(item, itemIndex) in options" :key="itemIndex">
						<el-row class="input-row" v-if="key.toString() != 'accessoryData'">
							<!-- label -->
							<el-col :span="4" class="label">
								<i v-if="item.required" class="red">*</i>
								<el-text truncated>{{ item.fieldName }}</el-text>
							</el-col>
							<!-- input输入框 -->
							<el-col :span="20" v-show="item.dataType != null && item.dataType == 'text'">
								<el-input
									v-if="item.dataType != null && item.dataType == 'text'"
									:disabled="item.disabled"
									v-model="item.value"
									:placeholder="item.disabled ? item.fieldName + '由系统生成 无需填写' : '请填写' + item.fieldName"
								/>
							</el-col>
							<!-- select选项 -->
							<el-col :span="20" v-show="item.dataType != null && item.dataType == 'options'">
								<el-tree-select
									v-if="item.dataType != null && item.dataType == 'options'"
									:data="item.optionList"
									value-key="optionText"
									default-expand-all
									filterable
									clearable
									:filter-node-method="filterNodeMethod"
									v-model="item.value"
									class="full-width"
									:placeholder="'请选择' + item.fieldName"
								/>
							</el-col>
							<!-- date日期选择 -->
							<el-col :span="20" v-show="item.dataType != null && item.dataType == 'date'">
								<el-date-picker
									v-if="item.dataType != null && item.dataType == 'date'"
									v-model="item.value"
									type="date"
									:placeholder="'请选择' + item.fieldName"
									style="width: 100%"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
								/>
							</el-col>
							<!-- 整数 输入框 -->
							<el-col :span="20" v-show="item.dataType != null && item.dataType == 'integer'">
								<el-input-number
									v-if="item.dataType != null && item.dataType == 'integer'"
									v-model="item.value"
									:placeholder="'请填写' + item.fieldName"
									:min="1"
									:precision="0"
									class="full-width"
								/>
							</el-col>
							<!-- 数字 输入框 -->
							<el-col :span="20" v-show="item.dataType != null && item.dataType == 'number'">
								<el-input-number
									:precision="2"
									v-if="item.dataType != null && item.dataType == 'number'"
									v-model="item.value"
									:placeholder="'请填写' + item.fieldName"
									class="full-width"
								/>
							</el-col>
							<!-- 使用关联表 -->
							<el-col :span="20" v-show="item.dataType != null && item.dataType == 'joinTable'">
								<!-- 人员选择  记得这个已经换成user表的数据了，不是原来的employee的数据 -->
								<el-autocomplete
									v-if="item.joinTableMethod != null && item.joinTableMethod == 'assets.employee.list'"
									style="width: 100%"
									v-model="item.value"
									:fetch-suggestions="userListStore.userList"
									clearable
									:placeholder="'请选择' + item.fieldName"
									:curfieldId="item.fieldId"
									@select="handleElTreeSelect"
									@click="handleAutoCompleteClick"
								/>
								<!-- 部门选择  记得由于人员选择的数据已经换成user表的，所以这个要换成base_sys_department表的数据了，不是原来的department的数据 -->
								<el-tree-select
									v-if="item.joinTableMethod != null && item.joinTableMethod == 'assets.department.list'"
									:data="baseSysDeptStore.baseSysDeptOptions"
									value-key="value"
									default-expand-all
									filterable
									clearable
									:filter-node-method="filterNodeMethod"
									v-model="item.value"
									class="full-width"
									:placeholder="'请选择' + item.fieldName"
									check-strictly="true"
									show-checkbox="true"
									check-on-click-node="true"
								/>
								<!-- 供应商选择 -->
								<el-tree-select
									v-if="item.joinTableMethod != null && item.joinTableMethod == 'assets.goodsSupplier.list'"
									:data="goodsSupplierStore.goodsSupplier"
									value-key="supplierName"
									default-expand-all
									filterable
									clearable
									:filter-node-method="filterNodeMethod"
									v-model="item.value"
									class="full-width"
									:placeholder="'请选择' + item.fieldName"
									check-strictly="true"
									show-checkbox="true"
									check-on-click-node="true"
								/>
								<!-- 单位会计科目选择 -->
								<el-tree-select
									v-if="item.joinTableMethod != null && item.joinTableMethod == 'assets.assetsCategory.list'"
									:data="assetsCategoryStore.assetsCategory"
									value-key="categoryName"
									default-expand-all
									filterable
									clearable
									:filter-node-method="filterNodeMethod"
									v-model="item.value"
									class="full-width"
									:placeholder="'请选择' + item.fieldName"
									check-strictly="true"
									show-checkbox="true"
									check-on-click-node="true"
								/>
							</el-col>
						</el-row>
					</div>
				</div>
				<div v-if="key.toString() === 'accessoryData'">
					<cl-row>
						<!-- 2023-10-09沟通后，新加上的修改，就是这一部分了 -->
						<el-button type="primary" @click="addRow" :icon="Plus">添加</el-button>
						<el-button type="danger" @click="deleteRow" :icon="Delete">删除</el-button>
					</cl-row>
					<cl-row>
						<el-table :data="clUpsertOptions.accessoryData" :stripe="true" style="width: 100%" @select="accessoryDataSelect" @select-all="accessoryDataSelect">
							<el-table-column type="selection" width="30" />
							<el-table-column type="index" width="40" />
							<el-table-column prop="name" label="配件名称" header-align="center">
								<template #default="scope">
									<el-input v-model="scope.row.name" placeholder="请填写" />
								</template>
							</el-table-column>
							<el-table-column prop="sku" label="规格型号" header-align="center">
								<template #default="scope">
									<el-input v-model="scope.row.sku" placeholder="请填写" />
								</template>
							</el-table-column>
							<el-table-column prop="cnt" label="数量" width="130" header-align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.cnt" placeholder="请填写" :min="1" :precision="0" class="full-width" />
								</template>
							</el-table-column>
							<el-table-column prop="buyDate" label="购置日期" header-align="center">
								<template #default="scope">
									<el-date-picker v-model="scope.row.buyDate" type="date" placeholder="请选择" format="YYYY-MM-DD" value-format="YYYY-MM-DD" style="width: 100%" />
								</template>
							</el-table-column>
							<el-table-column prop="price" label="原值(元)" header-align="center">
								<template #default="scope">
									<el-input-number :precision="2" v-model="scope.row.price" placeholder="请填写" class="full-width" />
								</template>
							</el-table-column>
							<el-table-column prop="manufacturer" label="生产厂商" header-align="center">
								<template #default="scope">
									<el-input v-model="scope.row.manufacturer" placeholder="请填写" />
								</template>
							</el-table-column>
							<template #empty>
								<el-empty />
							</template>
						</el-table>
					</cl-row>
				</div>
			</el-tab-pane>
		</el-tabs>
		<br />
		<cl-row>
			<cl-flex1 />
			<el-button @click="closeAddDialog" style="width: 100px">取消</el-button>
			<el-button type="success" @click="addToGoodsList" style="width: 100px">保存</el-button>
		</cl-row>
	</cl-dialog>
</template>

<script lang="ts" name="consumableAssetsPutStorage" setup>
import { onMounted, reactive, ref } from 'vue'
import { useCool } from '/@/cool'
import dayjs from 'dayjs'
import userList from '/@/modules/base/store/userList'
import useBaseSysDeptOptions from '/@/modules/base/store/baseSysDeptOptions'
import useGoodsSupplier from '/@/modules/base/store/goodsSupplier'
import useAssetsCategory from '/@/modules/base/store/assetsCategory'
import { ElMessage, ElLoading } from 'element-plus'
import { Plus, Delete, Check, RefreshRight } from '@element-plus/icons-vue'

const { setRefs, service } = useCool()
const userListStore = userList()
const baseSysDeptStore = useBaseSysDeptOptions()
const goodsSupplierStore = useGoodsSupplier()
const assetsCategoryStore = useAssetsCategory()

// 物品清单 列表数据
let goodsList: any = ref([])

const addDialog = ref(false)
// 采购单Url
const shoppingListImgUrl = ref('')
// 添加时默认显示的tab
const addDialogTabsValue = ref('baseData')

let loading: any = null
/** 从Excel中读取物品清单 */
function onSuccess<T extends { id: number; url: string }>(data: T) {
	loading = ElLoading.service({
		lock: true,
		text: 'Loading',
		background: 'rgba(0, 0, 0, 0.7)',
	})
	// 调用接口读取数据
	service.assets.pushStorageDoc.excelController
		.getDataFromExcel({
			filePath: data.url,
			dataType: 'consumableAssets',
		})
		.then((resp) => {
			if (loading != null)
				setTimeout(() => {
					loading.close()
				}, 500)
			// 结果
			if (resp && resp.length > 0) {
				const timestamp = new Date().getTime()
				for (let i = 0; i < resp.length; i++) {
					resp[i]['id'] = timestamp + i
					addToList(resp[i])
				}
			}
		})
}

// 入库单信息
const docInfoForm: any = ref({
	// 入库人ID
	userId: '',
	// 入库人姓名
	name: '',
	// 入库日期，默认当天，允许修改
	date: dayjs(),
	// 备注
	remark: '',
	// 这个是用在最后校验数据的，如果这个userInfo里的name跟docInfoForm的name一样的话，那么把userInfo的id给到docInfoForm的userId，否则要清空docInfoForm的userId
	userInfo: {
		id: '',
		value: '',
	},
})

/** 通过选择写入到输入框 */
const handleSelect = (item: any) => {
	docInfoForm.value.name = item.value
	docInfoForm.value.userInfo = item
}

/** 删除物品清单数据 */
const deleteGoodsFromList = (index: any) => {
	goodsList.value.splice(index, 1)
}
// 标记是修改数据的情况
const dialogIsOnUpdate = ref(false)
const curUpdateItemId = ref('')
/** 修改物品清单中的单条数据 */
const updateGoodsFromList = (index: any) => {
	// 标记为修改
	dialogIsOnUpdate.value = true
	const goods = goodsList.value[index]

	curUpdateItemId.value = goods['id']
	// 把这条数据对应字段的值放进去
	for (let key in clUpsertOptions) {
		if (key == 'accessoryData') {
			// 附属配件
			let list = []
			if (goods['accessoryList'] != null && goods['accessoryList'].length > 0) {
				list = goods['accessoryList']
			}
			clUpsertOptions['accessoryData'] = list
		} else {
			const options = clUpsertOptions[key]
			if (options != null && options.length > 0) {
				options.forEach((item: any) => {
					if (item.fieldId != null && item.fieldId != '' && goods[item.fieldId] != null && goods[item.fieldId] != '') item.value = goods[item.fieldId]
					else item.value = ''
				})
			}
		}
	}
	// 打开编辑窗口
	addDialog.value = true
}

/** 修改附属配件 */
const updateGoodsAccessoryList = (index: any) => {
	// 标记为修改
	dialogIsOnUpdate.value = true
	const goods = goodsList.value[index]
	curUpdateItemId.value = goods['id']
	// 把这条数据对应字段的值放进去
	for (let key in clUpsertOptions) {
		if (key == 'accessoryData') {
			// 附属配件
			let list = []
			if (goods['accessoryList'] != null && goods['accessoryList'].length > 0) {
				list = goods['accessoryList']
			}
			clUpsertOptions['accessoryData'] = list
		} else {
			const options = clUpsertOptions[key]
			if (options != null && options.length > 0) {
				options.forEach((item: any) => {
					if (item.fieldId != null && item.fieldId != '' && goods[item.fieldId] != null && goods[item.fieldId] != '') item.value = goods[item.fieldId]
					else item.value = ''
				})
			}
		}
	}
	// 打开编辑窗口
	addDialog.value = true
	// 切换到 附属配件tab
	addDialogTabsValue.value = 'accessoryData'
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
	getColumns()
	getIncompletePutStorageRecoeds()
})
// 查询是否还有未完成入库的入库单
const getIncompletePutStorageRecoeds = () => {
	service.assets.pushStorageDoc.pushStorageDocController
		.getIncompletePutStorageRecoeds({
			dataType: '易耗品',
		})
		.then((resp) => {
			if (resp != null && resp.data != null && resp.data.length > 0) {
				const curUpdateId = getUpdateIdFromUrl()
				let curUpdateItemLabel = ''
				for (let i = 0; i < resp.data.length; i++) {
					incompletePutStorageRecoeds.value.push({
						label: resp.data[i].name + '_' + resp.data[i].putStorageDate,
						value: resp.data[i].id,
					})
					if (curUpdateId != null && curUpdateId != '' && resp.data[i].id == curUpdateId) {
						curUpdateItemLabel = resp.data[i].name + '_' + resp.data[i].putStorageDate
					}
				}

				// 如果是url带着参数（要修改的id）过来的
				if (curUpdateItemLabel != null && curUpdateItemLabel != '') {
					routeParamsLabel.value = curUpdateItemLabel
					selectIncompletePutStorageRecoed(curUpdateId)
				}
			}
		})
}
// 从url中获取要修改的ID
const getUpdateIdFromUrl = () => {
	const url = location.href
	let id = null
	if (url != null && url.indexOf('?') != -1) {
		const params = url.split('?')[1]
		if (params != null && params != '') {
			const arr = params.split('&')
			if (arr != null && arr.length > 0) {
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].indexOf('id=') != -1) {
						id = arr[i].replaceAll('id=', '').trim()
						break
					}
				}
			}
		}
	}
	if (id != null) {
		routeParamsId.value = id
	}
	return routeParamsId.value ? routeParamsId.value : ''
}
// 选择未完成入库的入库单进行修改
const selectIncompletePutStorageRecoed = (value: any) => {
	routeParamsId.value = value
	service.assets.pushStorageDoc.pushStorageDocController
		.getById({
			id: value,
			dataType: '易耗品',
		})
		.then((resp) => {
			if (resp != null) {
				if (resp.putStorageDate != null && resp.putStorageDate != '') {
					docInfoForm.value.userId = resp.userId ? resp.userId : ''
					docInfoForm.value.name = resp.name ? resp.name : ''
					docInfoForm.value.date = resp.putStorageDate ? resp.putStorageDate : ''
					docInfoForm.value.remark = resp.remark ? resp.remark : ''
					if (resp.userId) {
						docInfoForm.value.userInfo.id = resp.userId
						docInfoForm.value.userInfo.value = resp.name
					}
					// 资产清单
					if (resp.goodsList != null && resp.goodsList.length > 0) goodsList.value = resp.goodsList
					// 采购单
					if (resp.filePath) shoppingListImgUrl.value = resp.filePath
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

// 物品清单，使用  添加  时，按易耗品的入库需要的字段来填写
const clUpsertOptions: any = reactive({
	baseData: [],
	valueData: [],
	useData: [],
	incomeData: [],
	otherData: [],
	accessoryData: [],
})
const tabNames: any = {
	baseData: '基础信息',
	valueData: '价值信息',
	useData: '使用信息',
	incomeData: '入账信息',
	otherData: '其他信息',
	accessoryData: '附属配件',
}
const getColumns = () => {
	service.assets.consumable.consumableAssetsGoodsController.getTableFields().then((res) => {
		res.forEach((item: any) => {
			const belongTab = item.belongTab
			if (belongTab != null && belongTab != '') {
				setDefaultValue4Field(item)
				clUpsertOptions[belongTab].push(item)
			}
		})
	})
}
// 有些字段可以设置一些默认值
const setDefaultValue4Field = (item: any) => {
	item.disabled = false
	item.required = false
	if (item.fieldName != null) {
		// 有些字段可以设置一些默认值
		if (item.fieldName == '资产状态' && (item.value == null || item.value == '')) item.value = '库存'
		if (item.fieldName == '数量' && (item.value == null || item.value == '')) item.value = '1'
		if (item.fieldId != null && item.fieldId == 'cnt' && (item.value == null || item.value == '')) item.value = '1'
		if (item.fieldId != null && item.fieldId == 'amount' && (item.value == null || item.value == '')) item.value = '1'
		if (item.fieldName == '单位会计科目' && (item.value == null || item.value == '')) item.value = '易耗品'

		// 有些字段不需要填写，给出禁用标记
		if (item.fieldName == '资产编号') item.disabled = true

		// 有些字段标记必填
		if (item.fieldName == '资产名称') item.required = true
	}
}
const filterNodeMethod = (value: string, data: any) => {
	if (data.optionText) return value ? data.optionText.includes(value) : true
	if (data.supplierName) return value ? data.supplierName.includes(value) : true
	if (data.categoryName) return value ? data.categoryName.includes(value) : true
	return value ? data.label.includes(value) : true
}

// 当前点击的自动补全输入框
const curClickAutoCompleteFieldId = ref()
//
const handleElTreeSelect = (item: any) => {
	// 把相应的 人员ID，也存到那个字段里
	let fieldItem = null
	for (let key in clUpsertOptions) {
		if (fieldItem != null) break
		if (key != 'accessoryData') {
			const options = clUpsertOptions[key]
			if (options != null && options.length > 0) {
				for (let i = 0; i < options.length; i++) {
					if (options[i].fieldId == null || options[i].fieldId == '') continue
					if (options[i].fieldId == curClickAutoCompleteFieldId.value) {
						fieldItem = options[i]
						break
					}
				}
			}
		}
	}
	fieldItem['selectUser'] = item
}
// 自动补全输入框点击事件
const handleAutoCompleteClick = (event: any) => {
	curClickAutoCompleteFieldId.value = event.target.getAttribute('curfieldId')
}

// 添加行
let idCheckArr: any[] = []
const addRow = () => {
	let id = new Date().getTime()
	if (idCheckArr.includes(id)) id += 1000
	idCheckArr.push(id)
	clUpsertOptions['accessoryData'].push({ id: id, name: '', cnt: 1, sku: '', buyDate: dayjs(new Date()).format('YYYY-MM-DD'), price: '0.00', manufacturer: '' })
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
const deleteRow = () => {
	if (accessoryDataSelections != null && accessoryDataSelections.length > 0 && clUpsertOptions['accessoryData'] != null && clUpsertOptions['accessoryData'].length > 0) {
		for (let i = 0; i < accessoryDataSelections.length; i++) {
			for (let k = 0; k < clUpsertOptions['accessoryData'].length; k++) {
				if (clUpsertOptions['accessoryData'][k]['id'] == accessoryDataSelections[i]) {
					clUpsertOptions['accessoryData'].splice(k, 1)
					break
				}
			}
		}
	}
}
// 添加到物品清单
const addToGoodsList = () => {
	let goods = { id: new Date().getTime() },
		isBreak = false
	for (let key in clUpsertOptions) {
		const options = clUpsertOptions[key]
		if (key == 'accessoryData') {
			// 附属配件
			if (options != null && options.length > 0) {
				let accessoryList = []
				for (let i = 0; i < options.length; i++) {
					accessoryList.push({
						id: options[i].id ? options[i].id : '',
						name: options[i].name ? options[i].name : '',
						cnt: options[i].cnt ? parseInt(options[i].cnt) : 0,
						sku: options[i].sku ? options[i].sku : '',
						buyDate: options[i].buyDate ? options[i].buyDate : '',
						price: options[i].price ? parseFloat(options[i].price) : 0,
						manufacturer: options[i].manufacturer ? options[i].manufacturer : '',
					})
				}
				goods['accessoryList'] = accessoryList
			} else {
				goods['accessoryList'] = null
			}
		} else {
			if (options != null && options.length > 0) {
				for (let i = 0; i < options.length; i++) {
					if (options[i].fieldId == null || options[i].fieldId == '') continue

					// 取出要保存的value值
					goods[options[i].fieldId] = options[i].value == null || options[i].value == '' ? null : options[i].value

					// 如果是选了user的自动补全输入框，检查一下这个名字是否一样，一样的情况下，把这个人员的ID也保存下来
					if (options[i]['selectUser'] != null) {
						const selectUser = options[i]['selectUser']
						if (selectUser['value'] != null && selectUser['value'] != '' && selectUser['id'] != null && selectUser['id'] != '' && selectUser['value'] == goods[options[i].fieldId]) {
							goods[options[i].fieldId + 'UserId'] = selectUser['id']
						}
					}

					// 检查一下是否有必填项没填的
					if (options[i].required && (goods[options[i].fieldId] == null || goods[options[i].fieldId] == '')) {
						isBreak = true
						ElMessage.error('【' + tabNames[options[i].belongTab] + '】中的【' + options[i].fieldName + '】不能为空。')
						break
					}
				}
			}
		}
	}
	if (isBreak) return
	// 加到列表   这里要检查一下，有可能是修改的情况
	if (dialogIsOnUpdate.value) {
		updateListData(goods)
		// 关掉修改标记
		dialogIsOnUpdate.value = false
	} else {
		addToList(goods)
	}
	// 关闭添加窗口
	addDialog.value = false
	// 表单重置
	resetGoodsAddForm()
}
// 加到列表
const addToList = (goods: any) => {
	// 加一个ID，修改的时候，用这个ID确定数据
	if (goods['id'] == null || goods['id'] == '') {
		goods['id'] = new Date().getTime()
	}
	// 数量
	const field11Value: number = goods['field11'] == null || goods['field11'] == '' || parseInt(goods['field11']) <= 0 ? 1 : parseInt(goods['field11'])
	if (goods['cnt'] == null || goods['cnt'] == '') {
		goods['cnt'] = field11Value
	}
	if (goods['amount'] == null || goods['amount'] == '') {
		goods['amount'] = field11Value
	}
	goodsList.value.push(goods)
}
// 修改列表的数据
const updateListData = (goods: any) => {
	// 找到对应的数据进行修改
	for (let i = 0; i < goodsList.value.length; i++) {
		let item = goodsList.value[i]
		if (item['id'] != null && item['id'] != '' && curUpdateItemId.value != null && curUpdateItemId.value != '' && item['id'].toString() == curUpdateItemId.value.toString()) {
			for (let key in goods) {
				if (key == 'id') continue
				item[key] = goods[key]
			}
			break
		}
	}
}
// 添加的表单重置
const resetGoodsAddForm = () => {
	for (let key in clUpsertOptions) {
		if (key == 'accessoryData') {
			// 附属配件
			clUpsertOptions[key] = []
		} else {
			const options = clUpsertOptions[key]
			if (options != null && options.length > 0) {
				for (let i = 0; i < options.length; i++) {
					let item = options[i]
					// 把这个value值冲掉   这个值只能是 undefined 或者 空字符串，不然点了不会显示建议列表
					item.value = ''
					setDefaultValue4Field(item)
				}
			}
		}
	}
	// tab显示回  基础数据
	addDialogTabsValue.value = 'baseData'
}
/** 重置 */
const resetForm = () => {
	docInfoForm.value = {
		userId: '',
		name: '',
		date: dayjs(),
		remark: '',
		userInfo: {
			id: '',
			value: '',
		},
	}
	goodsList.value = []
	shoppingListImgUrl.value = ''
	routeParamsId.value = ''
	routeParamsLabel.value = ''
}
/** 关闭添加窗口事件，关闭窗口的时候，如果是修改的情况下，要重置一下表单，不然打开添加的时候，之前的数据会存在 */
const beforeAddDialogClose = (done: any) => {
	if (dialogIsOnUpdate.value) {
		dialogIsOnUpdate.value = false
		resetGoodsAddForm()
	}
	done()
}
/** 添加窗口 点 取消 时，也要检查一下是否是修改的情况，修改的要重置一下表单，不然打开添加的时候，之前的数据会存在 */
const closeAddDialog = () => {
	addDialog.value = false
	if (dialogIsOnUpdate.value) {
		dialogIsOnUpdate.value = false
		resetGoodsAddForm()
	}
}

/** 保存 */
const save = (status: number) => {
	let docObj: any = {
		date: docInfoForm.value.date ? docInfoForm.value.date : '',
		name: docInfoForm.value.name ? docInfoForm.value.name : '',
		remark: docInfoForm.value.remark ? docInfoForm.value.remark : '',
		dataType: '易耗品',
		filePath: shoppingListImgUrl.value,
		status: status == null || status == undefined ? 0 : status,
	}
	if (docInfoForm.value.userInfo.value == docObj.name) docObj.userId = docInfoForm.value.userInfo.id
	let arr = []
	if (goodsList.value != null && goodsList.value.length > 0) {
		for (let i = 0; i < goodsList.value.length; i++) {
			let item = goodsList.value[i]
			let goods = {}
			for (let key in item) {
				if (key == 'id') continue
				if (key == 'accessoryList' && item[key] != null && item[key].length > 0) {
					let list = []
					for (let k = 0; k < item[key].length; k++) {
						const row = item[key][k]
						list.push({
							name: row.name ? row.name : '',
							cnt: row.cnt ? parseInt(row.cnt) : 0,
							sku: row.sku ? row.sku : '',
							buyDate: row.buyDate ? row.buyDate : '',
							price: row.price ? parseFloat(row.price) : 0,
							manufacturer: row.manufacturer ? row.manufacturer : '',
						})
					}
					goods[key] = list
				} else {
					goods[key] = item[key] ? item[key] : ''
				}
			}
			arr.push(goods)
		}
	}
	docObj['goodsList'] = arr
	if (docObj['name'] == null || docObj['name'] == '') {
		ElMessage.info('请填写【入库人】')
		return
	}
	if (docObj['date'] == null || docObj['date'] == '') {
		ElMessage.info('请填写【入库时间】')
		return
	}
	// 调用API保存数据
	if (routeParamsId.value == undefined || routeParamsId.value == null || routeParamsId.value == '') {
		service.assets.pushStorageDoc.pushStorageDocController.add(docObj).then((res) => {
			if (res != null && res.code != null && parseInt(res.code) == 1000) {
				ElMessage.success('保存成功')
				// 重置表单
				resetForm()
			} else {
				ElMessage.error('保存失败')
			}
		})
	} else {
		docObj.id = routeParamsId.value
		service.assets.pushStorageDoc.pushStorageDocController.updateDoc(docObj).then((res) => {
			if (res != null && res.code != null && parseInt(res.code) == 1000) {
				ElMessage.success('保存成功')
				// 重置表单
				resetForm()
				if (status != null && status == 1) {
					// 要把这个入库单从选项里删除，不然他还是能选择
					deleteDocFromSelectOptions(docObj.id)
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
// 限制列表的max-height，超了就显示滚动条
let clientHeight: any = getClientHeight()
const elTableHeight = ref(clientHeight - 620)
window.addEventListener('resize', () => {
	clientHeight = getClientHeight()
	elTableHeight.value = clientHeight - 620
})
function getClientHeight() {
	var winHeight
	if (window.innerHeight) {
		winHeight = window.innerHeight
	} else if (document.body && document.body.clientHeight) {
		winHeight = document.body.clientHeight
	}
	return winHeight
}
</script>
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

	.el-form-item__label {
		min-width: 80px;
		justify-content: left;
	}
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
		// margin-bottom: 20px;
		.details_title {
			font-weight: bold;
		}
	}
	.save_btns {
		margin: 20px 20px 20px 0;
	}
}
.upload__ {
	display: inline-block;
	margin: 0 0 0 12px;
	.cl-upload--file:not(.is-drag) .cl-upload__list {
		display: none;
	}
}
.full-width {
	width: 100%;
}
.input-row {
	margin: 0 0 12px 0;

	.label {
		text-align: right;
		padding: 0 12px;
		line-height: 32px;

		.red {
			color: #ff0000;
			display: inline-block;
			margin: 0 4px 0 0;
			font-style: normal;
		}
	}
}
</style>
