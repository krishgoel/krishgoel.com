import { getAllProjects } from '$lib'
import { json } from '@sveltejs/kit'

export const GET = async () => {
	const allProjects = await getAllProjects()

	const sortedProjects = allProjects.sort((a, b) => {
		return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
	})

	return json(sortedProjects)
}