<script lang="ts">
    import type { ProjectAPIResponse } from '$lib/types'
    export let project: ProjectAPIResponse
</script>

<div class="card rounded-lg shadow-lg">
    {#if project.metadata.image}
        <img src={project.metadata.image} alt="{project.metadata.title}'s cover image" class="w-full rounded-2xl p-3" />
    {/if}
    <div class="p-6 pt-2">
        <h2 class="{!project.metadata.image ? 'pt-4' : ''} mb-0">{project.metadata.title}</h2>
        <p class="font-bold">{project.metadata.type}</p>
        <p>{project.metadata.time}</p>
        <p>{project.metadata.description}</p>
        {#each project.metadata.links as link}
            <p class="inline-block mr-2 mb-1"><a href={link.url} target={link.url.startsWith("/") ? "_self" : "_blank"} aria-label="{project.metadata.title} {link.text}">{link.text}</a></p>
        {/each}
    </div>
</div>