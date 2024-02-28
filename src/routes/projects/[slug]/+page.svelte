<script lang="ts">
	import type { ProjectMetadata } from '$lib/types/index.js'

	export let data: { metadata: ProjectMetadata; content: any }
</script>

<h1>{data.metadata.title}</h1>
<p><strong>{data.metadata.type}</strong> | {data.metadata.time}</p>
<p>{data.metadata.description}</p>
<hr class="mt-8 mb-10"/>
<article>
	<svelte:component this={data.content} />
</article>
