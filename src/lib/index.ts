import type { PostMetadata } from '$lib/types'
export async function getPost(slug: string) {
	try {
		const post = await import(`./data/writing/${slug}.md`)
		const metadata = post.metadata as PostMetadata
		const content = post.default

		return {
			metadata,
			content
		}
	} catch (error) {
		console.error(`Failed to fetch post with slug '${slug}'. Error generated at $lib/index.ts`)
	}
}
export async function getAllPosts() {
	const blogPosts = import.meta.glob('./data/writing/*.md')
	const iterablePostFiles = Object.entries(blogPosts)

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			try {
				const { metadata } = (await resolver()) as { metadata: PostMetadata }
				const postPath = path.replace('./data/writing/', '/writing/').replace('.md', '')

				return {
					metadata: metadata,
					path: postPath
				}
			} catch (error) {
				console.error(`Failed to fetch post metadata. Error generated at $lib/index.ts`)
			}
		})
	)

	return allPosts
}

import type { ProjectMetadata } from '$lib/types'
export async function getProject(slug: string) {
	try {
		const project = await import(`./data/projects/${slug}.md`)
		const metadata= project.metadata as ProjectMetadata
		const content = project.default

		return {
			metadata,
			content
		}
	} catch (error) {
		console.error(`Failed to fetch project with slug '${slug}'. Error generated at $lib/index.ts`)
	}
}
export async function getAllProjects() {
	const projectPosts = import.meta.glob('./data/projects/*.md')
	const iterableProjectFiles = Object.entries(projectPosts)

	const allProjects = await Promise.all(
		iterableProjectFiles.map(async ([path, resolver]) => {
			try {
				const { metadata } = (await resolver()) as { metadata: ProjectMetadata }
				const projectPath = path.replace('./data/projects/', '/projects/').replace('.md', '')

				return {
					metadata: metadata,
					path: projectPath
				}
			} catch (error) {
				console.error(`Failed to fetch project metadata. Error generated at $lib/index.ts`)
			}
		})
	)

	return allProjects
}

import type { ResearchMetadata } from '$lib/types'
export async function getResearch(slug: string) {
	try {
		const research = await import(`./data/research/${slug}.md`)
		const metadata = research.metadata as ResearchMetadata
		const content = research.default

		return {
			metadata,
			content
		}
	} catch (error) {
		console.error(`Failed to fetch research with slug '${slug}'. Error generated at $lib/index.ts`)
	}
}
export async function getAllResearch() {
	const researchPosts = import.meta.glob('./data/research/*.md')
	const iterableResearchFiles = Object.entries(researchPosts)

	const allResearch = await Promise.all(
		iterableResearchFiles.map(async ([path, resolver]) => {
			try {
				const { metadata } = (await resolver()) as { metadata: ResearchMetadata }
				const researchPath = path.replace('./data/research/', '/research/').replace('.md', '')

				return {
					metadata: metadata,
					url: researchPath
				}
			} catch (error) {
				console.error(`Failed to fetch research metadata. Error generated at $lib/index.ts`)
			}
		})
	)

	return allResearch
}
