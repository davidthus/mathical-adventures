<script lang="ts">
	import FirebaseApp from '$lib/components/FirebaseApp.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import { auth, db as firestore, storage } from '$lib/firebase';
</script>

<FirebaseApp {auth} {firestore} {storage}>
	<Header />
	<slot />
	<Footer />
</FirebaseApp>
