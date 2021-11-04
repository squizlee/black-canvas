<script>
import { onMount } from "svelte";
let links = [
	{
		id: "home",
		icon: "/icons/home.svg",
		alt: "Pixel home icon",
		href: "/",
		text: "HOME"
	},
	{
		id: "world",
		icon: "/icons/globe.svg",
		alt: "globe icon",
		href: "/world",
		text: "WORLD"
	},
	{
		id: "lab",
		icon: "/icons/lab.svg",
		alt: "Lab icon",
		href: "/lab",
		text: "LAB"
	},
	{
		id: "about",
		icon: "/icons/question.svg",
		alt: "About icon",
		href: "/about",
		text: "ABOUT"
	},
];
	onMount(() => {
		let currentAddress = window.location.pathname;
		links = links.filter((element) => element.href !== currentAddress);	
	});
</script>

<section id="footer">
	{#each links as link}
		<div class="link">
			<img src={link.icon} alt="{link.alt}">
			<a href={link.href} class="prose-txt">
				<p>{link.text}</p>
			</a>
		</div>
	{/each}
</section>

<style>
	#footer {
		background-color: #e7e7e7;
		display: flex;
		justify-content: center;
		position: absolute;
		bottom: 0;
		width: 100%;
		border-radius: 2px;
		padding: 0.25rem;
	}
	
	#footer > * {
		margin: 0 2rem;
	}
	
	.link {
		padding: 0.8rem;
		aspect-ratio: 1;
		background: rgba(227, 48, 220, 0.08);
	}
	
	.link > img{
		aspect-ratio: 1;
		width: 3rem;
		display: block;
		margin: 0 auto;
	}
	
	.link > a,p {
		text-align: center;
		margin: 0;
	}
</style>