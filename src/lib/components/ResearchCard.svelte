<script lang="ts">
	import type { ResearchAPIResponse } from '$lib/types'
    export let research: ResearchAPIResponse
</script>

<div class="card rounded-lg shadow-lg">
    <div class="p-6">
        <h2 class="mb-0">{research.metadata.title}</h2>
        <p>{research.metadata.authors.join(', ').replace(/,([^,]*)$/, ' &$1')}</p>
        <p>{research.metadata.time}, Published in <i>{research.metadata.published_in}</i></p>
        <blockquote><p>{research.metadata.abstract.slice(0, 300)}{research.metadata.abstract.length > 147 ? '...' : ''}</p></blockquote>
        <p>{research.metadata.description}</p>
        <p class="pt-2"><a href="{research.metadata.url}" target="_blank" aria-label="Paper access">Access Paper</a></p>
    </div>
</div>