import { getPost, getProject, getResearch, getSpeaking } from '$lib'

export type Seo = {
	title: string
	description: string
	label: string
	kicker: string
	path: string
}

export const siteOrigin = 'https://krishgoel.com'

const pages: Record<string, Pick<Seo, 'title' | 'description' | 'label'>> = {
	'/': {
		title: 'Krish Goel',
		description: 'Hi, welcome to my website. I love robots and AI.',
		label: ''
	},
	'/lexicon': {
		title: 'Lexicon',
		description: 'Personal wiki of cool stuff from the internet.',
		label: 'Lexicon'
	},
	'/projects': {
		title: 'Projects',
		description: "Things I'm working on, and things I've built so far.",
		label: 'Projects'
	},
	'/writing': {
		title: 'Writings',
		description: 'Thoughts, published, updated very (in)frequently.',
		label: 'Writing'
	},
	'/thanks': {
		title: 'Thanks',
		description: 'idk why this would need a description.',
		label: 'Thanks'
	},
	'/listening': {
		title: 'Listening',
		description: "What I'm listening to this week.",
		label: 'Listening'
	},
	'/bigdonmegaladon': {
		title: 'Big Don Megaladon',
		description: 'Sanskriti Batch of 21 Yearbook Gang.',
		label: 'Yearbook'
	},
	'/be-me': {
		title: '> Be me',
		description: 'A summary of my life and work hitherto.',
		label: 'About'
	},
	'/research': {
		title: 'Research',
		description: 'Papers and other research.',
		label: 'Research'
	},
	'/speaking': {
		title: 'Speaking',
		description: 'Talks, workshops, and other public things.',
		label: 'Speaking'
	}
}

const fallback: Seo = {
	title: 'Krish Goel',
	description: pages['/'].description,
	label: '',
	kicker: '',
	path: '/'
}

function plainText(value: string) {
	return value.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ').trim()
}

function pageToSeo(path: string, page: Pick<Seo, 'title' | 'description' | 'label'>): Seo {
	return { ...page, description: plainText(page.description), kicker: '', path }
}

export function documentTitle(seo: Seo) {
	return `${seo.title} | krishgoel.com`
}

export function pageUrl(path: string) {
	return `${siteOrigin}${path}`
}

export function shareImageUrl(path: string) {
	return `${siteOrigin}/og${path === '/' ? '' : path}`
}

export async function resolveSeo(path: string): Promise<Seo> {
	const staticPage = pages[path]
	if (staticPage) return pageToSeo(path, staticPage)

	const segments = path.split('/').filter(Boolean)
	if (segments.length !== 2) return { ...fallback, path }

	const [collection, slug] = segments

	try {
		if (collection === 'writing') {
			const { metadata } = await getPost(slug)
			return { title: metadata.title, description: plainText(metadata.description), label: 'Writing', kicker: metadata.time, path }
		}
		if (collection === 'projects') {
			const { metadata } = await getProject(slug)
			return { title: metadata.title, description: plainText(metadata.description), label: 'Project', kicker: metadata.type, path }
		}
		if (collection === 'speaking') {
			const { metadata } = await getSpeaking(slug)
			return { title: metadata.title, description: plainText(metadata.description), label: 'Speaking', kicker: metadata.time, path }
		}
		if (collection === 'research') {
			const { metadata } = await getResearch(slug)
			return { title: metadata.title, description: plainText(metadata.description), label: 'Research', kicker: metadata.time, path }
		}
	} catch {
		return { ...fallback, path }
	}

	return { ...fallback, path }
}
