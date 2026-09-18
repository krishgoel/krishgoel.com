import { read } from '$app/server'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import regularFont from '$lib/og/Akkurat-Regular.ttf'
import boldFont from '$lib/og/Akkurat-Bold.ttf'
import { resolveSeo, type Seo } from '$lib/seo'
import type { RequestHandler } from './$types'

type Node = {
	type: 'div'
	props: {
		style: Record<string, string | number>
		children?: string | Node | (string | Node)[]
	}
}

function box(style: Record<string, string | number>, children?: Node['props']['children']): Node {
	return { type: 'div', props: { style: { display: 'flex', ...style }, children } }
}

function titleSize(title: string) {
	if (title.length > 70) return 48
	if (title.length > 42) return 56
	return 72
}

function clip(text: string, max: number) {
	if (text.length <= max) return text
	return `${text.slice(0, max).replace(/\s+\S*$/, '')}…`
}

function markup(seo: Seo) {
	return box(
		{
			flexDirection: 'column',
			width: '100%',
			height: '100%',
			background: '#18181b',
			padding: '72px 80px',
			fontFamily: 'Akkurat'
		},
		[
			box(
				{ fontSize: 20, color: '#8a8a93', letterSpacing: '0.14em', textTransform: 'uppercase', height: 28 },
				seo.label
			),
			box(
				{
					fontSize: titleSize(seo.title),
					fontWeight: 700,
					color: '#ededef',
					lineHeight: 1.15,
					marginTop: 20,
					maxWidth: 1040
				},
				seo.title
			),
			box(
				{ fontSize: 26, color: '#b9b9c0', lineHeight: 1.45, marginTop: 24, maxWidth: 920 },
				clip(seo.description, 220)
			),
			box({ flexGrow: 1 }),
			box({ width: '100%', height: 1, background: '#303036', marginBottom: 28 }),
			box({ width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }, [
				box({ fontSize: 22, color: '#8a8a93' }, `krishgoel.com${seo.path === '/' ? '' : seo.path}`),
				box({ fontSize: 22, color: '#8a8a93' }, seo.kicker)
			])
		]
	)
}

let fonts: { name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' }[]

async function loadFonts() {
	if (!fonts) {
		fonts = [
			{ name: 'Akkurat', data: await read(regularFont).arrayBuffer(), weight: 400, style: 'normal' },
			{ name: 'Akkurat', data: await read(boldFont).arrayBuffer(), weight: 700, style: 'normal' }
		]
	}
	return fonts
}

export const GET: RequestHandler = async ({ params }) => {
	const path = params.path ? `/${params.path}` : '/'
	const seo = await resolveSeo(path)
	const svg = await satori(markup(seo), { width: 1200, height: 630, fonts: await loadFonts() })
	const png = new Resvg(svg).render().asPng()

	return new Response(new Uint8Array(png), {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=86400'
		}
	})
}
