<script lang="ts">
	import type { ProjectAPIResponse } from '$lib/types/index.js'
	export let data: { projects: ProjectAPIResponse[] }

	import ProjectCard from '$lib/components/ProjectCard.svelte'
</script>

<div class="py-16">
	<div class="grid md:grid-cols-3 mb-6">
		<div>
			<h1 class="mr-4">Featured Projects</h1>
			<p>This is a detailed list of all the projects I've worked on so far, it includes my hackathon submissions, side tinkers, startup ideas, and non-profits.</p>
		</div>
	</div>
	<div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
		{#each Array(4) as _, j}
			<div class="hidden lg:block">
				<div class="space-y-4">
					{#each data.projects as project, i}
						{#if i % 4 == j}
							<ProjectCard {project} />
						{/if}
					{/each}
				</div>
			</div>
		{/each}
		{#each Array(2) as _, j}
			<div class="lg:hidden md:block hidden">
				<div class="space-y-4">
					{#each data.projects as project, i}
						{#if i % 2 == j}
							<ProjectCard {project} />
						{/if}
					{/each}
				</div>
			</div>
		{/each}
		{#each data.projects as project}
			<div class="md:hidden">
				<ProjectCard {project} />
			</div>
		{/each}
	</div>
</div>
