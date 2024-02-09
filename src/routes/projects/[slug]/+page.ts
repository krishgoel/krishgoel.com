import { getProject } from '$lib'

export const load = async ({ params }) => {
    try {
        return getProject(params.slug)
    } catch (error) {
        console.error(`Failed to fetch project. Error generated at projects/[slug]/+page.ts`)
    }
}