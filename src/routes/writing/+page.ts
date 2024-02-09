export const load = async ({ fetch }) => {
	try {
		const response = await fetch(`/api/writing`)
		const posts = await response.json()

		return {
			posts
		}
	} catch (error) {
		throw new Error(
			`Failed to fetch all posts. Error generated at writing/+page.ts`
		)
	}
}
