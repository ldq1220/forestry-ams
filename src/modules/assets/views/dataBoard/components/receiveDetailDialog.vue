<template>
	<cl-dialog :title="props.title" v-model="visible" :controls="['close']" @close="closeDialog">
		<div class="table">
			<el-table :data="receiveDetailData" border height="400" :header-cell-style="{ background: '#F7F7F7', color: '#606266' }">
				<el-table-column type="index" width="50" title="序号" align="center" />
				<el-table-column prop="customNo" label="编号" align="center" />
				<el-table-column prop="goodsName" label="资产名称" align="center">
					<template #default="scope">
						<el-text v-if="receiveDetailDataType == '固定资产'">{{ scope.row.field41 }}</el-text>
						<el-text v-if="receiveDetailDataType == '无形资产'">{{ scope.row.field3 }}</el-text>
						<el-text v-if="receiveDetailDataType == '易耗品'">{{ scope.row.field3 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="category" label="分类" align="center">
					<template #default="scope">
						<el-text v-if="receiveDetailDataType == '固定资产'">{{ scope.row.field2 }}</el-text>
						<el-text v-if="receiveDetailDataType == '无形资产'">{{ scope.row.field2 }}</el-text>
						<el-text v-if="receiveDetailDataType == '易耗品'">{{ scope.row.field2 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="sku" label="规格型号" align="center" v-if="receiveDetailDataType != null && (receiveDetailDataType == '固定资产' || receiveDetailDataType == '易耗品')">
					<template #default="scope">
						<el-text v-if="receiveDetailDataType == '固定资产'">{{ scope.row.field78 }}</el-text>
						<el-text v-if="receiveDetailDataType == '易耗品'">{{ scope.row.field20 }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="receiveDate" label="领用日期" align="center" v-if="receiveDetailDataType != null && (receiveDetailDataType == '无形资产' || receiveDetailDataType == '易耗品')">
					<template #default="scope">
						<div class="table_content">{{ scope.row.receiveDate }}</div>
					</template>
				</el-table-column>
				<el-table-column prop="receiveDate" label="领取数量" align="center">
					<template #default="scope">
						<div class="table_content">{{ scope.row.receiveCnt }}</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</cl-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

watch(
	() => props.receiveDialogVisible,
	() => {
		visible.value = props.receiveDialogVisible
	},
)

const props = defineProps({
	receiveDialogVisible: {
		type: Boolean,
		default: false,
	},
	title: {
		type: String,
	},
	receiveDetailData: {
		type: Array,
	},
	receiveDetailDataType: {
		type: String,
	},
})
const $emit = defineEmits(['handleCloseDialog'])

const visible = ref(false)
const closeDialog = () => {
	$emit('handleCloseDialog')
}
</script>

<style scoped lang="scss"></style>
