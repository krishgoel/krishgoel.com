export type PostMetadata = {
    title: string,
    date: Date,
    time: string,
    description: string,
    tags: { text: string, styling: string }[],
    displayOnIndex: boolean
}
export type PostAPIResponse = {
    metadata: PostMetadata,
    path: string
}

export type ProjectMetadata = {
    title: string,
    type: string,
    date: Date,
    time: string,
    description: string,
    links: { text: string, url: string }[],
    image: string,
    displayOnIndex: boolean
}
export type ProjectAPIResponse = {
    metadata: ProjectMetadata,
    path: string
}

export type SpeakingMetadata = {
    title: string,
    date: Date,
    time: string,
    description: string,
    image: string,
}
export type SpeakingAPIResponse = {
    metadata: SpeakingMetadata,
    path: string
}

export type ResearchMetadata = {
    title: string,
    // date: Date,
    time: string,
    description: string,
    abstract: string,
    authors: string[],
    published_in: string,
    url: string
}
export type ResearchAPIResponse = {
    metadata: ResearchMetadata,
    // url: string
}

/** Minimal fields from GET /repos/{owner}/{repo}/commits (GitHub REST API). */
export type GitHubCommitListItem = {
	sha: string
	html_url: string
	commit: {
		message: string
		author: { date: string | null } | null
		committer: { date: string | null } | null
	}
}

/** Minimal fields from GET /users/{username}/repos. */
export type GitHubUserRepo = {
	name: string
	full_name: string
	private: boolean
	fork: boolean
	pushed_at: string | null
}

/** Resolved latest public commit authored by the configured user (cross-repo). */
export type LatestPublicGitHubCommit = {
	repositoryFullName: string
	repositoryHtmlUrl: string
	commitShortSha: string
	commitHtmlUrl: string
	messageFirstLine: string
	committedAtIso: string
}