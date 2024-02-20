import { LAST_FM_API_KEY } from '$env/static/private'

import type { PostAPIResponse, ProjectAPIResponse, ResearchMetadata } from '$lib/types'

type GitHubEvent = {
	type: string
	created_at: string
	payload: {
		commits: any[]
	}
}

export async function load({ fetch }) {
	try {
		const postsRequest = await fetch(`/api/writing`)
		if (!postsRequest.ok) {
			throw new Error('Failed to fetch posts')
		}
		const posts: PostAPIResponse[] = await postsRequest.json()
		const postsToDisplay = posts.filter((post) => post.metadata.displayOnIndex)

		const projectsRequest = await fetch(`/api/projects`)
		if (!projectsRequest.ok) {
			throw new Error('Failed to fetch projects')
		}
		const projects: ProjectAPIResponse[] = await projectsRequest.json()
		const projectsToDisplay = projects.filter((project) => project.metadata.displayOnIndex)

		const researchRequest = await fetch(`/api/research`)
		if (!researchRequest.ok) {
			throw new Error('Failed to fetch research')
		}
		const research = await researchRequest.json()

		const tracksRequest = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=KrishSkywalker&api_key=${LAST_FM_API_KEY}&format=json&limit=1`)
		if (!tracksRequest.ok) {
			throw new Error("Failed to fetch live listening data")
		}
		const trackData = tracksRequest.ok ? await tracksRequest.json() : []

		const githubRequest = await fetch('https://api.github.com/users/KrishGoel/events')
		if (!githubRequest.ok) {
			throw new Error("Failed to fetch last GitHub commit data")
		}
		const githubEvents = await githubRequest.json()
		const commitEvents = githubEvents.filter((event: GitHubEvent) => event.type === 'PushEvent' && event.payload.commits.length > 0)
		commitEvents.sort((a: GitHubEvent, b: GitHubEvent) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
		const lastCommitEvent = commitEvents[0]

		return {
			posts: postsToDisplay,
			projects: projectsToDisplay,
			research,
			track: trackData,
			commit: lastCommitEvent
		}
	} catch (error) {
		console.error(`Failed to fetch data. Error generated at +page.server.ts:`, error)
	}
}