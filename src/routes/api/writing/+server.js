import { getPosts } from '$lib'
import { json } from '@sveltejs/kit'

export const GET = async () => {
	const allPosts = await getPosts()

	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
	})

	return json(sortedPosts)
}