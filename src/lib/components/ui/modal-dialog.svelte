<svelte:options customElement="modal-dialog" />

<script lang="ts">
	import { modal } from '$lib/stores/modal';
	export let name = 'default';
	export let esc = false;

	function closeModal() {
		modal.set(null);
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="backdrop" class:show={$modal === name} on:click={closeModal}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation class="inner" class:inner-show={$modal === name}>
		{#if esc}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<kbd class="esc" on:click={closeModal}>esc</kbd>
		{/if}
		<slot />
	</div>
</div>

<style>
	.show {
		display: flex;
	}
</style>
