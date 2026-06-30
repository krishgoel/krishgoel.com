<script lang="ts">
	export let imageUrl: string | null = null
	export let imageAlt: string
	export let artworkSizeClass: string = 'h-[3.375rem] w-[3.375rem]'
</script>

<div class="flex items-start gap-3">
	{#if imageUrl}
		<img
			src={imageUrl}
			alt={imageAlt}
			class="track-artwork shrink-0 rounded object-cover {artworkSizeClass}"
		/>
	{/if}
	<div class="min-w-0">
		<slot />
	</div>
</div>
