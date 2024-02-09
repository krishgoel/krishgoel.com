import { getAllProjects } from '$lib'
import type { ProjectMetadata } from '$lib/types'
import { json } from '@sveltejs/kit'

export const GET = async () => {
	try {
		const allProjects = await getAllProjects()

		// const sortedProjects = allProjects.sort((a: {metadata: ProjectMetadata, path: string}, b: {metadata: ProjectMetadata, path: string}) => {
		// 	return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
		// })

		const sortedProjects = allProjects.sort((a, b) => {
			if (!a || !b) return 0
			return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
		})		

		return json(sortedProjects)
	} catch (error) {
		console.error('Error in projects/+server.js', error)
	}
}
