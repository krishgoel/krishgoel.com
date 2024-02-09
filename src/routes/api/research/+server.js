import { getAllResearch } from '$lib'
import { json } from '@sveltejs/kit'

export const GET = async () => {
	const allResearch = await getAllResearch()

	const sortedResearch = allResearch.sort((a, b) => {
		return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
	})

	return json(sortedResearch)
}