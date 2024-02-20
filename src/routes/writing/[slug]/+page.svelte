<script lang="ts">
	export let data
</script>

<article>
	<p>{JSON.stringify(data.metadata)}</p>
	<svelte:component this={data.content} />
</article>
