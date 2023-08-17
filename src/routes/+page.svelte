<script>
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	async function sendPrompt(prompt, initial=false) {
		loading = true;
		const response = await fetch("/task-aisisstant", {
			method: "POST",
			body: JSON.stringify({ prompt, messages, initial }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const resp = await response.json();

		if (response.status != 201) {
			alert("server error: " + resp.message);
			loading = false;
			return;
		}

		console.log(response);
		messages = [...resp.messages];
		localStorage.setItem("messages", JSON.stringify(messages));
		loading = false;
		scrollToBottom()
	}

	function scrollToBottom() {
		document.querySelector("html").scroll({top: document.querySelector("html").scrollHeight, behaviour: "smooth"})
	}

	export var loading = false;
	export var messages = [];

	onMount(() => {
		var lsmsgs = browser ? localStorage.getItem("messages") : null;
		if (lsmsgs && lsmsgs != null && lsmsgs != "") {
			console.log("lsmsgs", lsmsgs)
			messages = JSON.parse(lsmsgs);
			setTimeout(() => {
				scrollToBottom()
			}, 200);
		} else {
			sendPrompt("Hi there", true);
		}
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<ul id="messages">
		{#each messages as message}
			<li class="chat-li chat-li-{message.role}">
				{message.content}
			</li>
		{/each}
	</ul>
	<input
		type="text"
		on:keydown={async (e) => {
			if (e.key === "Enter") {
				const input = e.currentTarget;
				const prompt = input.value;
				input.value = "";
				await sendPrompt(prompt);
			}
		}}
		contenteditable="true"
		id="prompt-input"
		placeholder="Set a Task or Ask for your Tasks"
	/>
	{#if loading}
		<div id="spinner-container">
			<div id="spinner" />
		</div>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
	#spinner-container {
		position: fixed;
		top: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #00000010;
	}
	#spinner {
		border: 16px solid #f3f3f3; /* Light grey */
		border-top: 16px solid #3498db; /* Blue */
		border-radius: 50%;
		width: 120px;
		height: 120px;
		animation: spin 2s linear infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	#prompt-input {
		height: 5rem;
		max-width: 100%;
		min-width: 20rem;
		text-align: center;
		position: fixed;
		bottom: 20px;
		box-shadow: 0px 0px 30px -12px #000000;
		border-radius: 8px;
		font-size: large;
		padding: 12px;
		background-color: white;
	}

	#messages {
		flex: 1;
		width: 100%;
		list-style-type: none;
		margin-bottom: 100px;
	}

	.chat-li {
		width: 70%;
		min-height: 5rem;
		box-shadow: 0px 0px 12px -7px rgb(0 0 0 / 75%);
		border-radius: 15px;
		margin: 15px 0;
		padding: 20px;
	}

	.chat-li-user {
		float: right;
		text-align: right;
	}

	.chat-li-assistant {
		float: left;
		text-align: left;
	}

	@media only screen and (max-width: 600px) {
		#prompt-input {
			height: 2rem;
			bottom: 5px;
			padding: 6px;
		}
		#messages {
			margin-bottom: 4rem;
		}
	}
</style>
