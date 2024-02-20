<script lang="ts">
	// Fix this
	export let data: { posts: any; projects: any; research: any; track: any; commit: any }
</script>

<p>{JSON.stringify(data)}</p>

<section class="py-16" id="contact">
	<div class="grid md:grid-cols-2 gap-6 flex items-center">
		<div class="light rounded-lg py-6 md:px-12 px-6 flex items-center">
			<div>
				{#await data.track}
					<p>Loading my listening habits...</p>
					<h2>Loading...</h2>
					<p>Loading...</p>
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
						<p>by <strong>{data.recenttracks.track[0].artist['#text']}</strong></p>
					{:else}
						<p>Last listened to</p>
						<h2>{data.recenttracks?.track ? data.recenttracks.track[0].name : 'No track available'}</h2>
						<p>by <strong>{data.recenttracks?.track ? data.recenttracks.track[0].artist['#text'] : 'Unknown'}</strong></p>
					{/if}
				{:catch error}
					<p>This section is supposed to display my recent listening habits</p>
					<h2>But</h2>
					<p>the API it relies on crashed</p>
				{/await}

				<p class="mb-0">Here's what <a href="/listening" aria-label="Listening">I've been listening to lately</a></p>
			</div>
		</div>
		<div>
			<h2>Reach Me</h2>
			<p>I can be found on most social media platforms by <code>@krshgl</code>.</p>
			<div class="inline">
				<p class="inline-block mb-1 mr-1"><a href="https://twitter.com/krshgl" target="_blank" aria-label="Krish Goel's Twitter">Twitter/X</a></p>
				<p class="inline-block mb-1 mr-1"><a href="mailto:krishgoel3@gmail.com" target="_blank" aria-label="Krish Goel's Email">Email</a></p>
				<p class="inline-block mb-1 mr-1"><a href="https://github.com/KrishGoel" target="_blank" aria-label="Krish Goel's Github">Github</a></p>
				<p class="inline-block mb-1 mr-1"><a href="https://open.spotify.com/user/39emqovi90p90iq1sfbczkan0?si=5a1dfcc062b44a32" target="_blank" aria-label="Krish Goel's Spotify">Spotify</a></p>
				<p class="inline-block mb-1 mr-1"><a href="https://www.instagram.com/krshgl/" target="_blank" aria-label="Krish Goel's Instagram">Instagram</a></p>
				<p class="inline-block mb-1"><a href="https://www.linkedin.com/in/krishgoel/" target="_blank" aria-label="Krish Goel's LinkedIn">LinkedIn</a></p>
			</div>
			{#await data.commit}
				<p>Loading latest commit information...</p>
			{:then data}
				<p class="mt-2 mb-0">
					My latest GitHub Commit:
					<a href={`https://github.com/${data.repo.name}/commit/${data.payload.commits.sha}`} aria-label="My latest commit" target="_blank">
						{data.payload.commits[0].message}
					</a>
					made to
					<a href={`https://github.com/${data.repo.name}`} aria-label="Repo with the latest commit" target="_blank">
						{data.repo.name}
					</a>
					at {data.created_at}
				</p>
			{:catch error}
				<p>Failed to retrieve the latest commit information from Github.</p>
			{/await}
		</div>
	</div>
</section>

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
