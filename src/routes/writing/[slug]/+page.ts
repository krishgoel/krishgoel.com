import { getPost } from '$lib'

export function load({ params }) {
    try {
        return getPost(params.slug)
    } catch (error) {
        throw new Error(`Failed to fetch post with slug '${params.slug}'. Error generated at writing/[slug]/+page.ts`)
    }
}