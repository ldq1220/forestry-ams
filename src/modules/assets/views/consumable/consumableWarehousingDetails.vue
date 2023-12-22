<template>
	<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
		<el-tab-pane label="&nbsp;&nbsp;&nbsp;&nbsp;入库单&nbsp;&nbsp;&nbsp;&nbsp;" name="first"></el-tab-pane>
		<el-tab-pane label="&nbsp;&nbsp;&nbsp;&nbsp;明细&nbsp;&nbsp;&nbsp;&nbsp;" name="second"></el-tab-pane>
		<el-tab-pane label="&nbsp;&nbsp;&nbsp;&nbsp;汇总&nbsp;&nbsp;&nbsp;&nbsp;" name="third"></el-tab-pane>
	</el-tabs>

	<cl-crud ref="Crud" v-if="flag">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />

			<cl-flex1 />

			<!-- 入库日期筛选 -->
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

			<!-- 关键字搜索 -->
			<cl-search-key placeholder="搜索 入库人/备注" />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table">
				<!-- 展开信息 -->
				<template #column-goodslist="{ scope }">
					<div>
						<div style="padding: 0 5%; margin: 12px 0 6px 0; font-weight: bold; font-size: 15px">
							<el-text>资产清单</el-text>
						</div>
						<el-table :data="scope.row.goodsList" :stripe="true" style="width: 90%; margin: 0 5% 12px 5%" table-layout="fixed" :border="true">
							<el-table-column type="index" fixed align="center" />
							<el-table-column type="expand" style="background-color: #efefef" fixed>
								<template #default="props">
									<div>
										<div v-if="props.row.accessoryList != null && props.row.accessoryList.length > 0">
											<div style="padding: 0 2.5%; margin: 12px 0 6px 0; font-weight: bold; font-size: 15px">
												<el-text>附属配件列表</el-text>
											</div>
											<el-table :data="props.row.accessoryList" :stripe="true" :border="true" style="width: 95%; margin: 0 2.5% 12px 2.5%">
												<el-table-column type="index" align="center" />
												<el-table-column label="配件名称" prop="name" header-align="center" />
												<el-table-column label="规格型号" prop="sku" header-align="center" />
												<el-table-column label="数量" prop="cnt" header-align="center" />
												<el-table-column label="购置日期" prop="buyDate" header-align="center" />
												<el-table-column label="原值(元)" prop="price" header-align="center" />
												<el-table-column label="生产厂商" prop="manufacturer" header-align="center" />
											</el-table>
										</div>
										<div v-if="props.row.accessoryList == null || props.row.accessoryList.length <= 0">
											<el-empty :image-size="72" description="暂无其他配件" />
										</div>
									</div>
								</template>
							</el-table-column>
							<el-table-column prop="customNo" label="资产编号" header-align="center" align="left" width="300" fixed />
							<el-table-column prop="field3" label="资产名称" header-align="center" align="left" width="300" fixed />
							<el-table-column prop="cnt" label="数量" header-align="center" align="center" width="150" />
							<el-table-column prop="fieldnull" label="规划型号" header-align="center" align="left" width="200" />
							<el-table-column prop="field14" label="资产状态" header-align="center" align="center" width="150" />
							<el-table-column prop="field2" label="资产分类" header-align="center" align="left" width="300" />
							<el-table-column prop="field35" label="存放地点" header-align="center" align="center" width="200" />
							<el-table-column prop="field87" label="管理部门" header-align="center" align="center" width="300" />
							<el-table-column prop="field17" label="管理人" header-align="center" align="center" width="150" />
							<el-table-column prop="field69" label="入库日期" header-align="center" align="center" width="150">
								<template #default="scope2">
									{{ scope2.row.field55?.slice(0, 10) }}
								</template>
							</el-table-column>
						</el-table>
					</div>
				</template>
				<template #column-op="{ scope }">
					<!-- 打印 -->
					<el-tooltip content="打印" placement="top">
						<el-button v-print="printObj" link size="small" @click="printPage(scope.row)">打印</el-button>
					</el-tooltip>
					<!-- 导出 -->
					<el-tooltip content="导出" placement="top">
						<cl-export-btn link type="primary" size="small" :columns="exportColsArr" :data="getExportExcelData(scope.row)" :filename="'入库单导出-' + new Date().getTime()" />
					</el-tooltip>
					<!-- 结束入库 -->
					<el-tooltip content="结束入库，确定结束之后，将不能再对这个入库单进行修改" placement="top">
						<el-button
							link
							type="danger"
							size="small"
							@click="updateStatus(scope.row)"
							v-if="scope.row.status == null || parseInt(scope.row.status) != 1"
							v-permission="service.assets.pushStorageDoc.pushStorageDocController.permission.updateStatus"
						>
							结束入库
						</el-button>
					</el-tooltip>
					<el-tooltip content="对入库单、资产清单进行修改" placement="top">
						<el-button
							link
							size="small"
							v-if="scope.row.status == null || parseInt(scope.row.status) != 1"
							v-permission="service.assets.pushStorageDoc.pushStorageDocController.permission.updateDoc"
						>
							<!-- 修改 -->
							<router-link :to="'/assets/counumablePutStorage?id=' + scope.row.id">修改</router-link>
						</el-button>
					</el-tooltip>
					<el-tooltip content="删除入库单" placement="top">
						<el-button link type="danger" size="small" @click="deleteDoc(scope.row)" v-permission="service.assets.pushStorageDoc.pushStorageDocController.permission.deleteDoc">
							删除
						</el-button>
					</el-tooltip>
				</template>
			</cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>
	</cl-crud>

	<!-- 明细 -->
	<consumableWarehousingCollect v-else-if="flag2" />
	<!-- 汇总 -->
	<consumableWarehousingCollectSummary v-else />

	<!-- 打印 -->
	<el-form :model="printItem.item" style="position: absolute; top: -99999px; left: -99999px">
		<div ref="print_dom" id="print_dom">
			<h2 style="width: 100%; text-align: center">入库单</h2>
			<div>
				<table style="width: 100%; border: 1px solid #ddd; border-collapse: collapse">
					<tr>
						<th style="width: 150px; border: 1px solid #ddd; padding: 12px 0">入库人　</th>
						<td style="border: 1px solid #ddd; padding: 12px">{{ printItem.item.name }}</td>
					</tr>
					<tr>
						<th style="width: 150px; border: 1px solid #ddd; padding: 12px 0">入库时间</th>
						<td style="border: 1px solid #ddd; padding: 12px">
							{{ printItem.item.putStorageDate != null ? (printItem.item.putStorageDate.indexOf(' ') != -1 ? printItem.item.putStorageDate.split(' ')[0] : '') : '' }}
						</td>
					</tr>
					<tr>
						<th style="width: 150px; border: 1px solid #ddd; padding: 12px 0">备注　　</th>
						<td style="border: 1px solid #ddd; padding: 12px">{{ printItem.item.remark }}</td>
					</tr>
				</table>
			</div>
			<br />
			<!-- 资产清单 -->
			<div>
				<span>资产清单</span>
			</div>
			<br />
			<div>
				<table :model="printItem.item.goodsList" style="width: 100%; border: 1px solid #ddd; border-collapse: collapse">
					<tr style="width: 100%; border: 1px solid #ddd">
						<th style="width: 60px; border: 1px solid #ddd; padding: 12px 0">序号</th>
						<th style="border: 1px solid #ddd; padding: 12px 0">资产名称</th>
						<th style="border: 1px solid #ddd; padding: 12px 0">财厅编号</th>
						<th style="border: 1px solid #ddd; padding: 12px 0">规格型号</th>
						<th style="width: 100px; border: 1px solid #ddd; padding: 12px 0">数量</th>
						<th style="border: 1px solid #ddd; padding: 12px 0">存放地点</th>
					</tr>
					<el-row v-for="(item, index) in printItem.item.goodsList" :key="index">
						<el-row v-if="item.accessoryList != null && item.accessoryList.length > 0">
							<tr style="width: 100%; border: 1px solid #ddd">
								<td style="width: 60px; border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ index + 1 }}</td>
								<td style="border: 1px solid #ddd; padding: 12px">{{ item.field3 }}</td>
								<td style="border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ item.field4 }}</td>
								<td style="border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ item.fieldnull }}</td>
								<td style="width: 100px; border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ item.cnt }}</td>
								<td style="border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ item.field35 }}</td>
							</tr>
							<tr style="width: 100%; border: 1px solid #ddd">
								<td colspan="6">
									<table
										:model="item.accessoryList"
										v-if="item.accessoryList != null && item.accessoryList.length > 0"
										style="width: 98%; margin: 12px 1%; border: 1px solid #ddd; border-collapse: collapse"
									>
										<tr style="border: 1px solid #ddd">
											<th style="width: 60px; border: 1px solid #ddd; padding: 12px 0">序号</th>
											<th style="border: 1px solid #ddd; padding: 12px 0">配件名称</th>
											<th style="border: 1px solid #ddd; padding: 12px 0">规格型号</th>
											<th style="width: 100px; border: 1px solid #ddd; padding: 12px 0">数量</th>
											<th style="border: 1px solid #ddd; padding: 12px 0">购置日期</th>
											<th style="border: 1px solid #ddd; padding: 12px 0">原值(元)</th>
											<th style="border: 1px solid #ddd; padding: 12px 0">生产厂商</th>
										</tr>
										<tr v-for="(accessoryItem, accessoryIndex) in item.accessoryList" :key="accessoryIndex" style="border: 1px solid #ddd">
											<td style="width: 60px; border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ index + 1 + '.' + (accessoryIndex + 1) }}</td>
											<td style="border: 1px solid #ddd; padding: 12px">{{ accessoryItem.name }}</td>
											<td style="border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ accessoryItem.sku }}</td>
											<td style="width: 100px; border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ accessoryItem.cnt }}</td>
											<td style="border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ accessoryItem.buyDate }}</td>
											<td style="border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ accessoryItem.price }}</td>
											<td style="border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ accessoryItem.manufacturer }}</td>
										</tr>
									</table>
								</td>
							</tr>
						</el-row>
						<el-row v-else>
							<tr style="width: 100%; border: 1px solid #ddd">
								<td style="width: 60px; border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ index + 1 }}</td>
								<td style="border: 1px solid #ddd; padding: 12px">{{ item.field3 }}</td>
								<td style="border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ item.field4 }}</td>
								<td style="border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ item.fieldnull }}</td>
								<td style="width: 100px; border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ item.cnt }}</td>
								<td style="border: 1px solid #ddd; padding: 12px 0; text-align: center">{{ item.field35 }}</td>
							</tr>
						</el-row>
					</el-row>
				</table>
			</div>
		</div>
	</el-form>
