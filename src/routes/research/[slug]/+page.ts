import { getResearch } from '$lib'

export const load = async ({ params }) => {
    try {
        return getResearch(params.slug)
    } catch (error) {
        throw new Error(`Failed to fetch post with slug '${params.slug}'. Error generated at research/[slug]/+page.ts`)
    }
}