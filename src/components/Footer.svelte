<script>
	let links = [
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
		}
	];
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
		background-image: radial-gradient(circle at center, #e7e7e7 50%, var(--off-black));
		background-color: #e7e7e7;
		display: flex;
		justify-content: center;
		position: absolute;
		bottom: 0;
		width: 100%;
		border-radius: 8px;
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
		width: 5rem;
	}
	
	.link > a,p {
		text-align: center;
		margin: 0;
	}
</style>