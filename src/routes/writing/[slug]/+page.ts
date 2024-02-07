import { getPost } from '$lib/index'

export function load({ params }) {
    try {
        return getPost(params.slug)
    } catch (error) {
        throw new Error(`Failed to fetch post with slug '${params.slug}'`)
    }
}