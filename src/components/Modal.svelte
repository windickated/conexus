<script>
	export let showModal; // boolean

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) {
		dialog.showModal();
	}

	const closeDialog = () => {
		showModal = false;
		dialog.close();
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<div class="modal-overlay" style:display={showModal ? "flex" : "none"}>
	<dialog bind:this={dialog} on:close={closeDialog} on:click|self={closeDialog}>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div on:click|stopPropagation>
			<!-- svelte-ignore a11y-autofocus -->
			<button autofocus on:click={closeDialog}>close</button>

			<slot name="header" />
			<hr />
			<slot />
		</div>
	</dialog>
</div>

<style>
	hr {
		margin: 2vw 0;
		border: 0.1vw solid rgba(51, 226, 230, 0.5);
	}
	
	.modal-overlay {
		position: fixed;
		inset: 0;
		z-index: auto;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.3);
		overflow: hidden; /* Prevents scrolling within the modal */
	}

	dialog {
		max-width: 32em;
		width: 90%;
		margin: auto;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: inherit;
    background-color: rgba(1, 0, 32, 0.75);
    border: 0.05vw solid rgba(51, 226, 230, 0.75);
    border-radius: 2.5vw;
    -webkit-backdrop-filter: blur(1vw);
    backdrop-filter: blur(1vw);
	}

	dialog > div {
		padding: 1em;
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes zoom {
		from {
			transform: scale(1.5);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	button {
		display: none;
	}
</style>
