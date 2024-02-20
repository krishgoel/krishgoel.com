export type PostMetadata = {
    title: string,
    date: Date,
    description: string,
    tags: { text: string, color: string }[],
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

export type ResearchMetadata = {
    title: string,
    date: Date
}
export type ResearchAPIResponse = {
    metadata: ResearchMetadata,
    url: string
}