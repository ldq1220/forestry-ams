<template>
	<el-config-provider :locale="zhCn">
		<router-view />
	</el-config-provider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { useCool } from '/@/cool'
import { useBase } from '/$/base'

import useDepartmentOptions from '/@/modules/base/store/departmentOptions'
import useEmployeeList from '/@/modules/base/store/employeeList'
import useAssetsCategory from '/@/modules/base/store/assetsCategory'
import useGoodsSupplier from '/@/modules/base/store/goodsSupplier'
import useFixedAssetsOptions from '/@/modules/base/store/FixedAssetsOptionsDict'
import userList from '/@/modules/base/store/userList'
import useBaseSysDeptOptions from '/@/modules/base/store/baseSysDeptOptions'
import useAssetsStatus from '/@/modules/base/store/assetsStatus'

import { onMounted, ref } from 'vue'

const { service } = useCool()
const { user } = useBase()

const FixedAssetsOptions = useFixedAssetsOptions()
const departmentOptionsStore = useDepartmentOptions()
const employeeListStore = useEmployeeList()
const assetsCategoryStore = useAssetsCategory()
const goodsSupplierStore = useGoodsSupplier()
const userListStore = userList()
const baseSysDeptStore = useBaseSysDeptOptions()
const assetsStatusStore = useAssetsStatus()

onMounted(() => {
	if (user.token) {
		getFixedStatusOption()
		getAllDataType()
		getDepartmentList()
		getEmployeeList()
		getAssetsCategory()
		getGoodsSupplier()
		getUserList()
		getBaseSysDeptList()
	}
})

// 获取资产状态列表
const getFixedStatusOption = () => {
	service.assets.fixed.assetsFixedGoodsController.getFixedAssetsStatusLabel().then((res) => {
		assetsStatusStore.assetsStatus = res
	})
}

// 获取固定资产 类型字典
const getAllDataType = () => {
	service.assets.fixed.assetsFixedField.getAllDataType().then((res) => {
		FixedAssetsOptions.typeData = res
	})
}

// 获取部门
const getDepartmentList = async () => {
	// service.assets.department.list().then((res) => {
	service.base.sys.department.list().then((res) => {
		departmentOptionsStore.departmentOptions = formatTreeData(transformData(res))
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

// 获取 员工
const getEmployeeList = () => {
	// service.assets.employee.list().then((res) => {
	service.base.sys.user
		.getAllInUseAccountNumberList({
			status: 1,
		})
		.then((res) => {
			res.forEach((item: { name: any; id: any }) => {
				restaurants.value.push({ value: item.name, id: item.id })
			})
			employeeListStore.employeeListData = restaurants.value
		})
}
// 自动补全输入框
const createFilter = (queryString: string) => {
	return (restaurant: any) => {
		return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
	}
}
const restaurants: any = ref([])
// 存贮到pinia
employeeListStore.employeeList = (queryString: string, cb: any) => {
	const results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value
	cb(results)
}

// 获取资产类别
const getAssetsCategory = () => {
	service.assets.assetsCategory.list().then((res) => {
		assetsCategoryStore.assetsCategory = res
	})
}

// 获取供应商
const getGoodsSupplier = () => {
	service.assets.goodsSupplier.list().then((res) => {
		goodsSupplierStore.goodsSupplier = res
	})
}
// 获取 系统用户   ---  原先的人员选择是用employee的list，现在要改成user的数据
const allInUseAccountNumberList: any = ref([])
const getUserList = () => {
	// 只取status=1的数据
	service.base.sys.user
		.getAllInUseAccountNumberList({
			status: 1,
		})
		.then((list) => {
			list.forEach((item: any) => {
				allInUseAccountNumberList.value.push({ id: item.id, value: item.name })
			})
		})
}
userListStore.userList = (keyword: string, cb: any) => {
	// 没有关键字，显示全部数据
	if (keyword == null || keyword.length <= 0 || keyword.trim().length <= 0) {
		cb(allInUseAccountNumberList.value)
		return
	}
	// 按关键字过滤
	let results = []
	for (let i = 0; i < allInUseAccountNumberList.value.length; i++) {
		const user = allInUseAccountNumberList.value[i]
		if (user.value && user.value.toLowerCase().indexOf(keyword.toLowerCase()) != -1) {
			results.push(user)
		}
	}
	cb(results)
}

// 获取 部门选择数据  由于人员选择的数据已经换成user表的，所以这个要换成base_sys_department表的数据了，不是原来的department的数据
const getBaseSysDeptList = () => {
	service.base.sys.department.list().then((list) => {
		baseSysDeptStore.baseSysDeptOptions = formatTreeData(transformData(list))
	})
}
</script>
