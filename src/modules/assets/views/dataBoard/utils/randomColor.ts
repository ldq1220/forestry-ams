export const randomColorArr = (length: number) => {
	const colorArr = []
	const letters = '0123456789ABCDEF'

	for (let i = 0; i < length; i++) {
		let color = '#'
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)]
		}
		colorArr.push(color)
	}
	return colorArr
}
