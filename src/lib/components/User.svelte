<script lang="ts">
	import { userStore } from '$lib/stores/auth.js';
	import { getFirebaseContext } from '$lib/stores/sdk';
	import type { User } from 'firebase/auth';

	const auth = getFirebaseContext().auth!;
	const user = userStore(auth);

	interface $$Slots {
		default: { user: User };
		signedOut: {};
	}
</script>

{#if $user}
	<slot user={$user} />
{:else}
	<slot name="signedOut" />
{/if}
