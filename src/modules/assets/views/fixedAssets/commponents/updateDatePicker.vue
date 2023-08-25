<template>
	123123
	<!-- <el-date-picker v-model="datePickerValue" type="date" placeholder="Pick a day" /> -->
	<el-radio-group v-model="datePickerValue" class="ml-4">
		<el-radio label="1" size="large">Option 1</el-radio>
		<el-radio label="2" size="large">Option 2</el-radio>
	</el-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const datePickerValue = ref()
</script>

<style scoped lang="scss"></style>
