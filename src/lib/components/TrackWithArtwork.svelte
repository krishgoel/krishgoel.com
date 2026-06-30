<script lang="ts">
	export let imageUrl: string | null = null
	export let imageAlt: string
	export let artworkSizeClass: string = 'h-[3.375rem] w-[3.375rem]'
</script>

<div class="track-with-artwork" class:no-artwork={!imageUrl}>
	{#if imageUrl}
		<img
			src={imageUrl}
			alt={imageAlt}
			class="track-artwork shrink-0 rounded object-cover {artworkSizeClass}"
		/>
	{/if}
	<div class="track-copy min-w-0">
		<slot />
	</div>
</div>

<style>
	.track-with-artwork {
		display: grid;
		grid-template-columns: auto 1fr;
		column-gap: 0.75rem;
		align-items: start;
	}

	.track-artwork {
		grid-column: 1;
		grid-row: 1;
		align-self: start;
	}

	.track-copy {
		grid-column: 2;
		grid-row: 1;
		align-self: start;
	}

	.track-copy :global(h2),
	.track-copy :global(h3) {
		line-height: 1.25;
	}

	.no-artwork {
		grid-template-columns: 1fr;
	}

	.no-artwork .track-copy {
		grid-column: 1;
	}
</style>
