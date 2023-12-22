<template>
	<el-button type="primary" @click="handlePrint" :disabled="disabled">打印</el-button>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
// @ts-ignore
import Socket from '../../../utils/Socket'
// @ts-ignore
import NMPrintSocket from '../../../utils/Print'
// @ts-ignore
// import { combinationPrintData } from '../../../utils/Combination'
import { ElMessage } from 'element-plus'

const props = defineProps({
	printData: {
		type: Object,
		default: () => {
			return {}
		},
	},
})
const $emit = defineEmits(['beginPrint', 'overPrint'])
const disabled = ref(true)

const combinationPrintData = computed(() => {
	const printData = JSON.parse(JSON.stringify(props.printData.labelArr))

	printData.forEach((item: { label: string; value: string }) => {
		item.label = item.label != null ? (item.label + '　　　　').substring(0, 4) : ''

		if (item.value.indexOf(']') != -1) {
			item.value = item.value.split(']')[1]
		} else if (item.value != null) {
			item.value = item.value
		} else {
			item.value = ''
		}
	})

	return {
		InitDrawingBoardParam: {
			width: 50, //画布宽度
			height: 30, //画布⾼度
			rotate: 0, //画布旋转⻆度
			path: 'ZT001.ttf', //字体
			verticalShift: 0, //⽔平偏移，暂不可⽤
			HorizontalShift: 0, //竖直偏移,暂不可⽤
		},

		elements: [
			{
				type: 'qrCode',
				json: {
					x: 4, //⽔平坐标
					y: 13.2, //垂直坐标
					height: 11, //⾼度,单位mm
					width: 11, //宽度,单位mm
					value: `${props.printData.sysNo}`, // ⽂本内容
					codeType: 31,
					rotate: 0, //旋转⻆度，仅⽀持0,90,180,270
				},
			},
			{
				type: 'text',
				json: {
					x: 2, //⽔平坐标
					y: 5, //垂直坐标
					height: 4.5, //⾼度，单位mm
					width: 28, //宽度， 单位mm
					value: `广东省林业调查`,
					fontFamily: '宋体',
					rotate: 0,
					fontSize: 2.2, //字体⼤⼩
					textAlignHorizonral: 0, //⽔平对⻬⽅式，0:左对⻬ 1:居中对⻬ 2:右对⻬
					textAlignVertical: 1, //垂直对⻬⽅式，0:顶对⻬ 1:垂直居中 2:底对⻬
					letterSpacing: 0.0, //字间距，单位mm
					lineSpacing: 1.0, //⾏间距，单位mm
					lineMode: 6, //字体⻛格（加粗、斜体、下划线），数据格式[斜体，加粗，下划线，保留]
					fontStyle: [true, false, false, false],
				},
			},
			{
				type: 'text',
				json: {
					x: 4, //⽔平坐标
					y: 8.2, //垂直坐标
					height: 4.5, //⾼度，单位mm
					width: 28, //宽度， 单位mm
					value: `规划院资产`,
					fontFamily: '宋体',
					rotate: 0,
					fontSize: 2.2, //字体⼤⼩
					textAlignHorizonral: 0, //⽔平对⻬⽅式，0:左对⻬ 1:居中对⻬ 2:右对⻬
					textAlignVertical: 1, //垂直对⻬⽅式，0:顶对⻬ 1:垂直居中 2:底对⻬
					letterSpacing: 0.0, //字间距，单位mm
					lineSpacing: 1.0, //⾏间距，单位mm
					lineMode: 6, //字体⻛格（加粗、斜体、下划线），数据格式[斜体，加粗，下划线，保留]
					fontStyle: [true, false, false, false],
				},
			},

			{
				type: 'text',
				json: {
					x: 20.5, //⽔平坐标
					y: 5, //垂直坐标
					height: 4.5, //⾼度，单位mm
					width: 26, //宽度， 单位mm
					value: `${printData[0].label}　${printData[0].value}`,
					fontFamily: '宋体',
					rotate: 0,
					fontSize: 1.8, //字体⼤⼩
					textAlignHorizonral: 0, //⽔平对⻬⽅式，0:左对⻬ 1:居中对⻬ 2:右对⻬
					textAlignVertical: 1, //垂直对⻬⽅式，0:顶对⻬ 1:垂直居中 2:底对⻬
					letterSpacing: 0.0, //字间距，单位mm
					lineSpacing: 1.0, //⾏间距，单位mm
					lineMode: 4, //字体⻛格（加粗、斜体、下划线），数据格式[斜体，加粗，下划线，保留]
					fontStyle: [false, false, false, false],
				},
			},
			{
				type: 'text',
				json: {
					x: 20.5, //⽔平坐标
					y: 10, //垂直坐标
					height: 4.5, //⾼度，单位mm
					width: 26, //宽度， 单位mm
					value: `${printData[1].label}　${printData[1].value}`,
					fontFamily: '宋体',
					rotate: 0,
					fontSize: 1.8, //字体⼤⼩
					textAlignHorizonral: 0, //⽔平对⻬⽅式，0:左对⻬ 1:居中对⻬ 2:右对⻬
					textAlignVertical: 1, //垂直对⻬⽅式，0:顶对⻬ 1:垂直居中 2:底对⻬
					letterSpacing: 0.0, //字间距，单位mm
					lineSpacing: 1.0, //⾏间距，单位mm
					lineMode: 4,
					fontStyle: [false, false, false, false], //字体⻛格（加粗、斜体、下划线），数据格式[斜体，加粗，下划线，保留]
				},
			},
			{
				type: 'text',
				json: {
					x: 20.5, //⽔平坐标
					y: 15.5, //垂直坐标
					height: 4.5, //⾼度，单位mm
					width: 26, //宽度， 单位mm
					value: `${printData[2].label}　${printData[2].value}`,
					fontFamily: '宋体',
					rotate: 0,
					fontSize: 1.8, //字体⼤⼩
					textAlignHorizonral: 0, //⽔平对⻬⽅式，0:左对⻬ 1:居中对⻬ 2:右对⻬
					textAlignVertical: 1, //垂直对⻬⽅式，0:顶对⻬ 1:垂直居中 2:底对⻬
					letterSpacing: 0.0, //字间距，单位mm
					lineSpacing: 1.0, //⾏间距，单位mm
					lineMode: 4, //字体⻛格（加粗、斜体、下划线），数据格式[斜体，加粗，下划线，保留]
					fontStyle: [false, false, false, false],
				},
			},
			{
				type: 'text',
				json: {
					x: 20.5, //⽔平坐标
					y: 21, //垂直坐标
					height: 4.5, //⾼度，单位mm
					width: 26, //宽度， 单位mm
					value: `${printData[3].label}　${printData[3].value}`,
					fontFamily: '宋体',
					rotate: 0,
					fontSize: 1.8, //字体⼤⼩
					textAlignHorizonral: 0, //⽔平对⻬⽅式，0:左对⻬ 1:居中对⻬ 2:右对⻬
					textAlignVertical: 1, //垂直对⻬⽅式，0:顶对⻬ 1:垂直居中 2:底对⻬
					letterSpacing: 0.0, //字间距，单位mm
					lineSpacing: 1.0, //⾏间距，单位mm
					lineMode: 4, //字体⻛格（加粗、斜体、下划线），数据格式[斜体，加粗，下划线，保留]
					fontStyle: [false, false, false, false],
				},
			},
			// 矩形绘制
			{
				type: 'graph',
				json: {
					x: 19.0, //⽔平坐标
					y: 4.5, //垂直坐标
					height: 22, //宽度,单位mm
					width: 28, //⾼度,单位mm
					rotate: 0, //旋转⻆度，仅⽀持0,90,180,270
					graphType: 3, //图形类型，1.矩形 2.圆⻆矩形 3.圆 4.椭圆
					cornerRadius: 0, //圆⻆
					lineWidth: 0.1, //线宽
					lineType: 1, //线条类型,1:实线,2:虚线类型,默认虚实⽐例1:1
					dashwidth: [1, 1], //线条为虚线宽度，【实线段⻓度，空线段⻓度】
				},
			},
			// 线条
			{
				type: 'line',
				json: {
					x: 19.0, //⽔平坐标
					y: 9.5, //垂直坐标
					height: 0.1, //⾼度，单位mm
					width: 28, //宽度， 单位mm
					rotate: 0, //旋转⻆度
					lineType: 1, //线条类型， 1:实线 2:虚线
					dashwidth: [1, 1], //虚线段⻓度
				},
			},
			{
				type: 'line',
				json: {
					x: 19.0, //⽔平坐标
					y: 15, //垂直坐标
					height: 0.1, //⾼度，单位mm
					width: 28, //宽度， 单位mm
					rotate: 0, //旋转⻆度
					lineType: 1, //线条类型， 1:实线 2:虚线
					dashwidth: [1, 1], //虚线段⻓度
				},
			},
			{
				type: 'line',
				json: {
					x: 19.0, //⽔平坐标
					y: 20.5, //垂直坐标
					height: 0.1, //⾼度，单位mm
					width: 28, //宽度， 单位mm
					rotate: 0, //旋转⻆度
					lineType: 1, //线条类型， 1:实线 2:虚线
					dashwidth: [1, 1], //虚线段⻓度
				},
			},
			{
				type: 'line',
				json: {
					x: 18.0, //⽔平坐标
					y: 15.5, //垂直坐标
					height: 0.1, //⾼度，单位mm
					width: 22, //宽度， 单位mm
					rotate: 90, //旋转⻆度
					lineType: 1, //线条类型， 1:实线 2:虚线
					dashwidth: [1, 1], //虚线段⻓度
				},
			},
		],
	}
})
const jsonObj = reactive({
	printerImageProcessingInfo: {
		printQuantity: 1,
	},
})

