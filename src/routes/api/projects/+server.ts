import { getAllProjects } from '$lib'
import type { ProjectAPIResponse } from '$lib/types'
import { json } from '@sveltejs/kit'

export const GET = async () => {
	try {
		const allProjects = await getAllProjects()

		const filteredProjects = allProjects.filter((project): project is ProjectAPIResponse => {
			if (project === undefined) {
				console.log('Undefined project removed during filtering:', project)
			}
			return project !== undefined
		})

		const sortedProjects = filteredProjects.sort((a: ProjectAPIResponse, b: ProjectAPIResponse) => {
			return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
		})

		return json(sortedProjects)
	} catch (error) {
		console.error('Error in api/projects/+server.js:', error)
	}
}
