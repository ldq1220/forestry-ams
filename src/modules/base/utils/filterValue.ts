export const filterMessageType = (value: string) => {
	let str = ''
	switch (value) {
		case 'baseData':
			return (str = '基础信息')
			break
		case 'valueData':
			return (str = '价值信息')
			break
		case 'useData':
			return (str = '使用信息')
			break
		case 'incomeData':
			return (str = '入账信息')
			break
		case 'otherData':
			return (str = '其他信息')
			break

		default:
			break
	}
	return str
}
