<template>
	<div class="consumableReceiveChart_box">
		<h2>无形资产在用情况</h2>
		<div class="header">
			<div class="header_left">
				<div class="item" :class="fixedIsActive ? 'active' : ''" @click="fixedChartHanedle('employee')">按人员查看</div>
				<div class="flag"></div>
				<div class="item" :class="fixedIsActive ? '' : 'active'" @click="fixedChartHanedle('department')">按部门查看</div>
			</div>
		</div>
		<div class="content_box" v-loading="loading">
			<div id="wxInUseAssetsChart" style="height: 600px"></div>
			<div>
				<el-table :data="fixedTableData" stripe height="300" :header-cell-style="{ background: '#F7F7F7', color: '#606266' }">
					<el-table-column type="index" fixed />
					<el-table-column prop="employee" :label="fixedTableColumnName" align="center" fixed />
					<el-table-column v-for="(item, itemIndex) in fixedTableColumns" :key="itemIndex" :prop="'field' + itemIndex" :label="item" align="center">
						<template #default="scope">
							<div class="table_content" @click="viewsDetial(scope.row, '无形资产', itemIndex)">
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
import { useCool } from '/@/cool'
import { checkPerm } from '/$/base'
import { randomColorArr } from '../utils/randomColor'

const { service } = useCool()

onMounted(() => {
	getFixedEcharts()
	loadFixedChartData()
})

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
	const category = type == '无形资产' && index != null ? fixedApiData.value.chart.legend[index].split(']')[1] : ''
	if (goodsCnt > 0 && type == '无形资产') {
		receiveDialogVisible.value = true

		title.value = `${employee}${type}在用情况（${category}）`

		// 调接口数据
		loadReceiveDetailData(type, row, row['field' + index], row['receiveId' + index])
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

//  -------------------------------   无形资产 在用情况   -------------------------------
const loading = ref(false)
const fixedIsActive = ref(true)
const fixedColors = ref(randomColorArr(2))
const fixedCurTab = ref('employee')
const fixedTableColumnName = ref('员工')
const fixedTableData = ref([])
const fixedTableColumns: any = ref([])
const fixedChartHanedle = (type: string) => {
	fixedCurTab.value = type
	if (type === 'employee') {
		fixedIsActive.value = true
		fixedColors.value = randomColorArr(fixedTableColumns.value.length)
		fixedTableColumnName.value = '员工'
	} else {
		fixedIsActive.value = false
		fixedColors.value = randomColorArr(fixedTableColumns.value.length)
		fixedTableColumnName.value = '部门'
	}
	loadFixedChartData()
}
let fixedOption: object
let fixedChart: any
const fixedApiData = ref()
const getFixedEcharts = () => {
	const chartDom = document.getElementById('wxInUseAssetsChart')
	fixedChart = echarts.init(chartDom as any)
	// 颜色
	fixedOption = buildFixedChartOption()
	fixedChart.setOption(fixedOption as any)

	// 实现自适应效果
	window.addEventListener('resize', () => {
		fixedChart.resize()
	})
}
// 调接口获取数据
const loadFixedChartData = () => {
	loading.value = true
	const permission = checkPerm({ and: [service.assets.chart.dataBoardController.permission.getReceiveData4Charts, service.assets.chart.dataBoardController.permission.getReceiveDetailData] })
	if (permission) {
		const params = {}
		// 无形资产  在用情况
		params['dataType'] = fixedCurTab.value
		params['assetsType'] = '无形资产'
		service.assets.chart.dataBoardController.getReceiveData4Charts(params).then((data: any) => {
			loading.value = false
			// 把数据挂到chart上
			fixedApiData.value = data
			fixedTableColumns.value = data.chart.legend
			fixedTableColumns.value = fixedTableColumns.value.map((item: string) => {
				return item.split(']')[1]
			})
			fixedApiData.value.chart.series.forEach((item: { name: string }) => {
				item.name = item.name.split(']')[1]
			})

			// 生成新的option
			const chartOption = buildFixedChartOption()
			fixedChart.setOption(chartOption as any)

			// 刷新列表的数据
			fixedTableData.value = fixedApiData.value['table']

			fixedColors.value = randomColorArr(fixedTableColumns.value.length)
			getFixedEcharts()
		})
	}
}
const buildFixedChartOption = () => {
	let legend: string[] = [],
		xAxis: string[] = [],
		series: { name: string; type: string; yAxisIndex: number; data: any[] }[] = []
	if (fixedApiData.value == null || fixedApiData.value.chart == null || fixedApiData.value.chart.legend == null || fixedApiData.value.chart.legend.length <= 0) {
		// 没有数据，写几个空的
		legend = ['人员管理系统', '资产管理系统']
		series = [
			{
				name: '人员管理系统',
				type: 'bar',
				yAxisIndex: 0,
				data: [],
			},
			{
				name: '资产管理系统',
				type: 'bar',
				yAxisIndex: 0,
				data: [],
			},
		]
	} else {
		legend = fixedTableColumns.value
		xAxis = fixedApiData.value.chart.xAxis
		series = fixedApiData.value.chart.series
	}
	return {
		color: fixedColors.value,
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
			formatter: (params: any[]) => {
				// 构建 tooltip 内容
				let data: any = []

				params.forEach((item) => {
					if (item.value != 0) {
						data.push(item)
					}
				})

				const tem = data
					.map(
						(item: any, index: any) => `
                                <div :key="${index}" style="display: flex">
									<div style="display: flex">
										<span style="display: inline-block; transform: translateY(4px); width: 15px; height: 15px; border-radius: 50%; background-color: ${item.color};">
										</span>
                                    	<div style="font-size: 14px;margin: 0 20px 0 5px">${item.seriesName}</div>
									</div>
                                    <div style="font-size: 14px;font-weight:bold;margin: 0 20px 0 0px">${item.value}</div>
                                </div>
                        `,
					)
					.join('')
				const tooltipHtml = `
                    <div style="display: flex; align-items: center;">
                         <div style="margin-left:20px;">
                            <div>${params[0].axisValue}</div>
							${tem}
                        </div>
                    </div>
                `
				return tooltipHtml
			},
		},
		grid: {
			right: '20%',
			top: '40%',
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
}
//  -------------------------------   无形资产 在用情况   -------------------------------
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
