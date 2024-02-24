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
			const dateA = new Date(a.metadata.date)
			const dateB = new Date(b.metadata.date)
			const monthA = dateA.getMonth()
			const yearA = dateA.getFullYear()
			const monthB = dateB.getMonth()
			const yearB = dateB.getFullYear()

			if (yearB === yearA) {
				return monthB - monthA
			} else {
				return yearB - yearA
			}
		})

		return json(sortedPosts)
	} catch (error) {
		console.error('Error in api/writing/+server.js:', error)
	}
}
