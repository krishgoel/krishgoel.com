<script lang="ts">
	import type { ResearchAPIResponse } from '$lib/types'
    export let research: ResearchAPIResponse

    let date = new Date(research.metadata.date)
    let month = date.toLocaleString('default', { month: 'long' })
    let year = date.getFullYear()
</script>

<div class="card rounded-lg shadow-lg">
    <div class="p-6 pt-2">
        <h2 class="mb-0">{research.metadata.title}</h2>
        <p>{month} {year} | {research.metadata.authors}</p>
        <p>{research.metadata.description}</p>
        <p><a href="{research.metadata.url}" aria-label="Paper access">Access Paper</a></p>
    </div>
</div>