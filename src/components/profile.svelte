<script>
	import { writable } from "svelte/store";

	import Account from "@lib/auth";
	import CoNexus from "@lib/conexus";
	import { authenticated, referralCodes, wallet, web3LoggedIn } from "@stores/account";
	import { loading } from "@stores/conexus";
	import Modal from "@components/Modal.svelte";
	import { onMount } from "svelte";

	Account.me();
	Account.logged_in();

	onMount(async () => {
		Account.cookie();
	});

	let showModal;
	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();

	let isLogged;
	let user;

	authenticated.subscribe(value => {
		user = value.user;
		isLogged = value.loggedIn;
	});

	let walletAddress;

	wallet.subscribe(value => {
		walletAddress = value;
	});

	let signUp = false;

	$: if (isLogged) {
		Account.referraLCodes();
	}

	let showDeleteModal = writable(false);

	let selectedStory;

	function openModal(story) {
		selectedStory = story;
		showDeleteModal.set(true);
	}

	function DeleteStory(story_id) {
		CoNexus.delete(story_id);
		showModal.set(false);
	}

	function copyRefCode(event) {
		navigator.clipboard.writeText(event.target.id);
	}

	const passwordVisible = () =>
		(document.getElementById("password").type = "text");
	const passwordInvisible = () =>
		(document.getElementById("password").type = "password");

	function validate(event) {
		//test imitation
		const mandatoryCheckbox = document.getElementById("terms");
		const submitButton = document.querySelector(".submit-button");
		console.log(submitButton);
		if (mandatoryCheckbox.checked) {
			submitButton.disabled = false;
		} else {
			submitButton.disabled = true;
		}
	}

	const continueShapingStories = [
		"Escape",
		"Inception Ark",
		"Mascoteers",
		"North Pole Inc.",
		"GLMR Apes",
		"The Terminus Swarm",
	];
	function removeShapingStory() {
		let shapingStory = document.getElementById("continue-shaping");
		if (shapingStory.value != "")
			shapingStory.remove(shapingStory.selectedIndex);
		if (shapingStory.length === 1) shapingStory.value = "";
	}

	let isEditing = false;
	function changeUserData(event) {
		let editUsernameBtn = document.querySelector(".edit-username");
		let editPasswordBtn = document.querySelector(".edit-password");
		let firstNameInput = document.getElementById("first-name");
		let lastNameInput = document.getElementById("last-name");
		let passwordInput = document.getElementById("password");
		let passwordConfirmLabel = document.getElementById(
			"password-confirmation-label"
		);
		let passwordConfirmInput = document.getElementById("password-confirmation");
		let validationWarn = document.querySelector(".validation-check");
		if (event.target.className.match("username")) {
			if (!isEditing) {
				isEditing = true;
				editUsernameBtn.innerHTML = "Save";
				editPasswordBtn.style.display = "none";
				firstNameInput.disabled = false;
				firstNameInput.style.border = "0.2vw solid rgba(51, 226, 230, 0.9)";
				lastNameInput.disabled = false;
				lastNameInput.style.border = "0.2vw solid rgba(51, 226, 230, 0.9)";
			} else {
				isEditing = false;
				editUsernameBtn.innerHTML = "Change name";
				editPasswordBtn.style.display = "block";
				firstNameInput.disabled = true;
				firstNameInput.style.border = "0.05vw solid rgba(51, 226, 230, 0.5)";
				lastNameInput.disabled = true;
				lastNameInput.style.border = "0.05vw solid rgba(51, 226, 230, 0.5)";
			}
		} else if (event.target.className.match("password")) {
			if (!isEditing) {
				isEditing = true;
				editUsernameBtn.style.display = "none";
				editPasswordBtn.innerHTML = "Save";
				passwordInput.disabled = false;
				passwordInput.style.border = "0.2vw solid rgba(51, 226, 230, 0.75)";
				passwordConfirmInput.style.display = "block";
				passwordConfirmLabel.style.display = "block";
			} else {
				if (passwordInput.value != passwordConfirmInput.value) {
					validationWarn.style.display = "block";
					event.preventDefault();
				} else {
					isEditing = false;
					editUsernameBtn.style.display = "block";
					editPasswordBtn.innerHTML = "Change password";
					passwordInput.disabled = true;
					passwordInput.style.border = "0.05vw solid rgba(51, 226, 230, 0.5)";
					passwordConfirmInput.style.display = "none";
					passwordConfirmLabel.style.display = "none";
					validationWarn.style.display = "none";
				}
			}
		}
	}

	let walletConnected = false;
	

	function connectWallet() {
		Account.log_in();
		// if(walletConnected) {
		//   walletConnected = false;
		// } else {
		//   walletConnected = true;
		//   alert('Wallet connected.')
		//   walletAddress = '0xeb0a...60c1';
		// }
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<span
	class="profile-icon"
	role="button"
	tabindex="0"
	on:click={() => (showModal = true)}
/>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="profile-container"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => {
		dialog.close();
		signUp = false;
	}}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<div class="log-in">
			<button
				class="close-button"
				on:click|stopPropagation={() => {
					dialog.close();
					signUp = false;
				}}>Close</button
			>
			{#if isLogged}
				<button
					class="login-button"
					on:click={() => {
						Account.signout();
						signUp = false;
					}}>Log out</button
				>
			{:else if !isLogged}
				<button
					class="how-button"
					on:click={() =>
						window.open("https://degenerousdao.gitbook.io/wiki", "_blank")}
					>How to sign up?</button
				>
			{/if}
		</div>

		<hr />

		<!-- USER PROFILE -->

		{#if isLogged}
			{#if $web3LoggedIn}
				{#await CoNexus.available()}
					Loading...
				{:then available}
					<div class="story-games-container">
						<p class="story-games-number-label">
							You have used
							<span class="story-games-number"
								>{available.used} / {available.available} weekly</span
							>
							stories
						</p>

						{#if available.bonus > 0}
							<p class="story-games-number-label">
								You have <strong>{available.bonus} bonus</strong> lives
							</p>
						{/if}

						<form class="continue-shaping-container">
							<label class="continue-shaping-label" for="continue-shaping">
								Continue shaping:
							</label>
							{#each available.continuable as continuable}
								<div>
									<button
										class="continue-shaping-delete"
										on:click|preventDefault={() => openModal(continuable)}
										disabled={$loading}
									/>
									<div value="" id="continue-shaping">
										<p>
											{continuable.category} - {continuable.story_id.split(
												"-"
											)[0]}
										</p>
									</div>
									<button
										class="continue-shaping-play"
										on:click={() => CoNexus.continue(continuable)}
										disabled={$loading}
									/>
								</div>
							{/each}
						</form>
					</div>

					<!-- Delete Story Modal -->

					{#if selectedStory}
						<Modal bind:showModal={$showDeleteModal}>
							<h2 slot="header">Are you sure you want to delete this story?</h2>
							<p>
								This action is irreversible. You will lose all progress on this
								story.
							</p>
							<button
								class="modal-delete"
								on:click={() => DeleteStory(selectedStory.story_id)}
								>Delete story: {selectedStory.category}</button
							>
						</Modal>
					{/if}
				{/await}
			{/if}

			<hr />

			<div class="user-profile-info">
				<div class="user-properties">
					<label for="mail" class="user-prop">Email</label>
					<input
						class="user-prop-value"
						id="mail"
						type="email"
						value={user.email}
						disabled
					/>
					<label for="password" class="user-prop">Password</label>
					<div class="password-container">
						<input
							class="user-prop-value"
							id="password"
							type="password"
							value={user.password}
							disabled
						/>
						<button
							class="password-visibility-button"
							on:mousedown={passwordVisible}
							on:mouseup={passwordInvisible}
							on:touchstart={passwordVisible}
							on:touchend={passwordInvisible}
						/>
					</div>
					<label
						for="first-name"
						class="user-prop"
						id="password-confirmation-label">Confirm password</label
					>
					<input
						class="user-prop-value"
						id="password-confirmation"
						type="password"
					/>
					<label for="first-name" class="user-prop">First name</label>
					<input
						class="user-prop-value"
						id="first-name"
						type="text"
						value={user.first_name}
						disabled
					/>
					<label for="last-name" class="user-prop">Last name</label>
					<input
						class="user-prop-value"
						id="last-name"
						type="text"
						value={user.last_name}
						disabled
					/>
				</div>
			</div>

			<p class="validation-check">Passwords do not match!</p>

			<div class="edit-buttons">
				<button class="edit-username" on:click={changeUserData}>
					Change name
				</button>
				<button class="edit-password" on:click={changeUserData}>
					Change password
				</button>
			</div>

			<hr />

			<div class="wallet-connect">
				<p class="user-prop">Web3 account:</p>

				<button class="wallet-button" on:click={connectWallet}>
					{#if !$web3LoggedIn}
						Connect Wallet
					{:else if $web3LoggedIn}
						{walletAddress}
					{/if}
				</button>
			</div>

			<hr />

			<div class="google-connect">
				<p class="user-prop">Web2 account:</p>

				<button class="google-button"> Connect Google </button>
			</div>

			<hr />

			<p class="refferal-codes-legend">Your referral codes</p>
			<div class="refferal-codes">
				{#each $referralCodes as code}
					<div class="ref-code-container">
						<input
							class="ref-code"
							id={code.code}
							class:used={code.is_used}
							class:not-used={!code.is_used}
							value={code.code}
							disabled
						/>
						<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
						<button id={code.code} class="copy-button" on:click={copyRefCode} />
					</div>
				{/each}
			</div>

			<!-- LOGIN WINDOW -->
		{:else if !isLogged && !signUp}
			<form class="login-form">
				<label class="input-label" for="user-mail">Email</label>
				<input
					class="user-input"
					type="email"
					id="user-mail"
					placeholder="Enter your email"
					required
				/>
				<label class="input-label" for="user-password">Password</label>
				<input
					class="user-input"
					type="password"
					id="user-password"
					placeholder="Enter your password"
					minlength="8"
					required
				/>
				<p class="validation-check">Invalid credentials!</p>
				<!-- <button class="submit-button" type="submit" on:click={() => isLogged = true}>Log-in</button> -->
				<button
					class="submit-button"
					type="submit"
					on:click={() =>
						Account.signin({
							email: document.getElementById("user-mail").value,
							password: document.getElementById("user-password").value,
						})}>Log-in</button
				>
				<button
					class="submit-button google-login"
					type="submit"
					on:click={() => (isLogged = true)}>Log-in with Google</button
				>
			</form>

			<hr />

			<form class="ref-code-form">
				<input
					class="user-input"
					type="text"
					id="refferal-code"
					placeholder="Enter your refferal code"
					minlength="16"
					maxlength="16"
					required
				/>
				<p class="validation-check">This code is not valid!</p>
				<button
					class="submit-button"
					type="submit"
					on:click={() => (signUp = true)}>Sign-up</button
				>
				<button
					class="submit-button google-signup"
					type="submit"
					on:click={() => (signUp = true)}>Sign-up with Google</button
				>
			</form>

			<!-- SIGNUP WINDOW -->
		{:else if !isLogged && signUp}
			<form class="signup-form">
				<label class="input-label" for="new-user-mail">Mail</label>
				<input
					class="user-input"
					type="email"
					id="new-user-mail"
					placeholder="Your email"
					required
				/>
				<label class="input-label" for="new-user-password">Password</label>
				<input
					class="user-input"
					type="password"
					id="new-user-password"
					placeholder="Your password"
					minlength="8"
					required
				/>
				<input
					class="user-input"
					type="password"
					id="confirm-new-user-password"
					placeholder="Confirm password"
					required
				/>
				<label class="input-label" for="user-first-name">First name</label>
				<input
					class="user-input"
					type="text"
					id="user-first-name"
					placeholder="Your First name"
				/>
				<label class="input-label" for="user-last-name">Last name</label>
				<input
					class="user-input"
					type="text"
					id="user-last-name"
					placeholder="Your Last name"
				/>
				<div class="agreements-container">
					<div class="agreement">
						<input type="checkbox" id="terms" on:click={validate} />
						<label for="terms" class="terms">
							* I have read and agree to the <a
								href="https://docs.google.com/document/d/1fEemq6HVM_h8ZTbc_Fl_k3RvlPdjYd70TI1iloT5gXA/edit?usp=sharing"
								target="_blank"
							>
								Terms of Service</a
							>.
						</label>
					</div>
					<div class="agreement">
						<input type="checkbox" id="newsletter" />
						<label for="newsletter" class="newsletter">
							I'd like to receive news 1-4 times a month.
						</label>
					</div>
				</div>
				<p class="validation-check">Fill in all required fields!</p>
				<button
					class="submit-button"
					on:click={() => {
						isLogged = true;
					}}
					disabled>Create account</button
				>
			</form>
		{/if}
	</div>
</dialog>

<style>
	button {
		padding: 1vw 2vw;
		border: 0.05vw solid rgba(51, 226, 230, 0.75);
		border-radius: 2vw;
		font-size: 2vw;
		line-height: 3vw;
		color: rgba(51, 226, 230, 0.75);
		background-color: rgba(51, 226, 230, 0.1);
		filter: drop-shadow(0 0 0.1vw rgba(51, 226, 230, 0.4));
	}

	button:hover,
	button:active {
		color: rgba(51, 226, 230, 1);
		background-color: rgba(51, 226, 230, 0.5);
		filter: drop-shadow(0 0 1vw rgba(51, 226, 230, 0.4));
	}

	button:disabled,
	button:disabled:hover,
	button:disabled:active {
		opacity: 0.5;
		color: rgba(51, 226, 230, 0.75);
		background-color: rgba(51, 226, 230, 0.1);
		filter: drop-shadow(0 0 0.1vw rgba(51, 226, 230, 0.4));
		cursor: not-allowed;
	}

	hr {
		margin: 2vw 0;
		border: 0.1vw solid rgba(51, 226, 230, 0.5);
	}

	.validation-check {
		display: none;
		text-align: center;
		font-size: 1.5vw;
		margin-bottom: 2vw;
		margin-top: 1vw;
		color: rgba(255, 50, 50, 0.8);
	}

	/* Reset button styling for icons */

	.password-visibility-button,
	.copy-button,
	.continue-shaping-delete,
	.continue-shaping-play {
		padding: 0;
		margin: 0;
		border: none;
		border-radius: 0;
		background-color: rgba(0, 0, 0, 0);
		opacity: 0.75;
	}

	.password-visibility-button:hover,
	.password-visibility-button:active,
	.copy-button:hover,
	.copy-button:active,
	.continue-shaping-delete:hover,
	.continue-shaping-delete:active,
	.continue-shaping-play:hover,
	.continue-shaping-play:active {
		filter: none;
		background-color: rgba(0, 0, 0, 0);
		color: rgba(0, 0, 0, 0);
		opacity: 1;
	}

	/* Profile dialog window */

	.profile-container {
		padding: 1.5vw;
		width: 65vw;
		height: 90%;
		background-color: rgba(1, 0, 32, 0.75);
		border: 0.05vw solid rgba(51, 226, 230, 0.75);
		border-radius: 2.5vw;
		-webkit-backdrop-filter: blur(1vw);
		backdrop-filter: blur(1vw);
		overflow-x: hidden;
	}

	.profile-container::-webkit-scrollbar {
		width: 0.5vw;
	}

	.profile-container::-webkit-scrollbar-track {
		background-color: rgba(0, 0, 0, 0);
	}

	.profile-container::-webkit-scrollbar-thumb {
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0),
			rgba(51, 226, 230, 0.5),
			rgba(0, 0, 0, 0)
		);
		border-radius: 0.5vw;
	}

	.profile-container::backdrop {
		background: rgba(0, 0, 0, 0.75);
	}

	.profile-container[open] {
		animation: zoom 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.profile-container[open]::backdrop {
		animation: fade 0.25s ease-out;
	}

	.profile-container > div {
		display: flex;
		flex-flow: column nowrap;
	}

	/* User logged out */

	.login-form,
	.signup-form,
	.ref-code-form {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: space-between;
	}

	.input-label {
		font-size: 1.5vw;
		line-height: 1.5vw;
		margin-bottom: 0.5vw;
		color: rgba(255, 255, 255, 0.5);
	}

	.user-input {
		width: 30vw;
		font-size: 2vw;
		line-height: 2.5vw;
		padding: 2vw;
		margin-bottom: 2vw;
		color: rgba(51, 226, 230, 0.75);
		border: 0.1vw solid rgba(51, 226, 230, 0.5);
		border-radius: 2.5vw;
		background-color: rgba(1, 0, 32, 0.75);
		outline: none;
	}

	.submit-button {
		width: 30vw;
		padding: 1vw;
		color: rgba(51, 226, 230, 0.75);
		background-color: rgba(51, 226, 230, 0.1);
		cursor: pointer;
	}

	.google-login,
	.google-signup {
		margin-top: 2vw;
	}

	.user-profile-info,
	.log-in,
	.wallet-connect,
	.google-connect {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: center;
	}

	.log-in {
		justify-content: space-between;
	}

	.agreements-container {
		display: flex;
		flex-flow: column nowrap;
		width: 85%;
		padding-bottom: 2vw;
	}

	.agreement {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: baseline;
		padding: 1vw;
	}

	#terms,
	#newsletter {
		-webkit-transform: scale(1.5);
		transform: scale(1.5);
		flex: 1;
		accent-color: rgba(51, 226, 230, 0.75);
	}

	.terms,
	.newsletter {
		font-size: 1.75vw;
		line-height: 3vw;
		padding-left: 1vw;
		flex: 10;
		color: rgba(255, 255, 255, 0.65);
	}

	.terms > a {
		color: rgba(255, 255, 255, 0.75);
	}

	/* User logged in */

	.user-properties {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
	}

	.user-prop {
		font-size: 2vw;
		line-height: 4vw;
		color: rgba(255, 255, 255, 0.5);
	}

	.user-prop-value {
		text-align: center;
		width: 45vw;
		height: 5vw;
		font-size: 2vw;
		line-height: 4vw;
		border: 0.05vw solid rgba(51, 226, 230, 0.5);
		border-radius: 2.5vw;
		outline: none;
		color: rgba(255, 255, 255, 0.7);
		background-color: rgba(51, 226, 230, 0.05);
		margin-bottom: 1vw;
	}

	.user-prop-value:disabled {
		opacity: 1; /* for iOS */
	}

	.password-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 4vw;
		margin-bottom: 1vw;
	}

	#password {
		margin-bottom: 0;
	}

	#password-confirmation-label,
	#password-confirmation {
		display: none;
	}

	#password-confirmation {
		border: 0.2vw solid rgba(51, 226, 230, 0.75);
	}

	.password-visibility-button {
		margin-left: 1vw;
		width: 3vw;
		height: 3vw;
		background-image: url("/icons/invisibleicon.png");
		background-size: contain;
		background-repeat: no-repeat;
	}

	.password-visibility-button:active {
		background-image: url("/icons/visibleicon.png");
	}

	.edit-buttons {
		display: flex;
		justify-content: center;
		margin-inline: auto;
	}

	.edit-username,
	.edit-password {
		margin: 2vw 1vw;
		font-size: 1.75vw;
		line-height: 2vw;
	}

	/* Continue shaping */

	.story-games-container {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
	}

	.story-games-number-label {
		margin: 1vw 0 2vw 0;
		color: rgba(51, 226, 230, 0.65);
		font-size: 1.5vw;
	}

	.story-games-number {
		color: rgba(51, 226, 230, 0.9);
		font-size: 1.6vw;
	}

	.continue-shaping-container {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
	}

	.continue-shaping-label {
		color: rgba(51, 226, 230, 0.75);
		font-size: 2vw;
	}

	.continue-shaping-container > div {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		margin-top: 1vw;
	}

	#continue-shaping {
		text-align: center;
		padding: 1vw 1vw;
		font-size: 2vw;
		line-height: 3vw;
		color: rgba(1, 0, 32, 0.9);
		outline: none;
		border: 0.1vw solid rgba(51, 226, 230, 0.5);
		border-radius: 2vw;
		background-color: rgba(51, 226, 230, 0.5);
		cursor: pointer;
		width: 40vw;
	}

	#continue-shaping p {
		text-align: center;
		cursor: pointer;
	}

	.continue-shaping-delete,
	.continue-shaping-play {
		width: 5vw;
		height: 5vw;
		margin: 0 1vw;
		background-size: contain;
		background-repeat: no-repeat;
	}

	.continue-shaping-delete {
		background-image: url("/icons/delete.png");
		margin-right: 0.75vw;
	}

	.continue-shaping-play {
		background-image: url("/icons/play.png");
	}

	/* Referral codes container */

	.refferal-codes-legend {
		text-align: center;
		font-size: 2vw;
		line-height: 4vw;
		color: rgba(255, 255, 255, 0.7);
	}

	.refferal-codes {
		width: 90%;
		padding: 2vw;
		margin-inline: auto;
		display: grid;
		grid-template-columns: 50% 50%;
		justify-content: center;
		gap: 1vw;
		border: 0.1vw solid rgba(51, 226, 230, 0.5);
		border-radius: 2.5vw;
		background-color: rgba(51, 226, 230, 0.1);
	}

	.ref-code-container {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
		background-color: rgba(0, 0, 0, 0.1);
		border: 0.05vw solid rgba(51, 226, 230, 0.25);
		border-radius: 1.5vw;
		padding: 0.5vw 1vw;
	}

	.ref-code {
		text-align: ridht;
		font-size: 1.8vw;
		line-height: 4vw;
		color: rgba(255, 255, 255, 0.5);
		border: none;
		outline: none;
		background-color: rgba(0, 0, 0, 0);
	}

	.ref-code:disabled {
		opacity: 1; /* for iOS */
	}

	.copy-button {
		width: 2vw;
		height: 2vw;
		background-image: url("/icons/copyicon.png");
		background-size: contain;
		background-repeat: no-repeat;
	}

	.copy-button:active {
		background-image: url("/icons/checkmark.png");
	}

	.used {
		color: rgba(255, 255, 255, 0.35);
		-webkit-text-stroke: 0.05vw rgba(255, 0, 0, 0.35);
	}

	.not-used {
		color: rgba(255, 255, 255, 0.75);
		filter: drop-shadow(0 0 0.1vw rgba(51, 226, 230, 0.9));
	}

	/* Profile icon */

	.profile-icon {
		position: absolute;
		top: 2vw;
		right: 2vw;
		height: 7vw;
		width: 7vw;
		cursor: pointer;
		background-image: url("/icons/profileIcon.avif");
		background-size: contain;
		opacity: 0.4;
		z-index: 1;
	}

	.profile-icon:hover,
	.profile-icon:active {
		filter: drop-shadow(0 0 1vw rgba(51, 226, 230, 0.5));
		opacity: 0.75;
	}

	@media only screen and (max-width: 600px) {
		hr {
			margin: 2em 0;
		}

		button {
			font-size: 1.4em;
			line-height: 1.4em;
			padding: 0.25em 1em;
		}

		.validation-check {
			font-size: 0.9em;
			margin: 0.5em 0;
		}

		.profile-container {
			padding: 1em;
			width: 85vw;
			height: 65%;
			border-radius: 1em;
			overflow-y: scroll;
		}

		.input-label {
			font-size: 0.9em;
			line-height: 0.9em;
			padding-bottom: 0.5em;
		}

		.user-input {
			width: 80vw;
			font-size: 1.4em;
			line-height: 1.6em;
			margin-bottom: 1em;
		}

		.agreements-container {
			width: 95%;
			padding-bottom: 1em;
		}

		.terms,
		.newsletter {
			font-size: 1em;
			line-height: 1.5em;
			padding-left: 1em;
		}

		.submit-button {
			width: 50vw;
		}

		.google-login,
		.google-signup {
			margin-top: 1em;
			width: 75vw;
		}

		.story-games-number-label {
			margin: 0.5em 0 1em 0;
			font-size: 0.9em;
		}

		.story-games-number {
			font-size: 1em;
		}

		.continue-shaping-label {
			font-size: 1em;
		}

		.continue-shaping-container > div {
			margin-top: 0.5em;
		}

		#continue-shaping {
			font-size: 1.1em;
			line-height: 1.1em;
			padding: 0.5em 1em;
			margin: 0 0.5em;
		}

		.continue-shaping-delete,
		.continue-shaping-play {
			width: 1.5em;
			height: 1.5em;
		}

		.user-prop,
		.user-prop-value,
		.refferal-codes-legend {
			font-size: 1em;
			line-height: 2.5em;
		}

		.user-prop-value {
			width: 70vw;
			height: 2.5em;
			margin-bottom: 0.5em;
		}

		.password-container {
			margin-left: 1.75em;
			margin-bottom: 0.5em;
		}

		.password-visibility-button {
			width: 1em;
			height: 1em;
			margin-left: 0.25em;
		}

		.edit-username,
		.edit-password {
			margin: 1em 0.5em;
			font-size: 1em;
			line-height: 2em;
		}

		.refferal-codes {
			grid-template-columns: 100%;
			gap: 0.5em;
			padding: 0.5em;
			width: 95%;
		}

		.ref-code-container {
			padding: 0 1em;
			border-radius: 0.5em;
		}

		.ref-code {
			font-size: 1.2em;
			line-height: 3em;
		}

		.copy-button {
			width: 1em;
			height: 1em;
		}

		.profile-icon {
			width: 3em;
			height: 3em;
			top: 1em;
			right: 0.5em;
		}
	}

	@keyframes zoom {
		from {
			transform: scale(1.5);
		}
		to {
			transform: scale(1);
		}
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
