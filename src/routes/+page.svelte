<script lang="ts">
	import type { PostAPIResponse, ProjectAPIResponse, SpeakingAPIResponse, ResearchAPIResponse, GitHubEvent } from '$lib/types'
	export let data: { posts: PostAPIResponse[]; projects: ProjectAPIResponse[]; speaking: SpeakingAPIResponse[]; research: ResearchAPIResponse[]; track: any; commit: GitHubEvent }

	import ProjectCard from '$lib/components/ProjectCard.svelte'
	import BlogCard from '$lib/components/BlogCard.svelte'
	import SpeakingCard from '$lib/components/SpeakingCard.svelte'
	// import ResearchCard from '$lib/components/ResearchCard.svelte'
</script>

<section class="web py-16">
	<div class="width-lg">
		<div class="grid md:grid-cols-2 mb-6">
			<div>
				<h1 class="mr-2 inline">Featured Projects</h1>
				<p class="inline-block"><a href="/projects" aria-label="See all projects">All Projects ></a></p>
				<p class="md:mt-0">Below are some of my favourite projects I've worked on so far, these include hackathon submissions, side tinkers, (objectively) failed startup ideas, and non-profits.</p>
			</div>
		</div>
		<div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
			{#each Array(4) as _, j}
				<div class="hidden lg:block">
					<div class="space-y-4">
						{#each data.projects as project, i}
							{#if i % 4 == j}
								<ProjectCard {project} />
							{/if}
						{/each}
					</div>
				</div>
			{/each}
			{#each Array(2) as _, j}
				<div class="lg:hidden md:block hidden">
					<div class="space-y-4">
						{#each data.projects as project, i}
							{#if i % 2 == j}
								<ProjectCard {project} />
							{/if}
						{/each}
					</div>
				</div>
			{/each}
			{#each data.projects as project}
				<div class="md:hidden">
					<ProjectCard {project} />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="light py-16">
	<div class="width-lg">
		<div class="grid md:grid-cols-2 mb-6">
			<div>
				<h1 class="mr-2 inline">Writing</h1>
				<p class="inline-block"><a href="/projects" aria-label="See all projects">All Writings ></a></p>
				<p class="md:mt-0">This is a detailed list of all the projects I've worked on so far, it includes my hackathon submissions, side tinkers, startup ideas, and non-profits.</p>
			</div>
		</div>
		<div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
			{#each Array(3) as _, j}
				<div class="hidden lg:block">
					<div class="space-y-4">
						{#each data.posts as post, i}
							{#if i % 3 == j}
								<BlogCard {post} />
							{/if}
						{/each}
					</div>
				</div>
			{/each}
			{#each Array(2) as _, j}
				<div class="lg:hidden md:block hidden">
					<div class="space-y-4">
						{#each data.posts as post, i}
							{#if i % 2 == j}
								<BlogCard {post} />
							{/if}
						{/each}
					</div>
				</div>
			{/each}
			{#each data.posts as post}
				<div class="md:hidden">
					<BlogCard {post} />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="web py-16">
	<div class="width-lg">
		<div class="grid md:grid-cols-2 mb-6">
			<div>
				<h1 class="mr-2 inline">Speaking, Teaching and Public Things?</h1>
				<p class="inline-block"><a href="/projects" aria-label="See all projects">All Projects ></a></p>
				<p class="md:mt-0">This is a detailed list of all the projects I've worked on so far, it includes my hackathon submissions, side tinkers, startup ideas, and non-profits.</p>
			</div>
		</div>
		<div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
			{#each Array(4) as _, j}
				<div class="hidden lg:block">
					<div class="space-y-4">
						{#each data.speaking as speaking, i}
							{#if i % 4 == j}
								<SpeakingCard {speaking} />
							{/if}
						{/each}
					</div>
				</div>
			{/each}
			{#each Array(2) as _, j}
				<div class="lg:hidden md:block hidden">
					<div class="space-y-4">
						{#each data.speaking as speaking, i}
							{#if i % 2 == j}
								<SpeakingCard {speaking} />
							{/if}
						{/each}
					</div>
				</div>
			{/each}
			{#each data.speaking as speaking}
				<div class="md:hidden">
					<SpeakingCard {speaking} />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="light py-16">
	<div class="width-lg">
		<h1 class="mb-0">Hoping to populate this section soon</h1>
		<!-- <div class="grid md:grid-cols-2 mb-6">
			<div>
					<h1 class="mr-2 mb-0 inline">Hoping to populate this section soon</h1>
					<p class="inline-block"><a href="/projects" aria-label="See all projects">All Writings ></a></p>
				<p>This is a detailed list of all the projects I've worked on so far, it includes my hackathon submissions, side tinkers, startup ideas, and non-profits.</p>
			</div>
		</div>
		<div class="gap-y-4">
			{#each data.research as research}
				<ResearchCard {research} />
			{/each}
		</div> -->
	</div>
</section>

<section class="web py-16" id="contact">
	<div class="width-lg grid md:grid-cols-2 gap-6 flex items-center">
		<div class="card rounded-lg py-6 md:px-12 px-6">
			{#await data.track}
				<p>Loading my listening habits...</p>
				<h2>Loading...</h2>
				<p>Loading...</p>
			{:then data}
				{#if data.recenttracks?.track && data.recenttracks.track[0]?.hasOwnProperty('@attr')}
					<div class="flex items-baseline">
						<div class="music-animation mr-2 ml-1">
							<span class="bg-zinc-900" />
							<span class="bg-zinc-900" />
							<span class="bg-zinc-900" />
						</div>
						<p class="mb-2">Currently listening to</p>
					</div>
					<h2 class="mt-2">{data.recenttracks.track[0].name}</h2>
					<p class="mb-4">from <strong>{data.recenttracks.track[0].album['#text']}</strong> by <strong>{data.recenttracks.track[0].artist['#text']}</strong></p>
				{:else}
					<p class="mb-2">Last listened to</p>
					<h2 class="mt-2">{data.recenttracks?.track ? data.recenttracks.track[0].name : 'No track available'}</h2>
					<p class="mb-4">from <strong>{data.recenttracks?.track ? data.recenttracks.track[0].album['#text'] : 'Unknown'}</strong> by <strong>{data.recenttracks?.track ? data.recenttracks.track[0].artist['#text'] : 'Unknown'}</strong></p>
				{/if}
			{:catch error}
				<p class="mb-2">This section is supposed to display my recent listening habits</p>
				<h2>But</h2>
				<p class="mb-4">the API it relies on crashed. {error}</p>
			{/await}

			<p>Here's what <a href="/listening" aria-label="Listening">I've been listening to lately</a></p>
		</div>
		<div>
			<h2>Reach Me</h2>
			<p>I can be found on most social media platforms by <code>@krshgl</code>.</p>
			<div class="inline">
				<p class="inline-block mb-1 mr-1"><a href="https://twitter.com/krshgl" target="_blank" aria-label="Krish Goel's Twitter">Twitter/X</a></p>
				<p class="inline-block mb-1 mr-1"><a href="mailto:krishgoel3@gmail.com" target="_blank" aria-label="Krish Goel's Email">Email</a></p>
				<p class="inline-block mb-1 mr-1"><a href="https://github.com/KrishGoel" target="_blank" aria-label="Krish Goel's Github">Github</a></p>
				<p class="inline-block mb-1 mr-1"><a href="https://open.spotify.com/user/39emqovi90p90iq1sfbczkan0?si=5a1dfcc062b44a32" target="_blank" aria-label="Krish Goel's Spotify">Spotify</a></p>
				<p class="inline-block mb-1 mr-1"><a href="https://www.instagram.com/krshgl/" target="_blank" aria-label="Krish Goel's Instagram">Instagram</a></p>
				<p class="inline-block mb-1"><a href="https://www.linkedin.com/in/krishgoel/" target="_blank" aria-label="Krish Goel's LinkedIn">LinkedIn</a></p>
			</div>
			{#await data.commit}
				<p>Loading latest commit information...</p>
			{:then data}
				<p class="mt-2 mb-0">
					My latest GitHub Commit:
					{#if data?.repo?.name && data?.payload?.commits?.[0]?.sha && data?.payload?.commits?.[0]?.message && data?.created_at}
						<a href={`https://github.com/${data.repo.name}/commit/${data.payload.commits[0].sha}`} aria-label="My latest commit" target="_blank">
							{data.payload.commits[0].message}
						</a>
						made to
						<a href={`https://github.com/${data.repo.name}`} aria-label="Repo with the latest commit" target="_blank">
							{data.repo.name}
						</a>
						at {new Date(data.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).replace(/(am|pm)/i, (match) => match.toUpperCase())} [IST]
					{:else}
						Commit message unavailable, Repository name unavailable, or Timestamp unavailable.
					{/if}
				</p>
			{:catch error}
				<p>Failed to retrieve the latest commit information from Github. {error.message || 'Error details unavailable'}.</p>
			{/await}
		</div>
	</div>
</section>

<style>
	.music-animation {
		position: relative;
		display: flex;
		justify-content: space-between;
		width: 13px;
		height: 13px;
	}
	.music-animation span {
		width: 3px;
		height: 100%;
		border-radius: 3px;
		transform-origin: bottom;
		animation: playing 3s ease infinite alternate;
	}
	@keyframes playing {
		10% {
			transform: scaleY(0.3);
		}

		30% {
			transform: scaleY(1);
		}

		60% {
			transform: scaleY(0.5);
		}

		80% {
			transform: scaleY(0.75);
		}

		100% {
			transform: scaleY(0.6);
		}
	}
	.music-animation span:nth-of-type(2) {
		animation-delay: -2s;
	}

	.music-animation span:nth-of-type(3) {
		animation-delay: -3.5s;
	}
</style>
