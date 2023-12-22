export const departmentFilter = (id: number, data: any) => {
	let name = ''
	data.forEach((item: { id: number; name: string }) => {
		if (item.id == id) return (name = item.name)
	})
	return name
}
