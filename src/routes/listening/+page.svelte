<script lang="ts">
	import type { ListeningRecentTrack, ListeningTopTracksPayload } from '$lib/types'

	export let data: {
		recentTrack: ListeningRecentTrack | null
		topTracks: ListeningTopTracksPayload
	}
</script>

<h1>Top Tracks from {data.topTracks.periodLabel}</h1>
<p class="mb-4">
	Sourced from
	<a aria-label="My Last.fm" href="https://last.fm/user/KrishSkywalker" target="_blank" class="svelte-1fnyxa0"
		>Last.FM ></a
	>
</p>

<div class="card rounded-lg py-6 md:px-12 px-6 mb-8">
	{#if data.recentTrack}
		{#if data.recentTrack.isNowPlaying}
			<div class="flex items-baseline">
				<div class="music-animation mr-2 ml-1">
					<span class="bg-zinc-900" />
					<span class="bg-zinc-900" />
					<span class="bg-zinc-900" />
				</div>
				<p class="mb-2">Currently listening to</p>
			</div>
		{:else}
			<p class="mb-2">Last listened to</p>
		{/if}
		<h2 class="mt-0">{data.recentTrack.name}</h2>
		<p>
			from <strong>{data.recentTrack.album}</strong> by
			<strong>{data.recentTrack.artist}</strong>
		</p>
	{:else}
		<p class="mb-2">Recent listening</p>
		<h2 class="mt-0">No track available</h2>
		<p class="mb-0">Could not load the latest scrobble from Last.fm right now.</p>
	{/if}
</div>

<div class="card rounded-lg py-3 md:px-12 px-6 divide-y divide-gray-400">
	{#if data.topTracks.tracks.length > 0}
		{#each data.topTracks.tracks as track}
			<div class="py-6">
				<h3>{track.name}</h3>
				<p class="mb-0">
					by <strong>{track.artist.name}</strong> [{track.playcount} Plays]
				</p>
			</div>
		{/each}
	{:else}
		<div class="py-6">
			<p class="mb-0">No top tracks to show yet — check back after the next scrobbles sync.</p>
		</div>
	{/if}
</div>

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
