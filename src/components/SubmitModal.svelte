<script>
	import { closeModal } from "svelte-modals";
	export let isOpen;
	import { program_source } from "../state/program_source.js";

	//
	export let username = "anon";
</script>

{#if isOpen}
	<div class="modal">
		<button class="close" on:click={closeModal}>close</button>
		<div class="contents">
			<h2>Submit as user: {username} ?</h2>
			<section class="preview">
				<textarea id="" cols="30" rows="10" readonly
					>{$program_source}</textarea
				>
				<canvas />
			</section>
			<button class="confirm">Confirm</button>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: min-content;
		margin: 0 auto;

		/* allow click-through to backdrop */
		pointer-events: none;
	}

	.preview {
		display: flex;
		flex-direction: row;
	}

	.close {
		align-self: flex-end;
	}

	.confirm {
		width: 15%;
		align-self: center;
	}

	.contents {
		min-width: 240px;
		border-radius: 6px;
		padding: 16px;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		pointer-events: auto;
	}

	.contents > * {
		margin: 0.5rem;
	}

	h2 {
		text-align: center;
	}
</style>
