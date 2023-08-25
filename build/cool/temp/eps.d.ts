declare namespace Eps {
	interface AssetsCategoryEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 类别名称
		 */
		categoryName?: string;
		/**
		 * 上级ID
		 */
		parentId?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ConsumableAssetsFieldEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 字段ID
		 */
		fieldId?: string;
		/**
		 * 字段名称
		 */
		fieldName?: string;
		/**
		 * 排序号
		 */
		sortOrder?: number;
		/**
		 * 支持搜索
		 */
		searchEnable?: number;
		/**
		 * 数据类型
		 */
		dataType?: string;
		/**
		 * 是否使用
		 */
		inUse?: number;
		/**
		 * 保留小数位数
		 */
		decimalPlaces?: number;
		/**
		 * 选项
		 */
		options?: string;
		/**
		 * 关联表(选项)查询方法
		 */
		joinTableMethod?: string;
		/**
		 * 关联字段
		 */
		joinField?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DepartmentEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 部门名称
		 */
		name?: string;
		/**
		 * 上级部门ID
		 */
		parentId?: BigInt;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface EmployeeEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 姓名
		 */
		name?: string;
		/**
		 * 性别
		 */
		gender?: number;
		/**
		 * 部门ID
		 */
		deptId?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface AssetsFixedEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 所属单位
		 */
		field1?: string;
		/**
		 * 资产分类
		 */
		field2?: string;
		/**
		 * 资产编号
		 */
		field3?: string;
		/**
		 * 项目代码
		 */
		field4?: string;
		/**
		 * 取得日期
		 */
		field5?: string;
		/**
		 * 投入使用日期
		 */
		field6?: string;
		/**
		 * 配置批准单位
		 */
		field7?: string;
		/**
		 * 价值类型
		 */
		field8?: string;
		/**
		 * 资产原值（元）
		 */
		field9?: string;
		/**
		 * 财政拨款（元）
		 */
		field10?: string;
		/**
		 * 非财政拨款（元）
		 */
		field11?: string;
		/**
		 * 资产状态
		 */
		field12?: string;
		/**
		 * 使用责任主体
		 */
		field13?: string;
		/**
		 * 使用人
		 */
		field14?: string;
		/**
		 * 管理人
		 */
		field15?: string;
		/**
		 * 是否共享共用
		 */
		field16?: string;
		/**
		 * 产权是否清晰
		 */
		field17?: string;
		/**
		 * 权属证明
		 */
		field18?: string;
		/**
		 * 使用权类型
		 */
		field19?: string;
		/**
		 * 独用面积
		 */
		field20?: string;
		/**
		 * 分摊面积
		 */
		field21?: string;
		/**
		 * 会计凭证号
		 */
		field22?: string;
		/**
		 * 数量
		 */
		field23?: string;
		/**
		 * 上次计提日期
		 */
		field24?: string;
		/**
		 * 发票号
		 */
		field25?: string;
		/**
		 * 是否分级运维管理
		 */
		field26?: string;
		/**
		 * 收储单位
		 */
		field27?: string;
		/**
		 * 属地交通运输主管部门联系电话
		 */
		field28?: string;
		/**
		 * 管护单位联系电话
		 */
		field29?: string;
		/**
		 * 数量计量单位
		 */
		field30?: string;
		/**
		 * 折旧/摊销状态
		 */
		field31?: string;
		/**
		 * 存放地点
		 */
		field32?: string;
		/**
		 * 公路性质
		 */
		field33?: string;
		/**
		 * 收费年限
		 */
		field34?: string;
		/**
		 * 剩余收费年限
		 */
		field35?: string;
		/**
		 * 开工日期
		 */
		field36?: string;
		/**
		 * 累计折旧/摊销（元）
		 */
		field37?: string;
		/**
		 * 收费权质押情况
		 */
		field38?: string;
		/**
		 * 供应商
		 */
		field39?: string;
		/**
		 * 入账日期
		 */
		field40?: string;
		/**
		 * 资产分类
		 */
		field41?: string;
		/**
		 * 新国标资产分类
		 */
		field42?: string;
		/**
		 * 采购组织形式
		 */
		field43?: string;
		/**
		 * 财务经办人
		 */
		field44?: string;
		/**
		 * 备注
		 */
		field45?: string;
		/**
		 * 使用部门
		 */
		field46?: string;
		/**
		 * 单位会计科目
		 */
		field47?: string;
		/**
		 * 净值
		 */
		field48?: string;
		/**
		 * 管理部门
		 */
		field49?: string;
		/**
		 * 行业分类代码
		 */
		field50?: string;
		/**
		 * 账套
		 */
		field51?: string;
		/**
		 * 国标2010资产分类
		 */
		field52?: string;
		/**
		 * 预计使用到期日
		 */
		field53?: string;
		/**
		 * 是否机构划转划入
		 */
		field54?: string;
		/**
		 * 入库日期
		 */
		field55?: string;
		/**
		 * 行业使用方向
		 */
		field56?: string;
		/**
		 * 月折旧额（元）
		 */
		field57?: string;
		/**
		 * 计提结束日期
		 */
		field58?: string;
		/**
		 * 首次计提日期
		 */
		field59?: string;
		/**
		 * 折旧（摊销）方法
		 */
		field60?: string;
		/**
		 * 残值率(%)
		 */
		field61?: string;
		/**
		 * 机身编码
		 */
		field62?: string;
		/**
		 * 折旧（摊销）年限
		 */
		field63?: string;
		/**
		 * 折旧年限
		 */
		field64?: string;
		/**
		 * 登记日期
		 */
		field65?: string;
		/**
		 * 条形码(打印)
		 */
		field66?: string;
		/**
		 * 是否折旧结束
		 */
		field67?: string;
		/**
		 * 报增单号
		 */
		field68?: string;
		/**
		 * 报账单号
		 */
		field69?: string;
		/**
		 * 终止收费时间
		 */
		field70?: string;
		/**
		 * 登记人
		 */
		field71?: string;
		/**
		 * 预算名称
		 */
		field72?: string;
		/**
		 * 资产用途
		 */
		field73?: string;
		/**
		 * 取得方式
		 */
		field74?: string;
		/**
		 * 预算编码
		 */
		field75?: string;
		/**
		 * 销帐日期
		 */
		field76?: string;
		/**
		 * 保管人
		 */
		field77?: string;
		/**
		 * 规格型号
		 */
		field78?: string;
		/**
		 * 入账形式
		 */
		field79?: string;
		/**
		 * 备用整数字段1
		 */
		field001?: string;
		/**
		 * 备用整数字段2
		 */
		field002?: string;
		/**
		 * 备用文本字段3
		 */
		field003?: string;
		/**
		 * 备用文本字段4
		 */
		field004?: string;
		/**
		 * 备用下拉字段1
		 */
		field005?: string;
		/**
		 * 备用下拉字段2
		 */
		field007?: string;
		/**
		 * 备用数值字段5
		 */
		field008?: string;
		/**
		 * 备用整数字段3
		 */
		field009?: string;
		/**
		 * 备用数值字段4
		 */
		field010?: string;
		/**
		 * 备用数值字段3
		 */
		field011?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface AssetsFixedFieldEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 字段ID
		 */
		fieldId?: string;
		/**
		 * 字段名称
		 */
		fieldName?: string;
		/**
		 * 排序号
		 */
		sortOrder?: number;
		/**
		 * 支持搜索
		 */
		searchEnable?: number;
		/**
		 * 数据类型
		 */
		dataType?: string;
		/**
		 * 是否使用
		 */
		inUse?: number;
		/**
		 * 保留小数位数
		 */
		decimalPlaces?: number;
		/**
		 * 选项
		 */
		options?: string;
		/**
		 * 关联表(选项)查询方法
		 */
		joinTableMethod?: string;
		/**
		 * 关联字段
		 */
		joinField?: string;
		/**
		 * 属于哪个tab
		 */
		belongTab?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface AssetsFixedGoodsEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 所属单位
		 */
		field1?: string;
		/**
		 * 资产分类
		 */
		field2?: string;
		/**
		 * 资产编号
		 */
		field3?: string;
		/**
		 * 项目代码
		 */
		field4?: string;
		/**
		 * 取得日期
		 */
		field5?: string;
		/**
		 * 投入使用日期
		 */
		field6?: string;
		/**
		 * 配置批准单位
		 */
		field7?: string;
		/**
		 * 价值类型
		 */
		field8?: string;
		/**
		 * 资产原值（元）
		 */
		field9?: string;
		/**
		 * 财政拨款（元）
		 */
		field10?: string;
		/**
		 * 非财政拨款（元）
		 */
		field11?: string;
		/**
		 * 资产状态
		 */
		field12?: string;
		/**
		 * 使用责任主体
		 */
		field13?: string;
		/**
		 * 使用人
		 */
		field14?: string;
		/**
		 * 管理人
		 */
		field15?: string;
		/**
		 * 是否共享共用
		 */
		field16?: string;
		/**
		 * 产权是否清晰
		 */
		field17?: string;
		/**
		 * 权属证明
		 */
		field18?: string;
		/**
		 * 使用权类型
		 */
		field19?: string;
		/**
		 * 独用面积
		 */
		field20?: string;
		/**
		 * 分摊面积
		 */
		field21?: string;
		/**
		 * 会计凭证号
		 */
		field22?: string;
		/**
		 * 数量
		 */
		field23?: string;
		/**
		 * 上次计提日期
		 */
		field24?: string;
		/**
		 * 发票号
		 */
		field25?: string;
		/**
		 * 是否分级运维管理
		 */
		field26?: string;
		/**
		 * 收储单位
		 */
		field27?: string;
		/**
		 * 属地交通运输主管部门联系电话
		 */
		field28?: string;
		/**
		 * 管护单位联系电话
		 */
		field29?: string;
		/**
		 * 数量计量单位
		 */
		field30?: string;
		/**
		 * 折旧/摊销状态
		 */
		field31?: string;
		/**
		 * 存放地点
		 */
		field32?: string;
		/**
		 * 公路性质
		 */
		field33?: string;
		/**
		 * 收费年限
		 */
		field34?: string;
		/**
		 * 剩余收费年限
		 */
		field35?: string;
		/**
		 * 开工日期
		 */
		field36?: string;
		/**
		 * 累计折旧/摊销（元）
		 */
		field37?: string;
		/**
		 * 收费权质押情况
		 */
		field38?: string;
		/**
		 * 供应商
		 */
		field39?: string;
		/**
		 * 入账日期
		 */
		field40?: string;
		/**
		 * 资产名称
		 */
		field41?: string;
		/**
		 * 新国标资产分类
		 */
		field42?: string;
		/**
		 * 采购组织形式
		 */
		field43?: string;
		/**
		 * 财务经办人
		 */
		field44?: string;
		/**
		 * 备注
		 */
		field45?: string;
		/**
		 * 使用部门
		 */
		field46?: string;
		/**
		 * 单位会计科目
		 */
		field47?: string;
		/**
		 * 净值
		 */
		field48?: string;
		/**
		 * 管理部门
		 */
		field49?: string;
		/**
		 * 行业分类代码
		 */
		field50?: string;
		/**
		 * 账套
		 */
		field51?: string;
		/**
		 * 国标2010资产分类
		 */
		field52?: string;
		/**
		 * 预计使用到期日
		 */
		field53?: string;
		/**
		 * 是否机构划转划入
		 */
		field54?: string;
		/**
		 * 入库日期
		 */
		field55?: string;
		/**
		 * 行业使用方向
		 */
		field56?: string;
		/**
		 * 月折旧额（元）
		 */
		field57?: string;
		/**
		 * 计提结束日期
		 */
		field58?: string;
		/**
		 * 首次计提日期
		 */
		field59?: string;
		/**
		 * 折旧（摊销）方法
		 */
		field60?: string;
		/**
		 * 残值率(%)
		 */
		field61?: string;
		/**
		 * 机身编码
		 */
		field62?: string;
		/**
		 * 折旧（摊销）年限
		 */
		field63?: string;
		/**
		 * 折旧年限
		 */
		field64?: string;
		/**
		 * 登记日期
		 */
		field65?: string;
		/**
		 * 条形码(打印)
		 */
		field66?: string;
		/**
		 * 是否折旧结束
		 */
		field67?: string;
		/**
		 * 报增单号
		 */
		field68?: string;
		/**
		 * 报账单号
		 */
		field69?: string;
		/**
		 * 终止收费时间
		 */
		field70?: string;
		/**
		 * 登记人
		 */
		field71?: string;
		/**
		 * 预算名称
		 */
		field72?: string;
		/**
		 * 资产用途
		 */
		field73?: string;
		/**
		 * 取得方式
		 */
		field74?: string;
		/**
		 * 预算编码
		 */
		field75?: string;
		/**
		 * 销帐日期
		 */
		field76?: string;
		/**
		 * 保管人
		 */
		field77?: string;
		/**
		 * 规格型号
		 */
		field78?: string;
		/**
		 * 入账形式
		 */
		field79?: string;
		/**
		 * 备用整数字段1
		 */
		field80?: string;
		/**
		 * 备用整数字段2
		 */
		field81?: string;
		/**
		 * 备用文本字段3
		 */
		field82?: string;
		/**
		 * 备用文本字段4
		 */
		field83?: string;
		/**
		 * 备用下拉字段1
		 */
		field84?: string;
		/**
		 * 备用下拉字段2
		 */
		field85?: string;
		/**
		 * 备用数值字段5
		 */
		field86?: string;
		/**
		 * 备用数值字段3
		 */
		field87?: string;
		/**
		 * 备用数值字段4
		 */
		field88?: string;
		/**
		 * 备用数值字段2
		 */
		field89?: string;
		/**
		 * 备用文本字段1
		 */
		field90?: string;
		/**
		 * 备用文本字段2
		 */
		field91?: string;
		/**
		 * 备用文本字段5
		 */
		field92?: string;
		/**
		 * 备用文本字段6
		 */
		field93?: string;
		/**
		 * 备用文本字段7
		 */
		field94?: string;
		/**
		 * 备用文本字段8
		 */
		field95?: string;
		/**
		 * 备用文本字段9
		 */
		field96?: string;
		/**
		 * 备用文本字段10
		 */
		field97?: string;
		/**
		 * 备用文本字段11
		 */
		field98?: string;
		/**
		 * 备用文本字段12
		 */
		field99?: string;
		/**
		 * 备用整数字段3
		 */
		field100?: string;
		/**
		 * 备用整数字段4
		 */
		field101?: string;
		/**
		 * 备用整数字段5
		 */
		field102?: string;
		/**
		 * 备用数值字段1
		 */
		field103?: string;
		/**
		 * 备用下拉字段3
		 */
		field104?: string;
		/**
		 * 管理编号
		 */
		customNo?: string;
		/**
		 * 系统编号
		 */
		sysNo?: string;
		/**
		 * 二维码文件位置
		 */
		qrCodeFilePath?: string;
		/**
		 * 标签打印状态
		 */
		labelStatus?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface AssetsFixedGoodsGetEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 物品ID
		 */
		goodsId?: string;
		/**
		 * 领用人
		 */
		personName?: string;
		/**
		 * 领用部门
		 */
		deptName?: string;
		/**
		 * 存放地点
		 */
		storagePlace?: string;
		/**
		 * 领用日期
		 */
		getDate?: Date;
		/**
		 * 预计归还日期
		 */
		dueReturnDate?: Date;
		/**
		 * 领用原因
		 */
		getReason?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface FieldCookieDataEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 字段ID
		 */
		fieldId?: string;
		/**
		 * 排序号
		 */
		sortOrder?: number;
		/**
		 * 归属
		 */
		belongs?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface FieldSelectOptionEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 字段ID
		 */
		fieldId?: string;
		/**
		 * 选项值
		 */
		optionText?: string;
		/**
		 * 上级ID
		 */
		parentId?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface FixedAssetsGoodsDiscardEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 物品ID
		 */
		goodsId?: string;
		/**
		 * 报废负责人
		 */
		personName?: string;
		/**
		 * 处置方式
		 */
		dealType?: string;
		/**
		 * 报废原因
		 */
		discardReason?: string;
		/**
		 * 报废日期
		 */
		discardDate?: Date;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface GoodsSupplierEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 供应商名称
		 */
		supplierName?: string;
		/**
		 * 联系人
		 */
		userName?: string;
		/**
		 * 联系方式
		 */
		mobile?: string;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ImmaterialAssetsFieldEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 字段ID
		 */
		fieldId?: string;
		/**
		 * 字段名称
		 */
		fieldName?: string;
		/**
		 * 排序号
		 */
		sortOrder?: number;
		/**
		 * 支持搜索
		 */
		searchEnable?: number;
		/**
		 * 数据类型
		 */
		dataType?: string;
		/**
		 * 是否使用
		 */
		inUse?: number;
		/**
		 * 保留小数位数
		 */
		decimalPlaces?: number;
		/**
		 * 选项
		 */
		options?: string;
		/**
		 * 关联表(选项)查询方法
		 */
		joinTableMethod?: string;
		/**
		 * 关联字段
		 */
		joinField?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface AssetsGoodsLabelEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 资产ID
		 */
		goodsId?: string;
		/**
		 * 显示标题
		 */
		title?: string;
		/**
		 * 内容字段ID
		 */
		fieldId?: string;
		/**
		 * 排序号
		 */
		sortOrder?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysDepartmentEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 部门名称
		 */
		name?: string;
		/**
		 * 上级部门ID
		 */
		parentId?: BigInt;
		/**
		 * 排序
		 */
		orderNum?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysLogEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: BigInt;
		/**
		 * 行为
		 */
		action?: string;
		/**
		 * ip
		 */
		ip?: string;
		/**
		 * ip地址
		 */
		ipAddr?: string;
		/**
		 * 参数
		 */
		params?: json;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysMenuEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 父菜单ID
		 */
		parentId?: BigInt;
		/**
		 * 菜单名称
		 */
		name?: string;
		/**
		 * 菜单地址
		 */
		router?: string;
		/**
		 * 权限标识
		 */
		perms?: string;
		/**
		 * 类型 0-目录 1-菜单 2-按钮
		 */
		type?: number;
		/**
		 * 图标
		 */
		icon?: string;
		/**
		 * 排序
		 */
		orderNum?: number;
		/**
		 * 视图地址
		 */
		viewPath?: string;
		/**
		 * 路由缓存
		 */
		keepAlive?: boolean;
		/**
		 * 是否显示
		 */
		isShow?: boolean;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysParamEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 键
		 */
		keyName?: string;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 数据
		 */
		data?: string;
		/**
		 * 数据类型 0-字符串 1-富文本 2-文件
		 */
		dataType?: number;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysRoleEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: string;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 角色标签
		 */
		label?: string;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 数据权限是否关联上下级
		 */
		relevance?: number;
		/**
		 * 菜单权限
		 */
		menuIdList?: json;
		/**
		 * 部门权限
		 */
		departmentIdList?: json;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysUserEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 部门ID
		 */
		departmentId?: BigInt;
		/**
		 * 姓名
		 */
		name?: string;
		/**
		 * 用户名
		 */
		username?: string;
		/**
		 * 密码
		 */
		password?: string;
		/**
		 * 密码版本, 作用是改完密码，让原来的token失效
		 */
		passwordV?: number;
		/**
		 * 昵称
		 */
		nickName?: string;
		/**
		 * 头像
		 */
		headImg?: string;
		/**
		 * 手机
		 */
		phone?: string;
		/**
		 * 邮箱
		 */
		email?: string;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 状态 0:禁用 1：启用
		 */
		status?: boolean;
		/**
		 * socketId
		 */
		socketId?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CloudDBEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 说明
		 */
		readme?: string;
		/**
		 * 内容
		 */
		content?: string;
		/**
		 * 类名
		 */
		className?: string;
		/**
		 * 表名
		 */
		tableName?: string;
		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CloudFuncInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 说明
		 */
		readme?: string;
		/**
		 * 内容
		 */
		content?: string;
		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CloudFuncLogEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 云函数ID
		 */
		infoId?: number;
		/**
		 * 请求
		 */
		request?: json;
		/**
		 * 结果
		 */
		result?: json;
		/**
		 * 类型 0-失败 1-成功
		 */
		type?: number;
		/**
		 * 异常信息
		 */
		error?: string;
		/**
		 * 耗时(毫秒)
		 */
		time?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DemoGoodsEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 标题
		 */
		title?: string;
		/**
		 * 价格
		 */
		price?: number;
		/**
		 * 描述
		 */
		description?: string;
		/**
		 * 主图
		 */
		mainImage?: string;
		/**
		 * 示例图
		 */
		exampleImages?: json;
		/**
		 * 库存
		 */
		stock?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 类型ID
		 */
		typeId?: number;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 排序
		 */
		orderNum?: number;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 父ID
		 */
		parentId?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictTypeEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 标识
		 */
		key?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface IotDeviceEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 图标
		 */
		icon?: string;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 设备唯一ID
		 */
		uniqueId?: string;
		/**
		 * 状态 0-离线 1-在线
		 */
		status?: boolean;
		/**
		 * 客户端ID
		 */
		clientId?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface IotMessageEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 设备ID
		 */
		deviceId?: number;
		/**
		 * 数据
		 */
		data?: string;
		/**
		 * 类型 0-推送 1-接收
		 */
		type?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface RecycleDataEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 表
		 */
		entityInfo?: json;
		/**
		 * 操作人
		 */
		userId?: string;
		/**
		 * 被删除的数据
		 */
		data?: json;
		/**
		 * 请求的接口
		 */
		url?: string;
		/**
		 * 请求参数
		 */
		params?: json;
		/**
		 * 删除数据条数
		 */
		count?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 地址
		 */
		url?: string;
		/**
		 * 类型
		 */
		type?: string;
		/**
		 * 分类ID
		 */
		classifyId?: BigInt;
		/**
		 * 文件id
		 */
		fileId?: string;
		/**
		 * 文件名
		 */
		name?: string;
		/**
		 * 文件大小
		 */
		size?: number;
		/**
		 * 文档版本
		 */
		version?: number;
		/**
		 * 文件位置
		 */
		key?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceTypeEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 类别名称
		 */
		name?: string;
		/**
		 * 父分类ID
		 */
		parentId?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface TaskInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 任务ID
		 */
		jobId?: string;
		/**
		 * 任务配置
		 */
		repeatConf?: string;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * cron
		 */
		cron?: string;
		/**
		 * 最大执行次数 不传为无限次
		 */
		limit?: number;
		/**
		 * 每间隔多少毫秒执行一次 如果cron设置了 这项设置就无效
		 */
		every?: number;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 状态 0:停止 1：运行
		 */
		status?: boolean;
		/**
		 * 开始时间
		 */
		startDate?: Date;
		/**
		 * 结束时间
		 */
		endDate?: Date;
		/**
		 * 数据
		 */
		data?: string;
		/**
		 * 执行的service实例ID
		 */
		service?: string;
		/**
		 * 状态 0:系统 1：用户
		 */
		type?: number;
		/**
		 * 下一次执行时间
		 */
		nextRunTime?: Date;
		/**
		 * 状态 0:cron 1：时间间隔
		 */
		taskType?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 登录唯一ID
		 */
		unionid?: string;
		/**
		 * 头像
		 */
		avatarUrl?: string;
		/**
		 * 昵称
		 */
		nickName?: string;
		/**
		 * 手机号
		 */
		phone?: string;
		/**
		 * 性别 0-未知 1-男 2-女
		 */
		gender?: number;
		/**
		 * 状态 0-禁用 1-正常
		 */
		status?: number;
		/**
		 * 登录方式 0-小程序 1-公众号 2-H5
		 */
		loginType?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}
	interface ChatMessage {
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface ChatSession {
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface Test {
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AssetsAssetsCategory {
		/**
		 * 树形表数据
		 */
		getTreeData(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<AssetsCategoryEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<AssetsCategoryEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: AssetsCategoryEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			getTreeData: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			getTreeData: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AssetsConsumableConsumableAssetsFieldController {
		/**
		 * 易耗品表配置 保存
		 */
		saveConsumableAssetsFieldSet(data?: any): Promise<any>;
		/**
		 * 字段类型
		 */
		getAllDataType(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ConsumableAssetsFieldEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<ConsumableAssetsFieldEntity[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: ConsumableAssetsFieldEntity[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			saveConsumableAssetsFieldSet: string;
			getAllDataType: string;
			info: string;
			list: string;
			page: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			saveConsumableAssetsFieldSet: boolean;
			getAllDataType: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AssetsDepartment {
		/**
		 * 树形表数据
		 */
		getTreeData(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DepartmentEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DepartmentEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: DepartmentEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			getTreeData: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			getTreeData: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AssetsEmployee {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<EmployeeEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<EmployeeEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: EmployeeEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AssetsFixedAssetsFixedController {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<AssetsFixedEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: AssetsFixedEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<AssetsFixedEntity[]>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			page: string;
			add: string;
			list: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			page: boolean;
			add: boolean;
			list: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AssetsFixedAssetsFixedField {
		/**
		 * 固定资产表配置 保存
		 */
		saveAssetsFixedFieldSet(data?: any): Promise<any>;
		/**
		 * 查询固定资产表的设置字段
		 */
		getFixedAssetsFields(data?: any): Promise<any>;
		/**
		 * 字段类型
		 */
		getAllDataType(data?: any): Promise<any>;
		/**
		 * 数据显示tab
		 */
		getTabList(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<AssetsFixedFieldEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<AssetsFixedFieldEntity[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: AssetsFixedFieldEntity[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			saveAssetsFixedFieldSet: string;
			getFixedAssetsFields: string;
			getAllDataType: string;
			getTabList: string;
			info: string;
			list: string;
			page: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			saveAssetsFixedFieldSet: boolean;
			getFixedAssetsFields: boolean;
			getAllDataType: boolean;
			getTabList: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AssetsFixedAssetsFixedGoodsController {
		/**
		 * 获取固定资产状态标签
		 */
		getFixedAssetsStatusLabel(data?: any): Promise<any>;
		/**
		 * 获取标签的可用数据
		 */
		getLabelUseableData(data?: any): Promise<any>;
		/**
		 * 分页查询
		 */
		getInventoryByPage(data?: any): Promise<any>;
		/**
		 * 获取添加修改的字段
		 */
		getUpsertFields(data?: any): Promise<any>;
		/**
		 * 询列表要显示的字段
		 */
		getTableFields(data?: any): Promise<any>;
		/**
		 * 固定资产生成编号
		 */
		createCustomNo(data?: any): Promise<any>;
		/**
		 * 查询详情信息（tab数据格式）
		 */
		getById(data?: any): Promise<any>;
		/**
		 * 财厅数据表导入
		 */
		import(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<AssetsFixedGoodsEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: AssetsFixedGoodsEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<AssetsFixedGoodsEntity[]>;
		/**
		 * 权限标识
		 */
		permission: {
			getFixedAssetsStatusLabel: string;
			getLabelUseableData: string;
			getInventoryByPage: string;
			getUpsertFields: string;
			getTableFields: string;
			createCustomNo: string;
			getById: string;
			import: string;
			delete: string;
			update: string;
			info: string;
			page: string;
			add: string;
			list: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			getFixedAssetsStatusLabel: boolean;
			getLabelUseableData: boolean;
			getInventoryByPage: boolean;
			getUpsertFields: boolean;
			getTableFields: boolean;
			createCustomNo: boolean;
			getById: boolean;
			import: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			page: boolean;
			add: boolean;
			list: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AssetsFixedAssetsFixedGoodsGetController {
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<AssetsFixedGoodsGetEntity>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<AssetsFixedGoodsGetEntity[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: AssetsFixedGoodsGetEntity[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			info: string;
			add: string;
			list: string;
			page: string;
			update: string;
			delete: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			info: boolean;
			add: boolean;
			list: boolean;
			page: boolean;
			update: boolean;
			delete: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AssetsFixedFieldCookieDataController {
		/**
		 * 获取固定资产新配置的字段
		 */
		getFixedAssetsNewCustomFields(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<FieldCookieDataEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<FieldCookieDataEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: FieldCookieDataEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			getFixedAssetsNewCustomFields: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			getFixedAssetsNewCustomFields: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AssetsFixedFieldSelectOptionController {
		/**
		 * 树形表数据
		 */
		getTreeData(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<FieldSelectOptionEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<FieldSelectOptionEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: FieldSelectOptionEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			getTreeData: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			getTreeData: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AssetsFixedFixedAssetsGoodsDiscardController {
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<FixedAssetsGoodsDiscardEntity>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<FixedAssetsGoodsDiscardEntity[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: FixedAssetsGoodsDiscardEntity[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			info: string;
			add: string;
			list: string;
			page: string;
			update: string;
			delete: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			info: boolean;
			add: boolean;
			list: boolean;
			page: boolean;
			update: boolean;
			delete: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AssetsGoodsSupplier {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<GoodsSupplierEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<GoodsSupplierEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: GoodsSupplierEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AssetsImmaterialImmaterialAssetsFieldController {
		/**
		 * 无形资产表配置 保存
		 */
		saveImmaterialAssetsFieldSet(data?: any): Promise<any>;
		/**
		 * 字段类型
		 */
		getAllDataType(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ImmaterialAssetsFieldEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<ImmaterialAssetsFieldEntity[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: ImmaterialAssetsFieldEntity[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			saveImmaterialAssetsFieldSet: string;
			getAllDataType: string;
			info: string;
			list: string;
			page: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			saveImmaterialAssetsFieldSet: boolean;
			getAllDataType: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AssetsLabelAssetsGoodsLabelController {
		/**
		 * 物品标签保存
		 */
		addGoodsLabel(data?: any): Promise<any>;
		/**
		 * 查询固定资产物品标签信息
		 */
		getGoodsLabel(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<AssetsGoodsLabelEntity[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: AssetsGoodsLabelEntity[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<AssetsGoodsLabelEntity>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			addGoodsLabel: string;
			getGoodsLabel: string;
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			addGoodsLabel: boolean;
			getGoodsLabel: boolean;
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseComm {
		/**
		 * 修改个人信息
		 */
		personUpdate(data?: any): Promise<any>;
		/**
		 * 文件上传模式
		 */
		uploadMode(data?: any): Promise<any>;
		/**
		 * 权限与菜单
		 */
		permmenu(data?: any): Promise<any>;
		/**
		 * 个人信息
		 */
		person(data?: any): Promise<any>;
		/**
		 * 文件上传
		 */
		upload(data?: any): Promise<any>;
		/**
		 * 退出
		 */
		logout(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			personUpdate: string;
			uploadMode: string;
			permmenu: string;
			person: string;
			upload: string;
			logout: string;
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			personUpdate: boolean;
			uploadMode: boolean;
			permmenu: boolean;
			person: boolean;
			upload: boolean;
			logout: boolean;
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseOpen {
		/**
		 * 刷新token
		 */
		refreshToken(data?: any): Promise<any>;
		/**
		 * 验证码
		 */
		captcha(data?: any): Promise<any>;
		/**
		 * 登录
		 */
		login(data?: any): Promise<any>;
		/**
		 * 获得网页内容的参数值
		 */
		html(data?: any): Promise<any>;
		/**
		 * 实体信息与路径
		 */
		eps(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			refreshToken: string;
			captcha: string;
			login: string;
			html: string;
			eps: string;
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			refreshToken: boolean;
			captcha: boolean;
			login: boolean;
			html: boolean;
			eps: boolean;
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysDepartment {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 排序
		 */
		order(data?: any): Promise<any>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysDepartmentEntity[]>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysDepartmentEntity[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<BaseSysDepartmentEntity>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			order: string;
			list: string;
			add: string;
			page: string;
			info: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			order: boolean;
			list: boolean;
			add: boolean;
			page: boolean;
			info: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysLog {
		/**
		 * 日志保存时间
		 */
		setKeep(data?: any): Promise<any>;
		/**
		 * 获得日志保存时间
		 */
		getKeep(data?: any): Promise<any>;
		/**
		 * 清理
		 */
		clear(data?: any): Promise<any>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysLogEntity[];
			[key: string]: any;
		}>;
		/**
		 * list
		 */
		list(data?: any): Promise<BaseSysLogEntity[]>;
		/**
		 * info
		 */
		info(data?: any): Promise<BaseSysLogEntity>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			setKeep: string;
			getKeep: string;
			clear: string;
			page: string;
			list: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			setKeep: boolean;
			getKeep: boolean;
			clear: boolean;
			page: boolean;
			list: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysMenu {
		/**
		 * 创建代码
		 */
		create(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 解析
		 */
		parse(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysMenuEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysMenuEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysMenuEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			create: string;
			delete: string;
			update: string;
			parse: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			create: boolean;
			delete: boolean;
			update: boolean;
			parse: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysParam {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 获得网页内容的参数值
		 */
		html(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysParamEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysParamEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<BaseSysParamEntity[]>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			html: string;
			info: string;
			page: string;
			add: string;
			list: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			html: boolean;
			info: boolean;
			page: boolean;
			add: boolean;
			list: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysRole {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysRoleEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysRoleEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysRoleEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysUser {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 移动部门
		 */
		move(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysUserEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysUserEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysUserEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			move: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			move: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface CloudDb {
		/**
		 * 初始化Entity
		 */
		initEntity(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 数据操作
		 */
		data(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CloudDBEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CloudDBEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: CloudDBEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			initEntity: string;
			delete: string;
			update: string;
			data: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			initEntity: boolean;
			delete: boolean;
			update: boolean;
			data: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface CloudFuncInfo {
		/**
		 * 调用云函数
		 */
		invoke(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CloudFuncInfoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CloudFuncInfoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: CloudFuncInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			invoke: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			invoke: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface CloudFuncLog {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CloudFuncLogEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CloudFuncLogEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: CloudFuncLogEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface DemoGoods {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DemoGoodsEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DemoGoodsEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: DemoGoodsEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface DictInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 获得字典数据
		 */
		data(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DictInfoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DictInfoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: DictInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			data: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			data: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface DictType {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DictTypeEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DictTypeEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: DictTypeEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface IotDevice {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<IotDeviceEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<IotDeviceEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: IotDeviceEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface IotMessage {
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: IotMessageEntity[];
			[key: string]: any;
		}>;
		/**
		 * list
		 */
		list(data?: any): Promise<IotMessageEntity[]>;
		/**
		 * info
		 */
		info(data?: any): Promise<IotMessageEntity>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			page: string;
			list: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			page: boolean;
			list: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface IotMqtt {
		/**
		 * 推送消息
		 */
		publish(data?: any): Promise<any>;
		/**
		 * MQTT配置信息
		 */
		config(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			publish: string;
			config: string;
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			publish: boolean;
			config: boolean;
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface RecycleData {
		/**
		 * 恢复数据
		 */
		restore(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<RecycleDataEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: RecycleDataEntity[];
			[key: string]: any;
		}>;
		/**
		 * list
		 */
		list(data?: any): Promise<RecycleDataEntity[]>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			restore: string;
			info: string;
			page: string;
			list: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			restore: boolean;
			info: boolean;
			page: boolean;
			list: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface SpaceInfo {
		/**
		 * 获得WPS配置
		 */
		getConfig(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SpaceInfoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SpaceInfoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: SpaceInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			getConfig: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			getConfig: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface SpaceType {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SpaceTypeEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SpaceTypeEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: SpaceTypeEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface TaskInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 开始
		 */
		start(data?: any): Promise<any>;
		/**
		 * 执行一次
		 */
		once(data?: any): Promise<any>;
		/**
		 * 停止
		 */
		stop(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<TaskInfoEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: TaskInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 日志
		 */
		log(data?: any): Promise<any>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<TaskInfoEntity[]>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			start: string;
			once: string;
			stop: string;
			info: string;
			page: string;
			log: string;
			add: string;
			list: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			start: boolean;
			once: boolean;
			stop: boolean;
			info: boolean;
			page: boolean;
			log: boolean;
			add: boolean;
			list: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<UserInfoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<UserInfoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: UserInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	type Service = {
		request(options?: {
			url: string;
			method?: "POST" | "GET" | string;
			data?: any;
			params?: any;
			proxy?: boolean;
			[key: string]: any;
		}): Promise<any>;
		chat: { message: ChatMessage; session: ChatSession };
		test: Test;
		assets: {
			assetsCategory: AssetsAssetsCategory;
			consumable: {
				consumableAssetsFieldController: AssetsConsumableConsumableAssetsFieldController;
			};
			department: AssetsDepartment;
			employee: AssetsEmployee;
			fixed: {
				assetsFixedController: AssetsFixedAssetsFixedController;
				assetsFixedField: AssetsFixedAssetsFixedField;
				assetsFixedGoodsController: AssetsFixedAssetsFixedGoodsController;
				assetsFixedGoodsGetController: AssetsFixedAssetsFixedGoodsGetController;
				fieldCookieDataController: AssetsFixedFieldCookieDataController;
				fieldSelectOptionController: AssetsFixedFieldSelectOptionController;
				fixedAssetsGoodsDiscardController: AssetsFixedFixedAssetsGoodsDiscardController;
			};
			goodsSupplier: AssetsGoodsSupplier;
			immaterial: {
				immaterialAssetsFieldController: AssetsImmaterialImmaterialAssetsFieldController;
			};
			label: { assetsGoodsLabelController: AssetsLabelAssetsGoodsLabelController };
		};
		base: {
			comm: BaseComm;
			open: BaseOpen;
			sys: {
				department: BaseSysDepartment;
				log: BaseSysLog;
				menu: BaseSysMenu;
				param: BaseSysParam;
				role: BaseSysRole;
				user: BaseSysUser;
			};
		};
		cloud: { db: CloudDb; func: { info: CloudFuncInfo; log: CloudFuncLog } };
		demo: { goods: DemoGoods };
		dict: { info: DictInfo; type: DictType };
		iot: { device: IotDevice; message: IotMessage; mqtt: IotMqtt };
		recycle: { data: RecycleData };
		space: { info: SpaceInfo; type: SpaceType };
		task: { info: TaskInfo };
		user: { info: UserInfo };
	};
}
