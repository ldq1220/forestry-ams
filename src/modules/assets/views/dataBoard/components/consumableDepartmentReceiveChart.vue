<template>
	<div class="consumableReceive_box">
		<div class="consumableReceive_header">
			<cl-row>
				<h3>易耗品各部门领用情况</h3>

				<div class="timer_picker">
					<el-date-picker v-model="timer" type="month" placeholder="选择月" :clearable="false" @change="handleChangeTimer" />
				</div>
			</cl-row>
		</div>
		<div id="consumableReceive"></div>
	</div>
</template>

<script setup lang="ts" name="consumableReceiveChart">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { useCool } from '/@/cool'
import dayjs from 'dayjs'
import { checkPerm } from '/$/base'

const { service } = useCool()

onMounted(() => {
	getData()
})

const timer = ref(dayjs().format('YYYY-MM'))
const chartData = ref()
const series = ref()

const handleChangeTimer = (value: string | number | dayjs.Dayjs | Date | null | undefined) => {
	timer.value = dayjs(value).format('YYYY-MM')
	getData()
}

const getData = () => {
	const permission = checkPerm(service.assets.chart.dataBoardController.permission.getConsumableDeptGetChartData)
	if (permission) {
		service.assets.chart.dataBoardController
			.getConsumableDeptGetChartData({
				startDate: timer.value,
			})
			.then((res) => {
				chartData.value = res
				series.value = res.seriesData.map((item: { name: any; data: any }) => {
					return {
						name: item.name,
						type: 'line',
						stack: 'Total',
						data: item.data,
					}
				})
				getChart()
			})
	}
}

const getChart = () => {
	var consumableReceive: any = document.getElementById('consumableReceive')
	var myChart = echarts.init(consumableReceive)
	var option

	option = {
		tooltip: {
			trigger: 'axis',
		},
		legend: {
			data: chartData.value.legendData,
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true,
		},
		toolbox: {
			feature: {
				saveAsImage: {},
			},
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: chartData.value.deptData,
		},
		yAxis: {
			type: 'value',
		},
		// series: [
		// 	{
		// 		name: 'Email',
		// 		type: 'line',
		// 		stack: 'Total',
		// 		data: [120, 132, 101, 134, 90, 230, 210],
		// 	},
		// 	{
		// 		name: 'Union Ads',
		// 		type: 'line',
		// 		stack: 'Total',
		// 		data: [220, 182, 191, 234, 290, 330, 310],
		// 	},
		// 	{
		// 		name: 'Video Ads',
		// 		type: 'line',
		// 		stack: 'Total',
		// 		data: [150, 232, 201, 154, 190, 330, 410],
		// 	},
		// 	{
		// 		name: 'Direct',
		// 		type: 'line',
		// 		stack: 'Total',
		// 		data: [320, 332, 301, 334, 390, 330, 320],
		// 	},
		// 	{
		// 		name: 'Search Engine',
		// 		type: 'line',
		// 		stack: 'Total',
		// 		data: [820, 932, 901, 934, 1290, 1330, 1320],
		// 	},
		// ],
		series: series.value,
	}

	option && myChart.setOption(option)

	// 实现自适应效果
	window.addEventListener('resize', () => {
		myChart.resize()
	})
}
</script>

<style lang="scss">
.consumableReceive_box {
	.el-date-editor.el-input {
		width: 140px;
	}
}
</style>

<style scoped lang="scss">
.consumableReceive_box {
	width: 100%;
	margin-top: 20px;
	background-color: #fff;
	padding: 20px;
	h3 {
		color: #525252;
		margin-right: 40px;
	}
}
#consumableReceive {
	width: 100%;
	margin-top: 20px;
	height: 468px;
}
</style>
