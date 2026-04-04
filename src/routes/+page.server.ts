import { env } from '$env/dynamic/private'
import type { PageServerLoad } from './$types'
import type {
	GitHubCommitListItem,
	GitHubUserRepo,
	LatestPublicGitHubCommit,
	PostAPIResponse,
	ProjectAPIResponse,
	ResearchMetadata
} from '$lib/types'

const lastFmApiKey = env.LAST_FM_API_KEY ?? ''
const githubUsername = 'KrishGoel'
const githubToken = env.GITHUB_TOKEN ?? ''

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

function githubRequestHeaders(): HeadersInit {
	const headers: Record<string, string> = {
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28'
	}
	if (githubToken.length > 0) {
		headers.Authorization = `Bearer ${githubToken}`
	}
	return headers
}

async function fetchGitHubJson<T>(url: string, fallback: T, fetchFn: typeof fetch): Promise<T> {
	try {
		const response = await fetchFn(url, { headers: githubRequestHeaders() })
		if (!response.ok) {
			throw new Error(`GitHub API ${response.status} for ${url}`)
		}
		return (await response.json()) as T
	} catch (error) {
		console.error(`Error fetching ${url}:`, error)
		return fallback
	}
}

function firstLineOfCommitMessage(message: string): string {
	const newlineIndex = message.indexOf('\n')
	return newlineIndex === -1 ? message.trim() : message.slice(0, newlineIndex).trim()
}

function committedAtFromCommitItem(item: GitHubCommitListItem): string | null {
	const committerDate = item.commit.committer?.date
	const authorDate = item.commit.author?.date
	return committerDate ?? authorDate ?? null
}

async function resolveLatestPublicGitHubCommit(fetchFn: typeof fetch): Promise<LatestPublicGitHubCommit | null> {
	const repositoryListUrl = new URL(`https://api.github.com/users/${githubUsername}/repos`)
	repositoryListUrl.searchParams.set('sort', 'pushed')
	repositoryListUrl.searchParams.set('per_page', '20')
	repositoryListUrl.searchParams.set('type', 'owner')

	const repositories = await fetchGitHubJson<GitHubUserRepo[]>(repositoryListUrl.toString(), [], fetchFn)

	const candidateRepositories = repositories.filter(
		(repository) => !repository.private && !repository.fork && repository.pushed_at !== null
	)

	let best: LatestPublicGitHubCommit | null = null
	let bestCommittedAtMs = 0

	for (const repository of candidateRepositories) {
		const commitsUrl = new URL(`https://api.github.com/repos/${repository.full_name}/commits`)
		commitsUrl.searchParams.set('author', githubUsername)
		commitsUrl.searchParams.set('per_page', '1')

		const commits = await fetchGitHubJson<GitHubCommitListItem[]>(commitsUrl.toString(), [], fetchFn)
		const headCommit = commits[0]
		if (!headCommit) {
			continue
		}

		const committedAtIso = committedAtFromCommitItem(headCommit)
		if (!committedAtIso) {
			continue
		}

		const committedAtMs = Date.parse(committedAtIso)
		if (Number.isNaN(committedAtMs) || committedAtMs <= bestCommittedAtMs) {
			continue
		}

		bestCommittedAtMs = committedAtMs
		best = {
			repositoryFullName: repository.full_name,
			repositoryHtmlUrl: `https://github.com/${repository.full_name}`,
			commitShortSha: headCommit.sha.slice(0, 7),
			commitHtmlUrl: headCommit.html_url,
			messageFirstLine: firstLineOfCommitMessage(headCommit.commit.message),
			committedAtIso
		}
	}

	return best
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

		const latestPublicGitHubCommit = await resolveLatestPublicGitHubCommit(fetch)

		return {
			posts: postsToDisplay,
			projects: projectsToDisplay,
			speaking: speakingToDisplay,
			research,
			track: trackData,
			commit: latestPublicGitHubCommit
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
