<template>
	<div class="consumableReceiveChart_box">
		<h2>易耗品领用情况</h2>
		<div class="header">
			<div class="header_left">
				<div class="item" :class="isActive ? 'active' : ''" @click="hanedle('employee')">按人员查看</div>
				<div class="flag"></div>
				<div class="item" :class="isActive ? '' : 'active'" @click="hanedle('department')">按部门查看</div>
			</div>
			<div class="header_right">
				<div class="item" :class="time === '近七天' ? 'active' : ''" @click="handleChangeTime('sevenDays')">近七天</div>
				<div class="item" :class="time === '近30天' ? 'active' : ''" @click="handleChangeTime('thirtyDays')">近30天</div>
				<div class="item">
					<el-date-picker
						v-model="timeValue"
						type="daterange"
						range-separator="至"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
						style="width: 300px"
						:clearable="false"
						@change="handleChangeTime('picker')"
					/>
				</div>
			</div>
		</div>
		<div id="consumableReceiveChart"></div>
		<div>
			<el-table :data="tableData" stripe height="300" :header-cell-style="{ background: '#F7F7F7', color: '#606266' }">
				<el-table-column type="index" fixed />
				<el-table-column prop="employee" :label="tableColumnName" align="center" fixed />
				<el-table-column v-for="(item, itemIndex) in tableColumns" :key="itemIndex" :prop="'field' + itemIndex" :label="item" align="center">
					<template #default="scope">
						<div class="table_content" @click="viewsDetial(scope.row, '易耗品', itemIndex)">
							<!-- {{ scope.row['field' + itemIndex].length }} -->
							{{ scope.row['getCnt' + itemIndex] }}
						</div>
					</template>
				</el-table-column>
				<template #empty>
					<el-empty :image-size="100" />
				</template>
			</el-table>
		</div>
	</div>

	<!-- 领用详情弹窗 -->
	<receiveDetailDialog
		:receiveDialogVisible="receiveDialogVisible"
		:receiveDetailData="receiveDetailData"
		:receiveDetailDataType="receiveDetailDataType"
		:title="title"
		@handleCloseDialog="handleCloseDialog"
	/>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import receiveDetailDialog from './receiveDetailDialog.vue'
import dayjs from 'dayjs'
import { useCool } from '/@/cool'
import { checkPerm } from '/$/base'
import { randomColorArr } from '../utils/randomColor'

const { service } = useCool()

const colors = ref(randomColorArr(2))
const isActive = ref(true)
const time = ref('近七天') // 近七天 || 近30天
const timeValue: any = ref([])
const curTab = ref('employee')
const tableColumnName = ref('员工')
const tableColumns = ref([])

onMounted(() => {
	// 默认是近7天
	timeValue.value.push(dayjs().add(-6, 'day').format('YYYY-MM-DD'))
	timeValue.value.push(dayjs().format('YYYY-MM-DD'))
	getEcharts()
	loadChartData()

	colors.value = randomColorArr(50)
	// setTimeout(() => {
	// 	console.log('tableColumns.value----------------', tableColumns.value)
	// 	colors.value = randomColorArr(tableColumns.value.length)
	// }, 100)
})

// 切换 按人员查看/按部门查看
const hanedle = (type: string) => {
	curTab.value = type
	if (type === 'employee') {
		isActive.value = true
		// colors.value = randomColorArr(tableColumns.value.length)
		tableColumnName.value = '员工'
	} else {
		isActive.value = false
		// colors.value = randomColorArr(tableColumns.value.length)
		tableColumnName.value = '部门'
	}
	loadChartData()
}

// 选择时间
const handleChangeTime = (type: string) => {
	if (type === 'sevenDays') {
		// tab不切换
		timeValue.value = []
		time.value = '近七天'
		// 把日期计算出来，并写到选择框中
		timeValue.value.push(dayjs().add(-6, 'day').format('YYYY-MM-DD'))
		timeValue.value.push(dayjs().format('YYYY-MM-DD'))
	} else if (type === 'thirtyDays') {
		timeValue.value = []
		time.value = '近30天'
		// 把日期计算出来，并写到选择框中
		timeValue.value.push(dayjs().add(-29, 'day').format('YYYY-MM-DD'))
		timeValue.value.push(dayjs().format('YYYY-MM-DD'))
	} else if (type === 'picker') {
		time.value = '选择时间'
	}
	loadChartData()
}

const tableData = ref([])

// 领用详情弹窗
const receiveDialogVisible = ref(false)
const title = ref('领用详情')
const handleCloseDialog = () => {
	receiveDialogVisible.value = false
}
const viewsDetial = (row: any, type: string, index?: number) => {
	const employee = row['employee'] != null ? row['employee'] : ''
	// 先检查一下是不是0，是0就不要显示弹窗了
	const goodsCnt = row['field' + index] != null ? row['field' + index].length : 0
	const category = type == '易耗品' && index != null ? apiData.value.chart.legend[index] : ''
	if (goodsCnt > 0 && type == '易耗品') {
		receiveDialogVisible.value = true

		if (type == '易耗品') {
			if (time.value === '近七天') {
				title.value = `${employee}${type}领用情况（${category} ${time.value}）`
			} else if (time.value === '近30天') {
				title.value = `${employee}${type}领用情况（${category} ${time.value}）`
			} else {
				let start = dayjs(timeValue.value[0]).format('YYYY/MM/DD')
				let end = dayjs(timeValue.value[1]).format('YYYY/MM/DD')
				title.value = `${employee}${type}领用情况（${category} ${start} 至 ${end}）`
			}
		}

		// 调接口数据
		loadReceiveDetailData(type, row, row['field' + index], row['receiveId' + index])
	}
}

