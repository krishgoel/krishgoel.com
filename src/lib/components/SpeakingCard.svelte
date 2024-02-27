<script lang="ts">
	import type { SpeakingAPIResponse } from '$lib/types'
    export let speaking: SpeakingAPIResponse

    let date = new Date(speaking.metadata.date)
    let month = date.toLocaleString('default', { month: 'long' })
    let year = date.getFullYear()
</script>

<div class="card rounded-lg shadow-lg">
    {#if speaking.metadata.image}
        <img src={speaking.metadata.image} alt="{speaking.metadata.title}'s cover image" class="w-full rounded-2xl p-3" />
    {/if}
    <div class="p-6 pt-2">
        <h2 class="{!speaking.metadata.image ? 'pt-6' : ''} mb-0">{speaking.metadata.title}</h2>
        <p>{month} {year}</p>
        <p>{speaking.metadata.description}</p>
    </div>
</div>