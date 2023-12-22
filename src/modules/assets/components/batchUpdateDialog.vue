<template>
	<cl-dialog :title="`${props.dataType}批量修改`" v-model="visiable" width="700px" @close="handleClose">
		<el-form ref="form" v-model="formData" label-width="80px">
			<el-form-item label="资产状态">
				<el-select style="width: 100%" v-model="formData.assetsStatus" class="m-2" placeholder="请选择资产状态">
					<el-option v-for="item in assetsStatusStore.assetsStatus" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="使用人">
				<el-autocomplete
					style="width: 100%"
					v-model="formData.usePersonName"
					:fetch-suggestions="employeeListStore.employeeList"
					class="inline-input w-50"
					placeholder="请输入使用人"
					@select="handleSelect"
				/>
			</el-form-item>
			<el-form-item label="使用部门">
				<el-tree-select
					style="width: 100%"
					v-model="formData.useDeptName"
					:data="departmentOptionsStore.departmentOptions"
					:render-after-expand="false"
					show-checkbox
					:filterable="true"
					check-strictly
					default-expand-all
				/>
			</el-form-item>
			<el-form-item label="管理部门">
				<el-tree-select
					style="width: 100%"
					v-model="formData.manageDeptName"
					:data="departmentOptionsStore.departmentOptions"
					:render-after-expand="false"
					show-checkbox
					:filterable="true"
					check-strictly
					default-expand-all
				/>
			</el-form-item>
			<el-form-item label="存放地点">
				<el-input style="width: 100%" v-model="formData.storagePlace" placeholder="请输入存放地点"></el-input>
			</el-form-item>
			<el-form-item label="取得日期">
				<el-date-picker style="width: 100%" v-model="formData.getDate" type="date" placeholder="请选择取得日期" format="YYYY-MM-DD" />
			</el-form-item>
			<el-form-item label="入库日期">
				<el-date-picker style="width: 100%" v-model="formData.putStorageDate" type="date" placeholder="请选择入库日期" format="YYYY-MM-DD" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span>
				<el-button @click="handleClose">取消</el-button>
				<el-button type="primary" @click="saveBatchUpdate">确定</el-button>
			</span>
		</template>
	</cl-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useCool } from '/@/cool'
import useAssetsStatus from '/@/modules/base/store/assetsStatus'
import useEmployeeList from '/@/modules/base/store/employeeList'
import useDepartmentOptions from '/@/modules/base/store/departmentOptions'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'

const { service } = useCool()
const assetsStatusStore = useAssetsStatus()
const employeeListStore = useEmployeeList()
const departmentOptionsStore = useDepartmentOptions()

watch(
	() => props.visiable,
	() => {
		visiable.value = props.visiable
	},
)

const props = defineProps({
	visiable: {
		type: Boolean,
		default: false,
	},
	dataType: {
		type: String,
	},
	selectionChangeData: {
		type: Object,
	},
})

const $emit = defineEmits(['closeDialog'])

const visiable = ref(props.visiable)

const ids = computed(() => props.selectionChangeData?.map((item: { id: any }) => item.id + ''))
const employeeListData = computed(() => employeeListStore.employeeListData.map((item: { value: any }) => item.value))

const formData: any = reactive({
	assetsStatus: undefined, // 资产状态
	usePersonName: undefined, // 使用人
	usePersonId: undefined, // 使用人ID （自动补全输入框，选择的时候才有这个ID，自己填上去的 没有）
	useDeptName: undefined, // 使用部门
	manageDeptName: undefined, // 管理部门
	storagePlace: undefined, // 存放地点
	getDate: undefined, // 取得日期
	putStorageDate: undefined, // 入库日期
})

// 确定修改
const saveBatchUpdate = () => {
	const allValuesAreUndefined = Object.values(formData).every((value) => value === undefined)

	if (allValuesAreUndefined) {
		$emit('closeDialog')
		return
	}

	if (!employeeListData.value.includes(formData.usePersonName)) {
		formData.usePersonId = undefined
	}

	formData.getDate ? (formData.getDate = dayjs(formData.getDate).format('YYYY-MM-DD')) : (formData.getDate = undefined)
	formData.putStorageDate ? (formData.putStorageDate = dayjs(formData.putStorageDate).format('YYYY-MM-DD')) : (formData.putStorageDate = undefined)

	service.assets.pushStorageDoc.pushStorageDocController
		.batchUpdateInfo({
			dataType: props.dataType,
			ids: ids.value,
			...formData,
		})
		.then(() => {
			ElMessage.success('修改成功')
			$emit('closeDialog')
		})
}

const handleSelect = (item: any) => {
	formData.usePersonId = item.id + ''
}

const handleClose = () => {
	for (const key in formData) {
		formData[key] = undefined
	}
	$emit('closeDialog')
}
</script>

<style scoped lang="scss"></style>
