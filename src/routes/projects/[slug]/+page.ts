import { getProject } from '$lib'

export const load = async ({ params }) => {
    try {
        return getProject(params.slug)
    } catch (error) {
        throw new Error(`Failed to fetch post with slug '${params.slug}'. Error generated at projects/[slug]/+page.ts`)
    }
}