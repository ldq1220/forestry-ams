var width = 50
var height = 30
var rotate = 0
// var marginX = 2.0
// var marginY = 2.0
// var contentWidth = width - marginX * 2
// var qrCodeHeight = height - marginY * 2
// var qrCodeWidth = qrCodeHeight
// var fontSize = 2.2

//组合打印数据
export const combinationPrintData = {
	InitDrawingBoardParam: {
		width: width, //画布宽度
		height: height, //画布⾼度
		rotate: rotate, //画布旋转⻆度
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
				value: '12345678', // ⽂本内容
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
				value: `资产名称　电路`,
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
				value: '规格型号　LS-6520-22SG-SI-22SG-SI22SG-SI123456789123456789',
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
				value: '规格型号　LS-6520-22SG-SI',
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
				value: '规格型号　LS-6520-22SG-SI',
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
