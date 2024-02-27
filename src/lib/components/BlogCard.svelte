<script lang="ts">
	import type { PostAPIResponse } from '$lib/types'
	export let post: PostAPIResponse

	let date = new Date(post.metadata.date)
	let month = date.toLocaleString('default', { month: 'long' })
	let year = date.getFullYear()
</script>

<div class="card rounded-lg shadow-lg">
	<div class="px-8 py-6 pt-6">
		<h2 class="mb-0">{post.metadata.title}</h2>
		<p>{month} {year}</p>
		<p>{post.metadata.description}</p>
		{#each post.metadata.tags as tag}
			<span class="text-sm inline-block mr-2 px-2 py-1 rounded-md space-y-1 {tag.styling}">{tag.text}</span>
		{/each}
		<p class="mt-4 mb-0"><a href={post.path} target="_blank" aria-label="{post.metadata.title} Blog Post">Read More ></a></p>
	</div>
</div>
