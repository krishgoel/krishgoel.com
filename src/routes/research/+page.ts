export const load = async ({ fetch }) => {
	try {
		const response = await fetch(`/api/research`)
		const projects = await response.json()

		return {
			projects
		}
	} catch (error) {
		throw new Error(
			`Failed to fetch all posts. Error generated at research/+page.ts`
		)
	}
}
