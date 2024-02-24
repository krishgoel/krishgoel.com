export const load = async ({ fetch }) => {
	try {
		const response = await fetch(`/api/speaking`)
		const projects = await response.json()

		return {
			projects
		}
	} catch (error) {
		console.error(`Failed to fetch research projects. Error generated at research/+page.ts`)
	}
}
