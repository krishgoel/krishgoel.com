<script lang="ts">
	export let data: { track: any; topTracks: any }

	console.log(data)
</script>

<h1>Top Tracks from this week</h1>
<p class="mb-4">Sourced daily from <a aria-label="My Last.fm" href="https://last.fm/user/KrishSkywalker" target="_blank" class="svelte-1fnyxa0">Last.FM ></a></p>

<div class="card rounded-lg py-6 md:px-12 px-6 mb-8">
	{#await data.track}
		<p>Loading my listening habits...</p>
		<h2>Loading...</h2>
		<p class="mb-0">Loading...</p>
	{:then data}
		{#if data.recenttracks?.track && data.recenttracks.track[0]?.hasOwnProperty('@attr')}
			<div class="flex items-baseline">
				<div class="music-animation mr-2">
					<span class="bg-zinc-900" />
					<span class="bg-zinc-900" />
					<span class="bg-zinc-900" />
				</div>
				<p>Currently listening to</p>
			</div>
			<h2>{data.recenttracks.track[0].name}</h2>
			<p class="mb-0">from <strong>{data.recenttracks.track[0].album['#text']}</strong> by <strong>{data.recenttracks.track[0].artist['#text']}</strong></p>
		{:else}
			<p>Last listened to</p>
			<h2>{data.recenttracks?.track ? data.recenttracks.track[0].name : 'No track available'}</h2>
			<p class="mb-0">from <strong>{data.recenttracks?.track ? data.recenttracks.track[0].album['#text'] : 'Unknown'}</strong> by <strong>{data.recenttracks?.track ? data.recenttracks.track[0].artist['#text'] : 'Unknown'}</strong></p>
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
	{:then data}
	<!-- <p>{JSON.stringify(data)}</p> -->
		{#each data.toptracks.track as track}
			<div class="py-6">
				<h3>{track.name}</h3>
				<p class="mb-0">by <strong>{track.artist.name}</strong> [{track.playcount} Plays]</p>
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
