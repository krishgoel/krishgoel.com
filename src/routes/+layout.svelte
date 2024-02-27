<script>
	import '../app.css'
	import { page } from '$app/stores'
</script>

{#if $page.url.pathname === '/'}
	<section class="bg-[url('/images/banner.png')] bg-cover bg-no-repeat" style="background-position: 80% 50%;">
		<div class="width-lg grid md:grid-cols-2 sm:grid-cols-1 min-h-screen pb-8 pt-2 flex items-center bg-gradient-to-l from-zinc-900 md:from-transparent to-100% to-transparent">
			<div>
				<h3>Hi</h3>
				<h1 class="text-4xl">I'm Krish</h1>
				<p>A philosophy and business double-major at heart, currently pursuing every Indian dad's dream for their son - <s>MBA</s> BTech (Hons.) in Computer Science with AI & ML at <a href="https://jaipur.manipal.edu" target="_blank" aria-label="Manipal University Jaipur">Manipal University Jaipur</a>.</p>
				<p>I spent my summer as a research intern at <a href="https://www.icmr.gov.in/" target="_blank" aria-label="Indian Council of Medical Research">ICMR</a> under <a href="https://scholar.google.co.in/citations?user=EE9ha9MAAAAJ&hl=en" target="_blank" aria-label="Dr. Hapreet Singh's Google Scholar Profile">Dr. Hapreet Singh</a>, where I lead the development of a Clinical Trial Registry in accordance with the <a href="https://apps.who.int/iris/bitstream/handle/10665/274994/9789241514743-eng.pdf" target="_blank" aria-label="International Standards for Clinical Trial Registries">WHO Standardisation Guidelines</a> in Django.</p>
				<p>I am also the in-house DJ (read <i>President</i>) at <a href="https://www.randomizemuj.com/" target="_blank" aria-label="Randomize Website">Randomize(); - my college's CSE Club</a>. Looking at the bigger picture, I aim to recast the education sector.</p>
				<p>Welcome to <s>my website</s> the bent side of things (btw irrespective of the kringe, people <strong>USED</strong> to call me <span class="mono">KrishSkywalker</span> &macr;\(ツ)/&macr;). And <a href="https://twitter.com/krshgl" target="_blank" aria-label="Krish Goel on Twitter">I tweet sometimes</a>.</p>
			</div>
		</div>
	</section>
{/if}

<nav class="light py-4 shadow-lg sticky top-0 z-10">
	<div class="width-lg flex justify-between items-center whitespace-nowrap overflow-x-auto">
		{#if $page.url.pathname != '/'}
			<a aria-label="Home Page" href="/"><h2 class="mr-4 mt-0">Krish Goel</h2></a>
		{/if}
		<div class="whitespace-nowrap overflow-x-auto inline-block space-x-2">
			<p><a aria-label="Garden" href="/lexicon">Lexicon</a></p>
			<p><a aria-label="Projects" href="/projects">Projects</a></p>
			<p><a aria-label="Writing" href="/writing">Writing</a></p>
			<p><a aria-label="Contact" href="/#contact">Contact</a></p>
		</div>
	</div>
</nav>

<div class="bodyspace {($page.url.pathname.startsWith('/projects/') || $page.url.pathname.startsWith('/writing/') || $page.url.pathname === '/lexicon' || $page.url.pathname === '/thanks' || $page.url.pathname === '/listening') ? 'width-md py-16' : $page.url.pathname === '/' ? '' : 'width-lg'}">
	<slot />
</div>

<footer class="py-4 light">
	<div class="width-lg flex justify-between items-center">
		<p class="inline-block">&copy; Krish Goel</p>
		<div class="whitespace-nowrap overflow-x-auto inline-block space-x-2">
			<p class="inline-block"><a aria-label="Thanks" href="/thanks">Thanks</a></p>
		</div>
	</div>
</footer>

<style>
	nav h2, nav p, footer p {
		display: inline-block;
		margin-bottom: 0;
	}
</style>
