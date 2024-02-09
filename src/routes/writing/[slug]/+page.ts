import { getPost } from '$lib'

export const load = async ({ params }) => {
    try {
        return getPost(params.slug)
    } catch (error) {
        console.error(`Failed to fetch writing post. Error generated at writing/[slug]/+page.ts`)
    }
}