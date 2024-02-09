import { getResearch } from '$lib'

export const load = async ({ params }) => {
    try {
        return getResearch(params.slug)
    } catch (error) {
        console.error(`Failed to fetch research project. Error generated at research/[slug]/+page.ts`)
    }
}