import { env } from '$env/dynamic/private'
import type { PageServerLoad } from './$types'
import type { GitHubEvent, LatestGitHubCommit, PostAPIResponse, ProjectAPIResponse, ResearchMetadata } from '$lib/types'

const lastFmApiKey = env.LAST_FM_API_KEY ?? ''
const githubToken = env.GITHUB_TOKEN ?? ''

async function fetchAPI<T>(url: string, fallback: T, fetchFn: typeof fetch, requestInit: RequestInit = {}): Promise<T> {
	try {
		const response = await fetchFn(url, requestInit)
		if (!response.ok) {
			throw new Error(`Failed to fetch from ${url}`)
		}
		return (await response.json()) as T
	} catch (error) {
		console.error(`Error fetching ${url}:`, error)
		return fallback
	}
}

function buildGitHubRequestInit(): RequestInit {
	const headers: Record<string, string> = {
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
		'User-Agent': 'krishgoel.com'
	}

	if (githubToken.length > 0) {
		const authorizationScheme = githubToken.startsWith('ghp_') ? 'token' : 'Bearer'
		headers.Authorization = `${authorizationScheme} ${githubToken}`
	}

	return { headers }
}

type GitHubCommitApiResponse = {
	html_url: string
	sha: string
	commit: {
		message: string
		author: {
			date: string
		} | null
		committer: {
			date: string
		} | null
	}
}

type GitHubRepositoryApiResponse = {
	full_name: string
}

async function fetchLatestGitHubCommit(fetchFn: typeof fetch): Promise<LatestGitHubCommit | null> {
	const githubRequestInit = buildGitHubRequestInit()

	const githubUsername = 'KrishGoel'
	const eventsUrl = `https://api.github.com/users/${githubUsername}/events/public?per_page=100`
	const githubEvents = await fetchAPI<GitHubEvent[]>(eventsUrl, [], fetchFn, githubRequestInit)

	const latestPushEvent =
		githubEvents.find((event) => event.type === 'PushEvent' && typeof event.repo?.name === 'string' && event.repo.name.length > 0) ?? null

	const repositoryFullName = latestPushEvent?.repo?.name ?? ''
	const eventCommitSha = latestPushEvent?.payload?.head ?? latestPushEvent?.payload?.commits?.[0]?.sha ?? ''

	if (repositoryFullName.length > 0 && eventCommitSha.length > 0) {
		const commitUrl = `https://api.github.com/repos/${repositoryFullName}/commits/${eventCommitSha}`
		const commitResponse = await fetchAPI<GitHubCommitApiResponse | null>(commitUrl, null, fetchFn, githubRequestInit)

		if (commitResponse?.html_url && commitResponse.commit?.message) {
			const timestamp =
				commitResponse.commit.author?.date ?? commitResponse.commit.committer?.date ?? latestPushEvent?.created_at ?? ''

			if (timestamp.length > 0) {
				return {
					repositoryName: repositoryFullName,
					repositoryUrl: `https://github.com/${repositoryFullName}`,
					commitMessage: commitResponse.commit.message.split('\n')[0] ?? commitResponse.commit.message,
					commitUrl: commitResponse.html_url,
					timestamp
				}
			}
		}
	}

	// Fallback: pick most recently pushed repo, then grab its latest commit.
	const repositoriesUrl = `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=pushed&direction=desc`
	const repositories = await fetchAPI<GitHubRepositoryApiResponse[]>(repositoriesUrl, [], fetchFn, githubRequestInit)
	const mostRecentlyPushedRepository = repositories[0]?.full_name ?? ''
	if (mostRecentlyPushedRepository.length === 0) return null

	const latestCommitForRepositoryUrl = `https://api.github.com/repos/${mostRecentlyPushedRepository}/commits?per_page=1`
	const commits = await fetchAPI<GitHubCommitApiResponse[]>(latestCommitForRepositoryUrl, [], fetchFn, githubRequestInit)
	const latestCommit = commits[0]
	if (!latestCommit?.html_url || !latestCommit.commit?.message) return null

	const timestamp = latestCommit.commit.author?.date ?? latestCommit.commit.committer?.date ?? ''
	if (timestamp.length === 0) return null

	return {
		repositoryName: mostRecentlyPushedRepository,
		repositoryUrl: `https://github.com/${mostRecentlyPushedRepository}`,
		commitMessage: latestCommit.commit.message.split('\n')[0] ?? latestCommit.commit.message,
		commitUrl: latestCommit.html_url,
		timestamp
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

		const latestGitHubCommit = await fetchLatestGitHubCommit(fetch)

		return {
			posts: postsToDisplay,
			projects: projectsToDisplay,
			speaking: speakingToDisplay,
			research,
			track: trackData,
			commit: latestGitHubCommit
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
