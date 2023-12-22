<template>
	<!-- 固定资产领用情况表 ===> 员工 -->
	<cl-row v-permission="service.assets.fixed.assetsFixedGoodsController.permission.getMyReceiveGoodsList">
		<employeeReceiveFiexdAssets />
	</cl-row>

	<!-- 无形资产领用情况表 ===> 员工 -->
	<cl-row v-permission="service.assets.fixed.assetsFixedGoodsController.permission.getMyReceiveGoodsList">
		<employeeReceiveImmaterialAssets />
	</cl-row>

	<!-- 资产状态图 ===> 领导 -->
	<!-- <cl-row v-permission="service.assets.chart.dataBoardController.permission.getAssetsStatusChartData">
		<assetStatusChart />
	</cl-row> -->

	<!-- 固定资产在用情况 -->
	<cl-row v-permission="{ and: [service.assets.chart.dataBoardController.permission.getReceiveData4Charts, service.assets.chart.dataBoardController.permission.getReceiveDetailData] }">
		<fixedInUseAssetsChart />
	</cl-row>

	<!-- 易耗品各部门领用情况 ===> 领导 -->
	<!-- <cl-row v-permission="service.assets.chart.dataBoardController.permission.getConsumableDeptGetChartData">
		<consumableDepartmentReceiveChart />
	</cl-row> -->

	<!-- 无形资产在用情况 -->
	<cl-row v-permission="{ and: [service.assets.chart.dataBoardController.permission.getReceiveData4Charts, service.assets.chart.dataBoardController.permission.getReceiveDetailData] }">
		<immaterialInUseAssetsChart />
	</cl-row>

	<!-- 易耗品领用情况 -->
	<cl-row v-permission="{ and: [service.assets.chart.dataBoardController.permission.getReceiveData4Charts, service.assets.chart.dataBoardController.permission.getReceiveDetailData] }">
		<consumableReceiveChart />
	</cl-row>
</template>

<script setup lang="ts">
// import assetStatusChart from './components/assetStatusChart.vue'
import fixedInUseAssetsChart from './components/fixedInUseAssetsChart.vue'
import consumableReceiveChart from './components/consumableReceiveChart.vue'
// import consumableDepartmentReceiveChart from './components/consumableDepartmentReceiveChart.vue'
import employeeReceiveFiexdAssets from './components/employeeReceiveFiexdAssets.vue'
import employeeReceiveImmaterialAssets from './components/employeeReceiveImmaterialAssets.vue'
import immaterialInUseAssetsChart from './components/immaterialInUseAssetsChart.vue'
import { useCool } from '/@/cool'
const { service } = useCool()
</script>

<style scoped lang="scss"></style>
