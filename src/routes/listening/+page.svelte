<script lang="ts">
	import TrackWithArtwork from '$lib/components/TrackWithArtwork.svelte'
	import type { LastFmRecentTracksResponse, LastFmTopTracksResponse } from '$lib/types/lastfm'
	import { getTrackImageUrl } from '$lib/utils/lastfm'

	export let data: {
		track: LastFmRecentTracksResponse
		topTracks: LastFmTopTracksResponse
	}

	console.log(data)
</script>

<h1>Top Tracks from this week</h1>
<p class="mb-4">Sourced daily from <a aria-label="My Last.fm" href="https://last.fm/user/KrishSkywalker" target="_blank" class="svelte-1fnyxa0">Last.FM ></a></p>

<div class="card rounded-lg py-6 md:px-12 px-6 mb-8">
	{#await data.track}
		<p>Loading my listening habits...</p>
		<h2>Loading...</h2>
		<p class="mb-0">Loading...</p>
	{:then trackData}
		{#if trackData.recenttracks?.track?.[0]?.hasOwnProperty('@attr')}
			<div class="flex items-baseline">
				<div class="music-animation mr-2 ml-1">
					<span class="bg-zinc-900" />
					<span class="bg-zinc-900" />
					<span class="bg-zinc-900" />
				</div>
				<p class="mb-2">Currently listening to</p>
			</div>
			<TrackWithArtwork
				imageUrl={getTrackImageUrl(trackData.recenttracks.track[0], 'extralarge')}
				imageAlt="{trackData.recenttracks.track[0].name} album art"
				artworkSizeClass="h-[3.45rem] w-[3.45rem]"
			>
				<h2 class="mt-0 mb-0">{trackData.recenttracks.track[0].name}</h2>
				<p class="mb-0">
					from <strong>{trackData.recenttracks.track[0].album['#text']}</strong> by
					<strong>{trackData.recenttracks.track[0].artist['#text']}</strong>
				</p>
			</TrackWithArtwork>
		{:else}
			<p class="mb-2">Last listened to</p>
			<TrackWithArtwork
				imageUrl={trackData.recenttracks?.track?.[0]
					? getTrackImageUrl(trackData.recenttracks.track[0], 'extralarge')
					: null}
				imageAlt="{trackData.recenttracks?.track?.[0]?.name ?? 'Track'} album art"
				artworkSizeClass="h-[3.45rem] w-[3.45rem]"
			>
				<h2 class="mt-0 mb-0">{trackData.recenttracks?.track?.[0]?.name ?? 'No track available'}</h2>
				<p class="mb-0">
					from <strong>{trackData.recenttracks?.track?.[0]?.album['#text'] ?? 'Unknown'}</strong> by
					<strong>{trackData.recenttracks?.track?.[0]?.artist['#text'] ?? 'Unknown'}</strong>
				</p>
			</TrackWithArtwork>
		{/if}
	{:catch error}
		<p>This section is supposed to display my recent listening habits</p>
		<h2>But</h2>
		<p class="mb-0">the API it relies on crashed. {error}</p>
	{/await}
</div>

<div class="card rounded-lg py-3 md:px-12 px-6 divide-y divide-gray-400">
	{#await data.topTracks}
		<p>Loading my listening habits...</p>
		<h2>Loading...</h2>
		<p class="mb-0">Loading...</p>
	{:then topTracksData}
		{#each topTracksData.toptracks.track as track}
			<div class="py-6">
				<TrackWithArtwork
					imageUrl={getTrackImageUrl(track, 'large')}
					imageAlt="{track.name} album art"
				>
					<h3 class="mb-0">{track.name}</h3>
					<p class="mb-0">by <strong>{track.artist.name}</strong> [{track.playcount} Plays]</p>
				</TrackWithArtwork>
			</div>
		{/each}
	{:catch error}
		<p>This section is supposed to display my recent listening habits</p>
		<h2>But</h2>
		<p class="mb-0">the API it relies on crashed. {error}</p>
	{/await}
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
