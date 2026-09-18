<script lang="ts">
	import '../app.css'
	import { dev } from '$app/environment'
	import { page } from '$app/stores'
	import { inject } from '@vercel/analytics'
	import { derived } from 'svelte/store'
	import { documentTitle, pageUrl, shareImageUrl, type Seo } from '$lib/seo'

	export let data: { seo: Seo }

	inject({ mode: dev ? 'development' : 'production' })

	const bodyClass = derived(page, ($page) => {
		const path = $page.url.pathname
		if (path.startsWith('/projects/') || path.startsWith('/writing/') || ['/lexicon', '/thanks', '/listening', '/bigdonmegaladon', '/be-me'].includes(path)) {
			return 'width-md md:py-16 py-12'
		}
		return path === '/' ? '' : 'width-lg'
	})

	$: title = documentTitle(data.seo)
	$: description = data.seo.description
	$: canonical = pageUrl(data.seo.path)
	$: shareImage = shareImageUrl(data.seo.path)
</script>

<svelte:head>
	<title>{title}</title>
	<meta content={title} name="title" />
	<meta content={title} property="og:title" />
	<meta content={title} name="twitter:title" />

	<meta content={description} name="description" />
	<meta content={description} property="og:description" />
	<meta content={description} name="twitter:description" />

	<meta content={canonical} property="og:url" />
	<meta content={canonical} name="twitter:url" />

	<meta property="og:image" content={shareImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={data.seo.title} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={shareImage} />
	<meta name="twitter:image:alt" content={data.seo.title} />
</svelte:head>

{#if $page.url.pathname === '/'}
	<section class="bg-[url('/images/banner.png')] bg-cover bg-no-repeat" style="background-position: 80% 50%;">
		<div class="width-lg grid md:grid-cols-2 sm:grid-cols-1 min-h-screen pb-8 pt-2 flex items-center bg-gradient-to-l from-zinc-900 md:from-transparent to-100% to-transparent">
			<div>
				<h3>Hi</h3>
				<h1 class="text-4xl">I'm Krish</h1>
				<p>I <a href="https://jaipur.manipal.edu" target="_blank" aria-label="Manipal University">attended college</a> for a total of 1.5 years and graduated with a B.Tech. in CSE with an honours in AI & ML. I get psyched out by robots, and now build Memory <a href="https://littlebird.ai" target="_blank" aria-label="Littlebird AI">@LittlebirdAI</a> full-time.</p>
				<p>I've been an intern at <a href="https://www.machanirobotics.com" target="_blank" aria-label="Machani Robotics">Machani Robotics</a>, <a href="https://www.epson.co.in/industrial-robots" target="_blank" aria-label="Epson Robotics India">Epson's Robotics Division</a>, a research intern at the <a href="https://www.icmr.gov.in/" target="_blank" aria-label="Indian Council of Medical Research">ICMR, New Delhi</a> (under <a href="https://scholar.google.co.in/citations?user=EE9ha9MAAAAJ&hl=en" target="_blank" aria-label="Dr. Hapreet Singh's Google Scholar Profile">Dr. Hapreet Singh</a>), and <a href="https://iisc.ac.in/" target="_blank" aria-label="Indian Institute of Science">IISc, Bangalore</a>.</p>
				<p>I was also the in-house DJ (read <i>President</i>) at <a href="https://www.randomizemuj.com/" target="_blank" aria-label="Randomize Website">Randomize(); - my college's CSE Club</a>. I went to <a href="https://sanskritischool.edu.in/" target="_blank" aria-label="Sanskriti School">Sanskriti School, Delhi</a> for my high school where I spent most of my summers teaching kids to code.</p>
				<p>In all my pursuits, I try to do the next most ambitious thing I can do and looking at the bigger picture, I aim to recast the education sector. Welcome to my website.</p>
				<p>For a life summary, check out my <a aria-label="Contact" href="/be-me">> be-me</a>.</p>
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
			<!-- <p class="mt-0"><a aria-label="Garden" href="/lexicon">Lexicon</a></p> -->
			<p class="mt-0"><a aria-label="Projects" href="/projects">Projects</a></p>
			<p class="mt-0"><a aria-label="Writing" href="/writing">Writing</a></p>
			<p class="mt-0"><a aria-label="Contact" href="/#contact">Contact</a></p>
			<p class="mt-0"><a aria-label="Contact" href="/be-me">> be-me</a></p>
			<p class="mt-0"><a aria-label="Resume" href="/resume.pdf" target="_blank">Resume</a></p>
		</div>
	</div>
</nav>

<div class="bodyspace {$bodyClass}">
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
