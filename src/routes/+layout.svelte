<script lang="ts">
	import FirebaseApp from '$lib/components/FirebaseApp.svelte';
	import { auth, db as firestore, storage } from '$lib/firebase';
</script>

<FirebaseApp {auth} {firestore} {storage}>
	<slot />
</FirebaseApp>
