<script lang="ts">
	import type { PostAPIResponse } from '$lib/types'
	export let data: { posts: PostAPIResponse[] }

	import BlogCard from '$lib/components/BlogCard.svelte'
</script>

<div class="py-16">
	<div class="grid md:grid-cols-2 mb-6">
		<div>
			<h1 class="mr-4 inline">My Blog</h1>
			<p>As opposed to all the online productivity gurus telling me to be consistent to "create value", I donot think that I will be updating this space very often (as you can proabably tell by the number of posts here), or at least until I find something that is too cool/important to not be shared.</p>
			<p>These would mostly be things and ideas that opened up new avenues to thinking for me, and I'll be publishing them in the hopes of recreating the same magic for anyone who reads them.</p>
			<p>Some of my informally published thoughts can be seen on <a aria-label="Twitter @krshgl" href=https://twitter.com/krshgl target=_blank>my Twitter</a>, and design boards can be found on <a aria-label="Instagram Guides @krshgl" href=https://instagram.com/krshgl/guides target=_blank>my Instagram Guides</a>.</p>
		</div>
	</div>
	<div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
		{#each Array(4) as _, j}
			<div class="hidden lg:block">
				<div class="space-y-4">
					{#each data.posts as post, i}
						{#if i % 4 == j}
							<BlogCard {post} />
						{/if}
					{/each}
				</div>
			</div>
		{/each}
		{#each Array(2) as _, j}
			<div class="lg:hidden md:block hidden">
				<div class="space-y-4">
					{#each data.posts as post, i}
						{#if i % 2 == j}
							<BlogCard {post} />
						{/if}
					{/each}
				</div>
			</div>
		{/each}
		{#each data.posts as post}
			<div class="md:hidden">
				<BlogCard {post} />
			</div>
		{/each}
	</div>
</div>
