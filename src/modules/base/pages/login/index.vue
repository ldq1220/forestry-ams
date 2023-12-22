<template>
	<div class="page-login">
		<div class="box">
			<div class="logo">
				<img src="/logo.png" alt="Logo" />
				<span>广东省林业调查规划院</span>
			</div>
			<p class="desc">物资管理系统</p>

			<el-form label-position="top" class="form" :disabled="saving">
				<el-form-item label="用户名">
					<input v-model="form.username" placeholder="请输入用户名" maxlength="20" autocomplete="on" />
				</el-form-item>

				<el-form-item label="密码">
					<input v-model="form.password" type="password" placeholder="请输入密码" maxlength="20" autocomplete="off" />
				</el-form-item>

				<el-form-item label="验证码">
					<div class="row">
						<input v-model="form.verifyCode" placeholder="图片验证码" maxlength="4" @keyup.enter="toLogin" />

						<captcha
							:ref="setRefs('captcha')"
							v-model="form.captchaId"
							@change="
								() => {
									form.verifyCode = ''
								}
							"
						/>
					</div>
				</el-form-item>

				<div class="op">
					<el-button round :loading="saving" @click="toLogin">登录</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script lang="ts" name="login" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useCool } from '/@/cool'
import { useBase } from '/$/base'
import Captcha from './components/captcha.vue'
import { useProcessStore } from '/@/modules/base/store/process'
import useDepartmentOptions from '/@/modules/base/store/departmentOptions'
import useEmployeeList from '/@/modules/base/store/employeeList'
import useAssetsCategory from '/@/modules/base/store/assetsCategory'
import useGoodsSupplier from '/@/modules/base/store/goodsSupplier'
import useFixedAssetsOptions from '/@/modules/base/store/FixedAssetsOptionsDict'
import userList from '/@/modules/base/store/userList'
import useBaseSysDeptOptions from '/@/modules/base/store/baseSysDeptOptions'
import useAssetsStatus from '/@/modules/base/store/assetsStatus'

const { refs, setRefs, router, service } = useCool()
const { user, app } = useBase()
const processStore = useProcessStore()

const FixedAssetsOptions = useFixedAssetsOptions()
const departmentOptionsStore = useDepartmentOptions()
const employeeListStore = useEmployeeList()
const assetsCategoryStore = useAssetsCategory()
const goodsSupplierStore = useGoodsSupplier()
const userListStore = userList()
const baseSysDeptStore = useBaseSysDeptOptions()
const assetsStatusStore = useAssetsStatus()

// 状态1
const saving = ref(false)

// 表单数据
const form = reactive({
	username: '',
	password: '',
	captchaId: '',
	verifyCode: '',
})

// 登录
async function toLogin() {
	if (!form.username) {
		return ElMessage.error('用户名不能为空')
	}

	if (!form.password) {
		return ElMessage.error('密码不能为空')
	}

	if (!form.verifyCode) {
		return ElMessage.error('图片验证码不能为空')
	}

	saving.value = true

	try {
		// 登录
		await service.base.open.login(form).then((res) => {
			user.setToken(res)

			getFixedStatusOption()
			getAllDataType()
			getDepartmentList()
			getEmployeeList()
			getAssetsCategory()
			getGoodsSupplier()
			getUserList()
			getBaseSysDeptList()
		})

		// token 事件
		await Promise.all(app.events.hasToken.map((e) => e()))

		// 跳转
		router.push('/')

		// 清空面包屑
		processStore.clear()
	} catch (err: any) {
		refs.captcha.refresh()
		ElMessage.error(err.message)
	}

	saving.value = false
}

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

<style lang="scss" scoped>
.page-login {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	position: relative;
	// background-color: #2f3447;
	background-image: url('/public/login-bg.jpg');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;

	.box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20px;
		// background-color: rgba(255, 255, 255, 0.72);
		.logo {
			height: 50px;
			margin-bottom: 30px;
			display: flex;
			align-items: center;
			color: #fff;

			img {
				height: 50px;
			}

			span {
				font-size: 38px;
				margin-left: 10px;
				letter-spacing: 5px;
				font-weight: bold;
			}
		}

		.desc {
			color: #eee;
			font-size: 38px;
			letter-spacing: 1px;
			margin-bottom: 50px;
		}

		.el-form {
			width: 300px;

			:deep(.el-form-item) {
				margin-bottom: 20px;

				.el-form-item__label {
					color: #ccc;
				}
			}

			input {
				background-color: transparent;
				color: #fff;
				border: 0;
				height: 40px;
				width: calc(100% - 4px);
				margin: 0 2px;
				padding: 0 2px;
				box-sizing: border-box;
				-webkit-text-fill-color: #fff;
				font-size: 15px;
				border-bottom: 1px solid rgba(255, 255, 255, 0.5);
				border-radius: 0;

				&:-webkit-autofill {
					box-shadow: 0 0 0px 1000px transparent inset !important;
					transition: background-color 50000s ease-in-out 0s;
				}

				&::-webkit-input-placeholder {
					font-size: 12px;
				}

				&:focus {
					border-color: #fff;
				}
			}

			.row {
				display: flex;
				align-items: center;
				width: 100%;
				position: relative;

				.captcha {
					position: absolute;
					right: 0;
					bottom: 1px;
				}
			}
		}

		.op {
			display: flex;
			justify-content: center;
			margin-top: 50px;

			:deep(.el-button) {
				height: 40px;
				width: 140px;
				font-size: 15px;
			}
		}
	}
}
</style>
