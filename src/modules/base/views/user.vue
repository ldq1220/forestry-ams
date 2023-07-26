<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" name="base-sys-user" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{ prop: "departmentId", label: "部门ID", component: { name: "el-input" } },
		{ prop: "name", label: "姓名", component: { name: "el-input" } },
		{ prop: "username", label: "用户名", required: true, component: { name: "el-input" } },
		{ prop: "password", label: "密码", required: true, component: { name: "el-input" } },
		{ prop: "passwordV", label: "密码版本,", required: true, component: { name: "el-input" } },
		{ prop: "nickName", label: "昵称", component: { name: "el-input" } },
		{ prop: "headImg", label: "头像", component: { name: "cl-upload" } },
		{ prop: "phone", label: "手机", component: { name: "el-input" } },
		{ prop: "email", label: "邮箱", component: { name: "el-input" } },
		{
			prop: "remark",
			label: "备注",
			component: { name: "el-input", props: { type: "textarea", rows: 4 } }
		},
		{ prop: "status", label: "状态", component: { name: "cl-switch" }, required: true },
		{ prop: "socketId", label: "socketId", component: { name: "el-input" } }
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ prop: "id", label: "ID" },
		{ prop: "departmentId", label: "部门ID" },
		{ prop: "name", label: "姓名" },
		{ prop: "username", label: "用户名" },
		{ prop: "password", label: "密码" },
		{ prop: "passwordV", label: "密码版本," },
		{ prop: "nickName", label: "昵称" },
		{ prop: "headImg", label: "头像", component: { name: "cl-image", props: { size: 60 } } },
		{ prop: "phone", label: "手机" },
		{ prop: "email", label: "邮箱" },
		{ prop: "remark", label: "备注", showOverflowTooltip: true },
		{ prop: "status", label: "状态", component: { name: "cl-switch" } },
		{ prop: "socketId", label: "socketId" },
		{ prop: "createTime", label: "创建时间", sortable: "desc", width: 160 },
		{ prop: "updateTime", label: "更新时间", sortable: "custom", width: 160 },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.base.sys.user
	},
	(app) => {
		app.refresh();
	}
);
</script>