</template>

<script lang="ts" name="consumableWarehousingDetails" setup>
import { useCrud, useTable } from '@cool-vue/crud'
import { useCool } from '/@/cool'
import { ref, reactive } from 'vue'
import dayjs from 'dayjs'
import { type TabsPaneContext } from 'element-plus'
import consumableWarehousingCollect from './components/consumableWarehousingCollect.vue'
import consumableWarehousingCollectSummary from './components/consumableWarehousingCollectSummary.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const { service } = useCool()

const activeName = ref('first')
const flag = ref(true)
const flag2 = ref(false)

const handleClick = (tab: TabsPaneContext) => {
	if (tab.paneName === 'second') {
		flag.value = false
		flag2.value = true
	} else if (tab.paneName === 'third') {
		flag.value = false
		flag2.value = false
	} else {
		flag.value = true
		flag2.value = false
	}
}

const putStorageTime: any = ref([]) // 入库日期
// 入库日期搜素
const handlePutStorageTime = () => {
	// if (putStorageTime.value == null) {
	// 	putStorageTime.value = []
	// 	refresh()
	// } else {
	// 	refresh()
	// }
}

// cl-table
const Table = useTable({
	defaultSort: {
		prop: 'putStorageDate',
		order: 'descending',
	},
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
		// 展开列
		{
			label: '',
			type: 'expand',
			prop: 'goodslist',
			width: 40,
		},
		{
			label: '入库人',
			prop: 'name',
			sortable: true,
			width: 200,
		},
		{
			label: '入库日期',
			prop: 'putStorageDate',
			sortable: 'desc',
			formatter: function (row, column, value) {
				return value ? (value.indexOf(' ') != -1 ? value.split(' ')[0] : value) : ''
			},
			width: 200,
		},
		{
			label: '资产清单(数量)',
			prop: 'cnt',
			formatter: function (row) {
				return row != null && row.goodsList != null ? row.goodsList.length : ''
			},
			width: 200,
		},
		{
			label: '备注',
			prop: 'remark',
			sortable: true,
		},
		{
			label: '操作',
			prop: 'op',
			width: 350,
		},
	],
})

