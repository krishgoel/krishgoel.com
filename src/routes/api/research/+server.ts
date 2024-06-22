import { getAllResearch } from '$lib'
import type { ResearchAPIResponse } from '$lib/types'
import { json } from '@sveltejs/kit'

export const GET = async () => {
	try {
		const allResearch = await getAllResearch()

		const filteredResearch = allResearch.filter((research): research is ResearchAPIResponse => {
			if (research === undefined) {
				console.log('Undefined research post removed during filtering:', research)
			}
			return research !== undefined
		})

		const sortedResearch = filteredResearch.sort((a: ResearchAPIResponse, b: ResearchAPIResponse) => {
			return new Date(b.metadata.time).getTime() - new Date(a.metadata.time).getTime()
		})

		return json(sortedResearch)
	} catch (error) {
		console.error('Error in api/research/+server.js:', error)
	}
}
