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

// There are a shit ton more fields, but I don't really need them
export type GitHubEvent = {
	type: string
	created_at: string
	payload: {
		commits: {
            sha: string,
            message: string
        }[]
	}
    repo : {
        id: number,
        name: string,
        url: string
    }
}