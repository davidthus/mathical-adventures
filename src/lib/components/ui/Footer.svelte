<script>
	import { modal } from '$lib/stores/modal';
	import SignedOut from '../SignedOut.svelte';
</script>

<footer>
	<h1>Mathical Adventures</h1>
	<p>A relaxing place for kids to read and learn math</p>

	<a href="/dashboard">Dashboard</a>
	<SignedOut>
		<button on:click={() => modal.set('default')}>Login</button>
	</SignedOut>
</footer>
