<script>
	let credits = [
		{
			author: "Nabilauzwa",
			href: "https://thenounproject.com/search/?q=question+mark&i=3368679",
			icon: "Lab"
		},
		{
			author: "James Kopina",
			href: "https://thenounproject.com/search/?q=question+mark&i=3368679",
			icon: "Question"
		},
		{
			author: "Ilaria Bernareggi",
			href: "https://thenounproject.com/search/?q=home&i=508962",
			icon: "Home"
		},
		{
			author: "zidney",
			href: "https://thenounproject.com/search/?q=globe&i=1427013",
			icon: "Globe"
			
		},
		{
			author: "The Icon Z, ID",
			href: "https://thenounproject.com/search/?q=person&i=3324299",
			icon: "person"
		}
	];
</script>

<h1>Credits</h1>

<h2>Icons</h2>

{#each credits as credit}
	<a href={credit.href}>
		<p>{credit.icon} by {credit.author} from Noun Project</p>
	</a>
{/each}