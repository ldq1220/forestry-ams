<template>
	<el-config-provider :locale="zhCn">
		<router-view />
	</el-config-provider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { service } from '/@/cool'
import useFixedAssetsOptions from './modules/base/store/FixedAssetsOptionsDict'
import { onMounted } from 'vue'

const FixedAssetsOptions = useFixedAssetsOptions()

onMounted(() => {
	// 获取固定资产 类型字典
	service.assets.fixed.assetsFixedField.getAllDataType().then((res) => {
		FixedAssetsOptions.typeData = res
	})
})
</script>
