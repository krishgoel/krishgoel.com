<script lang="ts">
	import '../app.css'
	import { page } from '$app/stores'

	import type { ProjectAPIResponse, PostAPIResponse, SpeakingAPIResponse } from '$lib/types'
	export let data: { projects: ProjectAPIResponse[]; blog: PostAPIResponse[]; speaking: SpeakingAPIResponse[] }

	import { dev } from '$app/environment'
	import { inject } from '@vercel/analytics'
	inject({ mode: dev ? 'development' : 'production' })

	const defaultTitle = 'Krish Goel | krishgoel.com'
	const defaultDescription = 'Hi, welcome to my website. I love robots and AI.'

	const pageData = {
		'/': {
			title: 'Krish Goel',
			description: 'Hi, welcome to my website. I love robots and AI.'
		},
		'/lexicon': {
			title: 'Lexicon',
			description: 'Personal wiki of cool stuff from the internet.'
		},
		'/projects': {
			title: 'Projects',
			description: "Things I'm working on, and things I've built so far."
		},
		'/writing': {
			title: 'Writings',
			description: 'Thoughts, published, updated very (in)frequently.'
		},
		'/thanks': {
			title: 'Thanks',
			description: 'idk why this would need a description.'
		},
		'/listening': {
			title: 'Listening',
			description: "What I'm listening to this week."
		},
		'/bigdonmegaladon': {
			title: 'Big Don Megaladon',
			description: 'Sanskriti Batch of 21 Yearbook Gang.'
		}
	}

	const getTitleAndDescription = (pathname: string) => {
		if (pageData[pathname as keyof typeof pageData]) {
			const { title, description } = pageData[pathname as keyof typeof pageData]
			return { title: `${title} | krishgoel.com`, description }
		}

		const dynamicPageCheck = [
			{ key: '/projects/', data: data.projects },
			{ key: '/writing/', data: data.blog },
			{ key: '/speaking/', data: data.speaking }
		]

		for (const { key, data } of dynamicPageCheck) {
			if (pathname.startsWith(key)) {
				const item = data.find((p) => p.path === pathname)
				if (item) {
					return { title: `${item.metadata.title} | krishgoel.com`, description: item.metadata.description }
				}
				break
			}
		}

		return { title: defaultTitle, description: defaultDescription }
	}

	let title: string = defaultTitle
	let description: string = defaultDescription

	$: {
		const { title: newTitle, description: newDescription } = getTitleAndDescription($page.url.pathname)
		title = newTitle
		description = newDescription
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta content={title} name="title" />
	<meta content={title} property="og:title" />
	<meta content={title} name="twitter:title" />

	<meta content={description} name="description" />
	<meta content={description} property="og:description" />
	<meta content={description} name="twitter:description" />

	<meta content="https://krishgoel.com{$page.url.pathname}" property="og:url" />
	<meta content="https://krishgoel.com{$page.url.pathname}" name="twitter:url" />
</svelte:head>

{#if $page.url.pathname === '/'}
	<section class="bg-[url('/images/banner.png')] bg-cover bg-no-repeat" style="background-position: 80% 50%;">
		<div class="width-lg grid md:grid-cols-2 sm:grid-cols-1 min-h-screen pb-8 pt-2 flex items-center bg-gradient-to-l from-zinc-900 md:from-transparent to-100% to-transparent">
			<div>
				<h3>Hi</h3>
				<h1 class="text-4xl">I'm Krish</h1>
				<p>A 3rd year at <a href="https://jaipur.manipal.edu" target="_blank" aria-label="Manipal University">Manipal University</a> majoring in Computer Science with a specialisation in AI & ML. I get psyched out by robots, and I am working towards building a career at the intersection of NLP and cyberphysical systems to produce more general-purpose robots.</p>
				<p>I've been an intern at <a href="https://www.epson.co.in/industrial-robots" target="_blank" aria-label="Epson Robotics India">Epson's Robotics Division</a>, a research intern at the <a href="https://www.icmr.gov.in/" target="_blank" aria-label="Indian Council of Medical Research">Indian Council of Medical Research</a> (under <a href="https://scholar.google.co.in/citations?user=EE9ha9MAAAAJ&hl=en" target="_blank" aria-label="Dr. Hapreet Singh's Google Scholar Profile">Dr. Hapreet Singh</a>), and the <a href="https://iisc.ac.in/" target="_blank" aria-label="Indian Institute of Science">Indian Institute of Science, Bangalore</a>.</p>
				<p>I am also the in-house DJ (read <i>President</i>) at <a href="https://www.randomizemuj.com/" target="_blank" aria-label="Randomize Website">Randomize(); - my college's CSE Club</a>. I went to <a href="https://www.icmr.gov.in/" target="_blank" aria-label="Indian Council of Medical Research">Sanskriti School, Delhi</a> for my high school where I spent most of my summers teaching kids to code.</p>
				<p>Looking at the bigger picture, I aim to recast the education sector. Welcome to my website.</p>
			</div>
		</div>
	</section>
{/if}

<nav class="light py-4 shadow-lg sticky top-0 z-10">
	<div class="width-lg flex justify-between items-center whitespace-nowrap overflow-x-auto">
		{#if $page.url.pathname != '/'}
			<a aria-label="Home Page" href="/"><h2 class="mr-4 mt-0">Krish Goel</h2></a>
		{/if}
		<div class="whitespace-nowrap overflow-x-auto inline-block space-x-2">
			<p class="mt-0"><a aria-label="Garden" href="/lexicon">Lexicon</a></p>
			<p class="mt-0"><a aria-label="Projects" href="/projects">Projects</a></p>
			<p class="mt-0"><a aria-label="Writing" href="/writing">Writing</a></p>
			<p class="mt-0"><a aria-label="Contact" href="/#contact">Contact</a></p>
			<p class="mt-0"><a aria-label="Resume" href="/resume.pdf" target="_blank">Resume</a></p>
		</div>
	</div>
</nav>

<div class="bodyspace {$page.url.pathname.startsWith('/projects/') || $page.url.pathname.startsWith('/writing/') || $page.url.pathname === '/lexicon' || $page.url.pathname === '/thanks' || $page.url.pathname === '/listening' || $page.url.pathname === '/bigdonmegaladon' ? 'width-md md:py-16 py-12' : $page.url.pathname === '/' ? '' : 'width-lg'}">
	<slot />
</div>

<footer class="py-4 light">
	<div class="width-lg flex justify-between items-center">
		<p class="inline-block">&copy; Krish Goel</p>
		<div class="whitespace-nowrap overflow-x-auto inline-block space-x-2">
			<p class="inline-block"><a aria-label="Thanks" href="/thanks">Thanks</a></p>
		</div>
	</div>
</footer>

<style>
	nav h2,
	nav p,
	footer p {
		display: inline-block;
		margin-bottom: 0;
	}
</style>
