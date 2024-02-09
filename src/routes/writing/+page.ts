export const load = async ({ fetch }) => {
	try {
		const response = await fetch(`/api/writing`)
		const posts = await response.json()

		return {
			posts
		}
	} catch (error) {
		console.error(`Failed to fetch writing posts. Error generated at writing/+page.ts`)
	}
}
