<script lang="ts">
	import type { Auth } from 'firebase/auth';
	import { userStore } from '../stores/auth.js';
	import { getFirebaseContext } from '../stores/sdk.js';

	const auth = getFirebaseContext().auth!;
	const user = userStore(auth);

	interface $$Slots {
		default: { auth: Auth };
	}
</script>

{#if !$user}
	<slot {auth} />
{/if}
