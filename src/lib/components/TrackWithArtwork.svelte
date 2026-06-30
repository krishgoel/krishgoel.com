<script lang="ts">
	export let imageUrl: string | null = null
	export let imageAlt: string
	export let artworkSizeClass: string = 'h-[3.375rem] w-[3.375rem]'
	export let artworkInset: string = '3.375rem'
</script>

<div
	class="track-with-artwork"
	class:has-artwork={Boolean(imageUrl)}
	style:--track-artwork-inset={artworkInset}
>
	<div class="flex items-start gap-3">
		{#if imageUrl}
			<img
				src={imageUrl}
				alt={imageAlt}
				class="track-artwork shrink-0 self-start rounded object-cover {artworkSizeClass}"
			/>
		{/if}
		<div class="track-title min-w-0 flex-1 leading-none">
			<slot name="title" />
		</div>
	</div>
	<div class="track-details min-w-0">
		<slot name="details" />
	</div>
</div>

<style>
	.track-details {
		margin-top: 0;
	}

	.has-artwork .track-details {
		padding-left: calc(var(--track-artwork-inset) + 0.75rem);
	}
</style>
