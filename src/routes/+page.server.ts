import { env } from '$env/dynamic/private'
import type { PageServerLoad } from './$types'
import type { GitHubEvent, PostAPIResponse, ProjectAPIResponse, ResearchMetadata } from '$lib/types'

const lastFmApiKey = env.LAST_FM_API_KEY ?? ''

async function fetchAPI<T>(url: string, fallback: T, fetchFn: typeof fetch): Promise<T> {
	try {
		const response = await fetchFn(url)
		if (!response.ok) {
			throw new Error(`Failed to fetch from ${url}`)
		}
		return (await response.json()) as T
	} catch (error) {
		console.error(`Error fetching ${url}:`, error)
		return fallback
	}
}

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const posts = await fetchAPI<PostAPIResponse[]>('/api/writing', [], fetch)
		const postsToDisplay = posts.filter((post) => post.metadata.displayOnIndex)

		const projects = await fetchAPI<ProjectAPIResponse[]>('/api/projects', [], fetch)
		const projectsToDisplay = projects.filter((project) => project.metadata.displayOnIndex)

		// const speakingToDisplay = await fetchAPI<PostAPIResponse[]>('/api/speaking', [], fetch)
		const speakingToDisplay: PostAPIResponse[] = []

		const research = await fetchAPI<ResearchMetadata[]>('/api/research', [], fetch)

		const trackData =
			lastFmApiKey.length > 0
				? await fetchAPI<any>(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=KrishSkywalker&api_key=${lastFmApiKey}&format=json&limit=1`, {}, fetch)
				: {}

		const githubEvents = await fetchAPI<GitHubEvent[]>('https://api.github.com/users/KrishGoel/events', [], fetch)
		const commitEvents = githubEvents.filter((event) => event.type === 'PushEvent' && Array.isArray(event.payload?.commits) && event.payload.commits.length > 0)
		commitEvents.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
		const lastCommitEvent = commitEvents[0] ?? null

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
		return {
			posts: [],
			projects: [],
			speaking: [],
			research: [],
			track: {},
			commit: null
		}
	}
}
