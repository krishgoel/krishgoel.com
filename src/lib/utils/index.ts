export function dateToString(date: Date): string {
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const dateReceived = new Date(date)

	const month = monthNames[dateReceived.getMonth()]
	const year = dateReceived.getFullYear().toString()

	return `${month} ${year}`
}
