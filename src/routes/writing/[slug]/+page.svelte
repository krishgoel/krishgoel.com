<script lang="ts">
	import type { PostMetadata } from '$lib/types/index.js'

	export let data: { metadata: PostMetadata; content: any }
</script>

<h1>{data.metadata.title}</h1>
<p class="mb-4"><strong>[{data.metadata.time}]</strong> | {data.metadata.description}</p>
{#each data.metadata.tags as tag}
	<span class="text-sm inline-block mr-2 px-2 py-1 rounded-md mb-1 {tag.styling}">{tag.text}</span>
{/each}
<hr class="mt-8 mb-10" />
<article>
	<svelte:component this={data.content} />
</article>
