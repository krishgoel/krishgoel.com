export const load = async ({ fetch }) => {
	try {
		const response = await fetch(`/api/projects`)
		const projects = await response.json()

		return {
			projects
		}
	} catch (error) {
		console.error(`Failed to fetch projects. Error generated at projects/+page.ts`)
	}
}
