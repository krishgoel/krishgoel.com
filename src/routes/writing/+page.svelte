<script lang="ts">
	import type { PostAPIResponse } from '$lib/types'
	export let data: { posts: PostAPIResponse[] }

	import BlogCard from '$lib/components/BlogCard.svelte'
</script>

<div class="py-16">
	<div class="grid md:grid-cols-2 mb-6">
		<div>
			<h1 class="mr-4 inline">Featured Projects</h1>
			<p>This is a detailed list of all the projects I've worked on so far, it includes my hackathon submissions, side tinkers, startup ideas, and non-profits.</p>
		</div>
	</div>
	<div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
		{#each Array(4) as _, j}
			<div class="hidden lg:block">
				<div class="space-y-4">
					{#each data.posts as post, i}
						{#if i % 4 == j}
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