// cl-crud
const Crud = useCrud(
	{
		service: service.assets.pushStorageDoc.pushStorageDocController,
		dict: {
			api: {
				page: 'getConsumableAssetsPutStorageDocByPage',
			},
		},
		async onRefresh(params, { next, render }) {
			if (putStorageTime.value != null && putStorageTime.value.length > 0) {
				params['putStorageStartDate'] = dayjs(putStorageTime.value[0]).format('YYYY-MM-DD') // 入库日期（开始）
				params['putStorageEndDate'] = dayjs(putStorageTime.value[1]).format('YYYY-MM-DD') // 入库日期（结束）
			} else {
				params['putStorageStartDate'] = undefined // 入库日期（开始）
				params['putStorageEndDate'] = undefined // 入库日期（结束）
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

// 导出   excel格式
const exportColsArr = ref([
	{
		label: '入库人',
		prop: 'col1',
	},
	{
		label: '入库日期',
		prop: 'col2',
	},
	{
		label: '资产清单(数量)',
		prop: 'col3',
	},
	{
		label: '备注',
		prop: 'col4',
	},
	{
		label: '',
		prop: 'col5',
	},
	{
		label: '',
		prop: 'col6',
	},
	{
		label: '',
		prop: 'col7',
	},
	{
		label: '',
		prop: 'col8',
	},
	{
		label: '',
		prop: 'col9',
	},
	{
		label: '',
		prop: 'col10',
	},
	{
		label: '',
		prop: 'col11',
	},
	{
		label: '',
		prop: 'col12',
	},
])
const getExportExcelData = (item: any) => {
	let data = []
	// 第1行  写入的是入库单的基础数据
	data.push({
		col1: item && item.name ? item.name : '',
		col2: item && item.putStorageDate ? (item.putStorageDate.indexOf(' ') != -1 ? item.putStorageDate.split(' ')[0] : item.putStorageDate) : '',
		col3: item != null && item.goodsList != null ? item.goodsList.length : '',
		col4: item && item.remark ? item.remark : '',
		col5: '',
		col6: '',
		col7: '',
		col8: '',
		col9: '',
		col10: '',
		col11: '',
		col12: '',
	})
	// 第2行  写入一个小标题 资产清单
	data.push({
		col1: '',
		col2: '资产清单',
		col3: '',
		col4: '',
		col5: '',
		col6: '',
		col7: '',
		col8: '',
		col9: '',
		col10: '',
		col11: '',
		col12: '',
	})
	// 第3行  写入资产清单需要的标题
	data.push({
		col1: '',
		col2: '序号',
		col3: '资产编号',
		col4: '资产名称',
		col5: '数量',
		col6: '规划型号',
		col7: '资产状态',
		col8: '资产分类',
		col9: '存放低点',
		col10: '管理部门',
		col11: '管理人',
		col12: '入库日期',
	})
	// 第4行开始  写入资产清单数据
	if (item != null && item.goodsList != null && item.goodsList.length > 0) {
		for (let i = 0; i < item.goodsList.length; i++) {
			// 写入这个资产物品的数据(占一行)
			const goods = item.goodsList[i]
			data.push({
				col1: '',
				col2: i + 1,
				col3: goods.customNo ? goods.customNo : '',
				col4: goods.field3 ? goods.field3 : '',
				col5: goods.cnt ? goods.cnt : '',
				col6: goods.fieldnull ? goods.fieldnull : '',
				col7: goods.field14 ? goods.field14 : '',
				col8: goods.field2 ? goods.field2 : '',
				col9: goods.field35 ? goods.field35 : '',
				col10: goods.field87 ? goods.field87 : '',
				col11: goods.field17 ? goods.field17 : '',
				col12: goods.field69 ? goods.field69 : '',
			})

			// 检查是否存在配件数据
			const accessoryList = goods.accessoryList != null && goods.accessoryList.length > 0 ? goods.accessoryList : null
			if (accessoryList != null) {
				// 写入配件信息
				data.push({
					col1: '',
					col2: '',
					col3: '附属配件列表',
					col4: '',
					col5: '',
					col6: '',
					col7: '',
					col8: '',
					col9: '',
					col10: '',
					col11: '',
					col12: '',
				})
				data.push({
					col1: '',
					col2: '',
					col3: '序号',
					col4: '配件名称',
					col5: '规格型号',
					col6: '数量',
					col7: '购置日期',
					col8: '原值(元)',
					col9: '生产厂商',
					col10: '',
					col11: '',
					col12: '',
				})
				for (let k = 0; k < accessoryList.length; k++) {
					const accessory = accessoryList[k]
					data.push({
						col1: '',
						col2: '',
						col3: k + 1,
						col4: accessory.name ? accessory.name : '',
						col5: accessory.sku ? accessory.sku : '',
						col6: accessory.cnt ? accessory.cnt : '',
						col7: accessory.buyDate ? accessory.buyDate : '',
						col8: accessory.price ? accessory.price : '',
						col9: accessory.manufacturer ? accessory.manufacturer : '',
						col10: '',
						col11: '',
						col12: '',
					})
				}
			}
		}
	}
	return data
}

// 打印
const printItem: any = reactive({
	item: {},
})
const print_dom = ref()
let printObj = reactive({
	id: 'print_dom', //绑定打印区域id
	popTitle: '', //内容标签
})
const printPage = (item: any) => {
	printItem.item = item
}

// 结束入库
const updateStatus = (item: any) => {
	ElMessageBox.confirm('确定要结束入库吗?', '确认操作', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			service.assets.pushStorageDoc.pushStorageDocController
				.updateStatus({
					id: item.id.toString(),
					status: 1,
				})
				.then((resp) => {
					if (resp != null && resp.code == 1000) {
						ElMessage.success('操作成功')
						// 刷新列表
						Crud.value?.refresh()
					} else {
						ElMessage.error('操作失败')
					}
				})
		})
		.catch(() => {})
}
// 删除  入库单
const deleteDoc = (item: any) => {
	ElMessageBox.confirm('确定要删除入库单吗?', '确认操作', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			service.assets.pushStorageDoc.pushStorageDocController
				.deleteDoc({
					id: item.id.toString(),
					status: 1,
				})
				.then((resp) => {
					if (resp != null && resp.code == 1000) {
						ElMessage.success('删除成功')
						// 刷新列表
						Crud.value?.refresh()
					} else {
						ElMessage.error('删除失败')
					}
				})
		})
		.catch(() => {})
}
</script>

<style lang="scss">
.demo-tabs {
	.el-tabs__item {
		font-weight: bold;
	}
	.el-tabs--top .el-tabs__item.is-top:last-child {
		padding-left: 0;
	}
}
</style>
