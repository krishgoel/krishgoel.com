import { env } from '$env/dynamic/private'
const LAST_FM_API_KEY = env.LAST_FM_API_KEY

import type { PostAPIResponse, ProjectAPIResponse, ResearchMetadata, GitHubEvent } from '$lib/types'

async function fetchAPI<T>(url: string, fallback: T, fetchFn: typeof fetch): Promise<T> {
	try {
		const response = await fetchFn(url)
		if (!response.ok) {
			throw new Error(`Failed to fetch from ${url}`)
		}
		return response.json()
	} catch (error) {
		console.error(`Error fetching ${url}:`, error)
		return fallback
	}
}

export async function load({ fetch }) {
	try {
		const postsToDisplay = await fetchAPI<PostAPIResponse[]>('/api/writing', [], fetch).then((posts) => posts.filter((post) => post.metadata.displayOnIndex))

		const projectsToDisplay = await fetchAPI<ProjectAPIResponse[]>('/api/projects', [], fetch).then((projects) => projects.filter((project) => project.metadata.displayOnIndex))

		const speakingToDisplay = await fetchAPI<PostAPIResponse[]>('/api/speaking', [], fetch)

		const research = await fetchAPI<ResearchMetadata[]>('/api/research', [], fetch)

		const trackData = await fetchAPI<any>(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=KrishSkywalker&api_key=${LAST_FM_API_KEY}&format=json&limit=1`, {}, fetch)

		const githubEvents = await fetchAPI<GitHubEvent[]>('https://api.github.com/users/KrishGoel/events', [], fetch)
		const commitEvents = githubEvents.filter((event) => event.type === 'PushEvent' && event.payload.commits.length > 0)
		commitEvents.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
		const lastCommitEvent = commitEvents[0]

		return {
			posts: postsToDisplay,
			projects: projectsToDisplay,
			speaking: speakingToDisplay,
			research,
			track: trackData,
			commit: lastCommitEvent
		}
	} catch (error) {
		console.error(`Failed to fetch data. Error generated at +page.server.ts:`, error)
	}
}
