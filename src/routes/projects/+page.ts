export const load = async ({ fetch }) => {
	try {
		const response = await fetch(`/api/projects`)
		const projects = await response.json()

		return {
			projects
		}
	} catch (error) {
		throw new Error(
			`Failed to fetch all posts. Error generated at projects/+page.ts`
		)
	}
}
