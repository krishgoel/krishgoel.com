<script lang="ts">
    import type { ProjectAPIResponse } from '$lib/types'
    export let project: ProjectAPIResponse

    let date = new Date(project.metadata.date)
	let month = date.toLocaleString('default', { month: 'long' })
	let year = date.getFullYear()
</script>

<div class="card rounded-lg shadow-lg">
    {#if project.metadata.image}
        <img src={project.metadata.image} alt="{project.metadata.title}'s cover image" class="w-full rounded-2xl p-3" />
    {/if}
    <div class="p-6 pt-2">
        <h2 class="{!project.metadata.image ? 'pt-6' : ''} mb-0">{project.metadata.title}</h2>
        <p class="font-bold">{project.metadata.type}</p>
        <p>{month} {year}</p>
        <p>{project.metadata.description}</p>
        {#each project.metadata.links as link}
            <p class="inline-block mr-2 mb-1"><a href={link.url} target="_blank" aria-label="{project.metadata.title} {link.text}">{link.text}</a></p>
        {/each}
    </div>
</div>