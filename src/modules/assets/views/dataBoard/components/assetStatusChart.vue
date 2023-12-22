<template>
	<div class="assetStatus_box">
		<div class="assetStatus_header">
			<cl-row>
				<h3>资产状态图</h3>

				<cl-flex1 />

				<div class="timer_picker">
					<el-date-picker v-model="timer" style="width: 300px" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" @change="handleChangeTimer" />
				</div>

				<el-select v-model="assetsValue" class="m-2" style="width: 140px" @change="handleChangeStatus">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</cl-row>
		</div>
		<div id="assetStatus" v-loading="loading"></div>
	</div>
</template>

<script setup lang="ts" name="assetStatusChart">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { useCool } from '/@/cool'
import dayjs from 'dayjs'
import { checkPerm } from '/$/base'

const { service } = useCool()

onMounted(() => {
	endDate.value = dayjs().format('YYYY-MM')
	startDate.value = dayjs().subtract(5, 'month').format('YYYY-MM')
	getChartData()
})

const loading = ref(false)
const timer = ref()
const startDate = ref()
const endDate = ref()
const assetsValue = ref('固定资产')
const chartData = ref()
const options = [
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
]

const handleChangeTimer = (value: (string | number | dayjs.Dayjs | Date | null | undefined)[] | null) => {
	if (value == null) {
		endDate.value = dayjs().format('YYYY-MM')
		startDate.value = dayjs().subtract(5, 'month').format('YYYY-MM')
	} else {
		startDate.value = dayjs(value[0]).format('YYYY-MM')
		endDate.value = dayjs(value[1]).format('YYYY-MM')
	}

	getChartData()
}
const handleChangeStatus = () => {
	getChartData()
}

const getChartData = () => {
	const permission = checkPerm(service.assets.chart.dataBoardController.permission.getAssetsStatusChartData)
	if (permission) {
		loading.value = true
		service.assets.chart.dataBoardController
			.getAssetsStatusChartData({
				dataType: assetsValue.value,
				startDate: startDate.value,
				endDate: endDate.value,
			})
			.then((res) => {
				loading.value = false
				chartData.value = res
				getChart()
			})
	}
}
const getChart = () => {
	var app: any = {
		configParameters: {},
		config: {},
	}

	var assetStatus: any = document.getElementById('assetStatus')
	var myChart = echarts.init(assetStatus)
	var option

	const posList = [
		'left',
		'right',
		'top',
		'bottom',
		'inside',
		'insideTop',
		'insideLeft',
		'insideRight',
		'insideBottom',
		'insideTopLeft',
		'insideTopRight',
		'insideBottomLeft',
		'insideBottomRight',
	] as const

	app.configParameters = {
		rotate: {
			min: -90,
			max: 90,
		},
		align: {
			options: {
				left: 'left',
				center: 'center',
				right: 'right',
			},
		},
		verticalAlign: {
			options: {
				top: 'top',
				middle: 'middle',
				bottom: 'bottom',
			},
		},
		position: {
			options: posList.reduce(function (map, pos) {
				map[pos] = pos
				return map
			}, {} as Record<string, string>),
		},
		distance: {
			min: 0,
			max: 100,
		},
	}

	app.config = {
		rotate: 90,
		align: 'left',
		verticalAlign: 'middle',
		position: 'insideBottom',
		distance: 15,
		onChange: function () {
			const labelOption: BarLabelOption = {
				rotate: app.config.rotate as BarLabelOption['rotate'],
				align: app.config.align as BarLabelOption['align'],
				verticalAlign: app.config.verticalAlign as BarLabelOption['verticalAlign'],
				position: app.config.position as BarLabelOption['position'],
				distance: app.config.distance as BarLabelOption['distance'],
			}
			myChart.setOption<echarts.EChartsOption>({
				series: [
					{
						label: labelOption,
					},
					{
						label: labelOption,
					},
					{
						label: labelOption,
					},
					{
						label: labelOption,
					},
				],
			})
		},
	}

	type BarLabelOption = NonNullable<echarts.BarSeriesOption['label']>

	const labelOption: BarLabelOption = {
		show: true,
		position: app.config.position as BarLabelOption['position'],
		distance: app.config.distance as BarLabelOption['distance'],
		align: app.config.align as BarLabelOption['align'],
		verticalAlign: app.config.verticalAlign as BarLabelOption['verticalAlign'],
		rotate: app.config.rotate as BarLabelOption['rotate'],
		formatter: '{c}  {name|{a}}',
		fontSize: 16,
		rich: {
			name: {},
		},
	}

	option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		legend: {
			data: chartData.value.legendData,
		},
		// toolbox: {
		// 	show: true,
		// 	orient: 'vertical',
		// 	left: 'right',
		// 	top: 'center',
		// 	feature: {
		// 		mark: { show: true },
		// 		dataView: { show: true, readOnly: false },
		// 		magicType: { show: true, type: ['line', 'bar', 'stack'] },
		// 		restore: { show: true },
		// 		saveAsImage: { show: true },
		// 	},
		// },
		xAxis: [
			{
				type: 'category',
				axisTick: { show: false },
				data: chartData.value.monthData,
			},
		],
		yAxis: [
			{
				type: 'value',
			},
		],
		series: [
			{
				name: '在用',
				type: 'bar',
				label: labelOption,
				emphasis: {
					focus: 'series',
				},
				data: chartData.value.seriesData[0].data,
			},
			{
				name: '出租',
				type: 'bar',
				label: labelOption,
				emphasis: {
					focus: 'series',
				},
				data: chartData.value.seriesData[1].data,
			},
			{
				name: '出借',
				type: 'bar',
				label: labelOption,
				emphasis: {
					focus: 'series',
				},
				data: chartData.value.seriesData[2].data,
			},
			{
				name: '库存',
				type: 'bar',
				label: labelOption,
				emphasis: {
					focus: 'series',
				},
				data: chartData.value.seriesData[3].data,
			},
		],
	}

	option && myChart.setOption(option)

	// 实现自适应效果
	window.addEventListener('resize', () => {
		myChart.resize()
	})
}
</script>

<style scoped lang="scss">
.assetStatus_box {
	width: 100%;
	margin-top: 20px;
	background-color: #fff;
	padding: 20px;
	h3 {
		color: #525252;
		margin-right: 40px;
	}
	.timer_picker {
		width: 200px !important;
		margin-right: 140px;
	}
}
#assetStatus {
	width: 100%;
	margin-top: 20px;
	height: 468px;
}
</style>