let option: object
let myChart: any

const apiData = ref()
const getEcharts = () => {
	const chartDom = document.getElementById('consumableReceiveChart')
	myChart = echarts.init(chartDom as any)
	// 颜色
	option = buildChartOption()
	myChart.setOption(option as any)

	// 实现自适应效果
	window.addEventListener('resize', () => {
		myChart.resize()
	})
}

// 把数据按chart的option格式组合
const buildChartOption = () => {
	// console.log(apiData.value)
	let legend: string[] = [],
		xAxis: string[] = [],
		series: { name: string; type: string; yAxisIndex: number; data: any[] }[] = []
	// 检查一下是否有数据，没有数据要做一个空的
	if (apiData.value == null || apiData.value.chart == null || apiData.value.chart.legend == null || apiData.value.chart.legend.length <= 0) {
		legend = ['笔类', '册类']
		series = [
			{
				name: '笔类',
				type: 'bar',
				yAxisIndex: 0,
				data: [],
			},
			{
				name: '册类',
				type: 'bar',
				yAxisIndex: 0,
				data: [],
			},
		]
	} else {
		legend = apiData.value.chart.legend
		xAxis = apiData.value.chart.xAxis
		series = apiData.value.chart.series
	}
	return {
		color: colors.value,
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
		},
		grid: {
			right: '20%',
			top: '20%',
		},
		legend: {
			data: legend,
			top: '5%',
		},
		xAxis: [
			{
				type: 'category',
				axisTick: {
					alignWithLabel: true,
				},
				data: xAxis,
			},
		],
		yAxis: [
			{
				type: 'value',
				position: 'left',
				alignTicks: true,
				axisLine: {
					show: false,
					lineStyle: {
						color: '#9D9FA5',
					},
				},
			},
		],
		series: series,
	}
	return option
}

// 调接口获取数据
const loadChartData = async () => {
	const permission = checkPerm({ and: [service.assets.chart.dataBoardController.permission.getReceiveData4Charts, service.assets.chart.dataBoardController.permission.getReceiveDetailData] })
	if (permission) {
		const params = geQueryParams()
		// 易耗品  领用情况
		params['assetsType'] = '易耗品'
		await service.assets.chart.dataBoardController.getReceiveData4Charts(params).then((data: any) => {
			// 把数据挂到chart上
			apiData.value = data
			// 生成新的option
			const chartOption = buildChartOption()
			// console.log(chartOption)
			myChart.setOption(chartOption as any)

			tableColumns.value = data.chart.legend

			// 刷新列表的数据
			tableData.value = apiData.value['table']

			getEcharts()
		})
	}
}

// 查询参数
const geQueryParams = () => {
	return {
		dataType: curTab.value,
		startDate: timeValue.value != null && timeValue.value.length > 0 ? dayjs(timeValue.value[0]).format('YYYY-MM-DD') : '',
		endDate: timeValue.value != null && timeValue.value.length > 1 ? dayjs(timeValue.value[1]).format('YYYY-MM-DD') : '',
	}
}

// 请求领用详情数据
const receiveDetailData = ref()
const receiveDetailDataType = ref()
const loadReceiveDetailData = (type: any, row: any, ids: any, receiveIds: any) => {
	service.assets.chart.dataBoardController
		.getReceiveDetailData({
			goodsIds: ids.join(','),
			receiveIds: receiveIds.join(','),
			dataType: type,
			docIds: type != null && type == '易耗品' ? (row['docIds'] != null && row['docIds'].length > 0 ? row['docIds'].join(',') : null) : null,
		})
		.then((data: any) => {
			receiveDetailData.value = data
			receiveDetailDataType.value = type
		})
}
</script>

<style scoped lang="scss">
.consumableReceiveChart_box {
	background-color: #fff;
	padding: 40px;
	box-sizing: border-box;
	margin-bottom: 20px;
	width: 100%;
	display: flex;
	flex-direction: column;
	h2 {
		font-size: 18px;
		color: #464646;
		margin-bottom: 20px;
	}
	.header {
		display: flex;
		justify-content: space-between;
		.header_left,
		.header_right {
			display: flex;
			align-items: center;
			.item {
				cursor: pointer;
				font-size: 14px;
				color: #6d6d6d;
				font-weight: bold;
			}
			.item.active {
				color: #eb5f29;
			}
			.item:hover {
				color: #eb5f29;
			}
			.flag {
				width: 2px;
				height: 24px;
				background-color: #808080;
				margin: 0 20px;
			}
		}
		.header_right {
			.item {
				margin-left: 20px;
			}
		}
	}
	.flex_box {
		display: flex;
	}
	#consumableReceiveChart {
		// width: 70%;
		height: 400px;
	}
	.table {
		margin-left: 0px;
		width: 30%;
		margin-top: 50px;
	}
	.table_content {
		cursor: pointer;
	}
}
</style>
