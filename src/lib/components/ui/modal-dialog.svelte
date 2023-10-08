<svelte:options customElement="modal-dialog" />

<script lang="ts">
	import { modal } from '$lib/stores/modal';
	export let name = 'default';
	export let esc = false;

	function closeModal() {
		modal.set(null);
	}
</script>

<div class="backdrop" class:show={$modal === name} on:click={closeModal}>
	<div on:click|stopPropagation class="inner" class:inner-show={$modal === name}>
		{#if esc}
			<kbd class="esc" on:click={closeModal}>esc</kbd>
		{/if}
		<slot />
	</div>
</div>