// 打印服务是否连接成功
const printSocketOpen = ref(false)
const nMPrintSocket: any = new NMPrintSocket()
const usbPrinters = ref() // USB 获取打印机设备
const usbSelectPrinter = ref('')
const onlineUsbBool = ref(false) // USB 是否连接成功
const initBool = ref(false) // USB 打印机 是否初始化
const density = ref(3)
const label_type = ref(1)
const print_mode = ref(2)

onMounted(() => {
	// 创建socket实例
	const socketData = new Socket('ws://127.0.0.1:37989')

	socketData.open(
		(openBool: boolean) => {
			// console.log(openBool, 'openBool')
			printSocketOpen.value = openBool
			disabled.value = false
		},
		(msg: { resultAck: { callback: { name: any } | undefined; info: any } }) => {
			// console.log('msg', msg)
			if (msg.resultAck.callback != undefined) {
				const callbackName = msg.resultAck.callback.name
				const msgInfo = msg.resultAck.info
				if (callbackName == 'onCoverStatusChange') {
					//盒盖状态：0-闭合、1-打开
					console.log('盒盖状态', msgInfo.capStatus)
				} else if (callbackName == 'onElectricityChange') {
					//"power" : 0-4, // 电池电量等级（共5档）
					console.log('电池电量等级', msgInfo.power)
				}
			}
		},
	)
	// 创建打印实例
	nMPrintSocket.value = new NMPrintSocket(socketData)
})

