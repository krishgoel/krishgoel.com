<script lang="ts">
	import type { ResearchAPIResponse } from '$lib/types'
    export let research: ResearchAPIResponse
</script>

<div class="card rounded-lg shadow-lg">
    <div class="p-6 pt-2">
        <h2 class="mb-0">{research.metadata.title}</h2>
        <p>{research.metadata.time} | {research.metadata.authors}</p>
        <p>{research.metadata.description}</p>
        <p><a href="{research.metadata.url}" aria-label="Paper access">Access Paper</a></p>
    </div>
</div>