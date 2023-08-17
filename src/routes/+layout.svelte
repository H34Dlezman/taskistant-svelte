<script>
	import './styles.css';
</script>

<div class="app">
	<header>
		<h1>
			Taskistant
		</h1>
		<button id="trash-btn" on:click={()=>{
			localStorage.setItem("messages", "")
			location.reload()
			}}>🗑</button>
	</header>
	<main>
		<slot />
	</main>

	<footer>
	</footer>
</div>

<style>
	header {
		position: sticky;
		top: 0;
		width: 100%;
		background-color: white;
		box-shadow: 0px 0px 4px -2px #000000;
	}
	header h1 {
		width: 100%;
		text-align: center;
	}
	#trash-btn {
    font-size: xx-large;
    font-weight: 600;
    float: right;
    background: none;
    border: initial;
    position: absolute;
    right: 10px;
    top: 10px;
	}
	.app {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
		height: 100%
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}
</style>
