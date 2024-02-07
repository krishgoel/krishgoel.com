export async function getPost(slug: string) {
    try {
        const post = await import(`./data/blog/${slug}.md`)
        const { title, date } = post.metadata
        const content = post.default

        return {
            content,
            title,
            date
        }
    } catch (error) {
        throw new Error(`Failed to fetch post with slug '${slug}'`)
    }
}
