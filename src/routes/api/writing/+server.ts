import { getAllPosts } from '$lib'
import type { PostAPIResponse } from '$lib/types'
import { json } from '@sveltejs/kit'

export const GET = async () => {
	try {
		const allPosts = await getAllPosts()

		const filteredPosts = allPosts.filter((post): post is PostAPIResponse => {
			if (post === undefined) {
				console.log('Undefined post removed during filtering:', post)
			}
			return post !== undefined
		})

		const sortedPosts = filteredPosts.sort((a: PostAPIResponse, b: PostAPIResponse) => {
			return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
		})

		return json(sortedPosts)
	} catch (error) {
		console.error('Error in api/writing/+server.js:', error)
	}
}
