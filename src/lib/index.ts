export async function getPost(slug: string) {
	try {
		const post = await import(`./data/posts/${slug}.md`)
		const { title, date } = post.metadata
		const content = post.default

		return {
			content,
			title,
			date
		}
	} catch (error) {
		throw new Error(`Failed to fetch post with slug '${slug}'. Error generated at $lib/index.ts`)
	}
}

import type { PostMetadata } from '$lib/types'
export async function getPosts() {
	const blogPosts = import.meta.glob('./data/posts/*.md')
	const iterablePostFiles = Object.entries(blogPosts)

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver() as { metadata: PostMetadata }
			const postPath = path.replace('./data/posts/', '/writing/').replace('.md', '')

			return {
				metadata: metadata,
				path: postPath
			}
		})
	)

	return allPosts
}
