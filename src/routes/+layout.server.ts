export const load = async ({ fetch }) => {
	try {
		const projectsRequest = await fetch(`/api/projects`)
		const projects = await projectsRequest.json()

        const blogRequest = await fetch(`/api/writing`)
        const blog = await blogRequest.json()

        const speakingRequest = await fetch(`/api/speaking`)
        const speaking = await speakingRequest.json()

		return {
			projects,
            blog,
            speaking,
		}
	} catch (error) {
		console.error(`Failed to fetch projects. Error generated at +layout.server.ts`)
	}
}
