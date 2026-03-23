<script lang="ts">
	import type { ResearchAPIResponse } from '$lib/types'

	const renderDescription = (description: string): string =>
		description.replace(
			/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
			'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
		)

	export let research: ResearchAPIResponse
</script>

<div class="card rounded-lg shadow-lg">
	<div class="p-6">
		<h2 class="mb-0">{research.metadata.title}</h2>
		<p>{research.metadata.authors.join(', ').replace(/,([^,]*)$/, ' &$1')}</p>
		<p>{research.metadata.time}, Published in <i>{research.metadata.published_in}</i></p>
		<blockquote>
			<p>{research.metadata.abstract.slice(0, 300)}{research.metadata.abstract.length > 147 ? '...' : ''}</p>
		</blockquote>
		<p>{@html renderDescription(research.metadata.description)}</p>
		<p class="pt-2"><a href="{research.metadata.url}" target="_blank" aria-label="Paper access">Access Paper</a></p>
	</div>
</div>