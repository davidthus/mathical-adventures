<script>
	import { modal } from '$lib/stores/modal';
	import SignedOut from '../SignedOut.svelte';
</script>

<header>
	<h1>Mathical Adventures</h1>
	<p>A relaxing place for kids to read and learn math</p>

	<ul>
		<li>
			<a href="/pro">PRO</a>
		</li>
		<li>
			<a href="/acts">ACTS</a>
		</li>
	</ul>

	<SignedOut>
		<button on:click={() => modal.set('default')}>Login</button>
	</SignedOut>
</header>
