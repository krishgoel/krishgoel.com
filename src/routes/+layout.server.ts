import { resolveSeo } from '$lib/seo'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ url }) => ({
	seo: await resolveSeo(url.pathname)
})