// 打印
const handlePrint = () => {
	// console.log(combinationPrintData.value.elements)
	getPrinters()
}

//更新打印机列表
const getPrinters = async () => {
	if (!printSocketOpen.value) {
		return ElMessage.error('打印服务未开启,请重试')
	}
	console.log('开始获取打印机')
	$emit('beginPrint')
	try {
		const allPrintersRes = await nMPrintSocket.value.getAllPrinters()
		// console.log('allPrintersRes------', allPrintersRes)

		// console.log(allPrintersRes, 'allPrintersRes')
		if (allPrintersRes.resultAck.errorCode === 0) {
			const allPrinters = JSON.parse(allPrintersRes.resultAck.info)
			usbPrinters.value = { ...allPrinters }
			usbSelectPrinter.value = Object.keys(usbPrinters.value)[0]
			console.log('usbSelectPrinter.value', usbSelectPrinter.value)

			// 连接打印机
			selectOnLineUsbPrinter() // 连接打印机
		} else {
			ElMessage.error('没有在线的打印机,请重试')
			$emit('overPrint')
			// console.log('没有在线的打印机')
			// getPrinters()
		}
	} catch (err) {
		console.error(err)
	}
}

// 连接打印机
const selectOnLineUsbPrinter = async () => {
	if (!printSocketOpen.value) {
		return ElMessage.error('打印服务未开启')
	}
	console.log('开始连接打印机')
	try {
		const res = await nMPrintSocket.value.selectPrinter(usbSelectPrinter.value, parseInt(usbPrinters.value[usbSelectPrinter.value]))
		// console.log('选择打印机', res)

		if (res.resultAck.errorCode === 0) {
			console.log('连接成功')
			onlineUsbBool.value = true

			init() // 初始化
			// ElMessage.success('连接成功')
		} else {
			console.log('连接失败')
			onlineUsbBool.value = false
			selectOnLineUsbPrinter()
			// ElMessage.error('连接失败')
		}
	} catch (err) {
		console.error(err)
		$emit('overPrint')
	}
}

