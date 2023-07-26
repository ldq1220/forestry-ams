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

<script lang="ts" name="assets-goodsSupplier" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{ prop: "supplierName", label: "供应商名称", required: true, component: { name: "el-input" } },
		{ prop: "userName", label: "联系人", required: true, component: { name: "el-input" } },
		{ prop: "mobile", label: "联系方式", required: true, component: { name: "el-input" } },
		{ prop: "remark", label: "备注", component: { name: "el-input" } }
	]
});

// cl-table
const Table = useTable({
	defaultSort: {
		prop: "createTime",
		order: "descending"
	},
	columns: [
		{ type: "selection" },
		{ prop: "id", label: "ID", sortable: "asc" },
		{ prop: "supplierName", label: "供应商名称", sortable: "asc", width: 200, align: "left", "header-align": "center" },
		{ prop: "userName", label: "联系人", sortable: "asc", width: 120 },
		{ prop: "mobile", label: "联系方式", sortable: "asc", width: 120 },
		{ prop: "remark", label: "备注", sortable: "asc", width: 150, align: "left", "header-align": "center" },
		{
			prop: "createTime", label: "创建时间", sortable: "desc", width: 120, formatter: function (row, column, cellValue, index) {
				// console.log(row, column, cellValue, index);
				if (cellValue && cellValue.indexOf(" ") != -1) return cellValue.split(" ")[0];
				return cellValue ? cellValue : "";
			}
		},
		{
			prop: "updateTime", label: "更新时间", sortable: "desc", width: 120, formatter: function (row, column, cellValue, index) {
				// console.log(row, column, cellValue, index);
				if (cellValue && cellValue.indexOf(" ") != -1) return cellValue.split(" ")[0];
				return cellValue ? cellValue : "";
			}
		},
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.assets.goodsSupplier
	},
	(app) => {
		app.refresh();
	}
);
</script>
