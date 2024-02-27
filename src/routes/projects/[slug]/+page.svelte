<script lang="ts">
	import type { ProjectMetadata } from '$lib/types/index.js'

	export let data: ProjectMetadata & { content: any }
</script>

<article>
	<svelte:component this={data.content} />
</article>