//初始化SDK
const init = async () => {
	if (!printSocketOpen.value) return alert('打印服务未开启')
	//初始化数据
	try {
		const res = await nMPrintSocket.value.initSdk({ fontDir: '' })
		if (res.resultAck.errorCode == 0) {
			// console.log('初始化成功')
			initBool.value = true

			startPrintJobTest(combinationPrintData.value) // 开始打印
			// console.log('开始打印')
		} else {
			console.log('初始化失败')
			$emit('overPrint')
			initBool.value = false
		}
	} catch (err) {
		console.error(err)
		$emit('overPrint')
	}
}

// 开始打印
const startPrintJobTest = (content: any) => {
	if (!printSocketOpen.value) return alert('打印服务未开启')
	let contentArr = []
	contentArr.push(content)
	batchPrintJob(contentArr)
}
//批量打印列表数据
const batchPrintJob = async (list: string | any[]) => {
	const printQuantity = jsonObj.printerImageProcessingInfo.printQuantity
	try {
		const startRes = await nMPrintSocket.value.startJob(density.value, label_type.value, print_mode.value, list.length * printQuantity)

		if (startRes.resultAck.errorCode == 0) {
			// 提交打印任务
			await printTag(list, 0)
		}
	} catch (err) {
		console.error(err)
	}
}
// 绘制打印标签
const printTag = async (list: string | any[], x: number) => {
	// console.log(list, x)
	//设置画布尺寸
	try {
		const res = await nMPrintSocket.value.InitDrawingBoard(list[x].InitDrawingBoardParam)
		if (res.resultAck.errorCode != 0) {
			return
		}
		// 提交打印任务
		printItem(list, x, list[x].elements, 0)
	} catch (err) {
		console.error(err)
	}
}
const printItem = async (list: string | any[], x: number, item: string | any[], i: number) => {
	try {
		if (i < item.length) {
			let arrParse
			switch (item[i].type) {
				case 'text':
					//绘制文本
					arrParse = await nMPrintSocket.value.DrawLableText(item[i].json)
					if (arrParse.resultAck.errorCode != 0) {
						return
					}
					i++
					await printItem(list, x, item, i)
					break
				case 'qrCode':
					arrParse = await nMPrintSocket.value.DrawLableQrCode(item[i].json)
					//绘制二维码
					if (arrParse.resultAck.errorCode !== 0) {
						return
					}
					i++
					await printItem(list, x, item, i)
					break
				case 'barCode':
					//绘制一维码
					arrParse = await nMPrintSocket.value.DrawLableBarCode(item[i].json)
					if (arrParse.resultAck.errorCode !== 0) {
						return
					}
					i++
					await printItem(list, x, item, i)
					break
				case 'line':
					//绘制线条
					arrParse = await nMPrintSocket.value.DrawLableLine(item[i].json)
					if (arrParse.resultAck.errorCode !== 0) {
						return
					}
					i++
					await printItem(list, x, item, i)
					break
				case 'graph':
					//绘制边框
					arrParse = await nMPrintSocket.value.DrawLableGraph(item[i].json)
					if (arrParse.resultAck.errorCode != 0) {
						return
					}

					i++
					await printItem(list, x, item, i)
					break
				case 'image':
					//绘制边框
					arrParse = await nMPrintSocket.value.DrawLableImage(item[i].json)
					if (arrParse.resultAck.errorCode != 0) {
						return
					}
					i++
					await printItem(list, x, item, i)
					break
			}
		} else {
			//遍历完成，开始打印
			const commitRes = await nMPrintSocket.value.commitJob(null, JSON.stringify(jsonObj))
			//回调页码为数据总长度且回调打印份数数据等于当前页需要打印的份数数据时，结束打印任务
			if (commitRes.resultAck.printQuantity == list.length && commitRes.resultAck.onPrintPageCompleted == jsonObj.printerImageProcessingInfo.printQuantity) {
				//结束打印任务
				const endRes = await nMPrintSocket.value.endJob()
				if (endRes.resultAck.errorCode === 0) {
					// console.log('打印完成')
					ElMessage.success('打印成功')
					$emit('overPrint')
				}
				return
			}
			//回调为提交成功，同时数据未发送完成时，可继续提交数据
			if (commitRes.resultAck.errorCode === 0 && x < list.length - 1) {
				//数据提交成功，数据下标+1
				console.log('发送下一页打印数据： ')
				x++
				await printTag(list, x)
			}
		}
	} catch (err) {
		console.error(err)
	}
}
</script>

<style scoped lang="scss"></style>
