/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { derived, writable, type Readable } from 'svelte/store';

const config = {
	apiKey: 'AIzaSyAvbhiMKAf6PGGtDVdHRZoTKMpt-HI05Yk',
	authDomain: 'mathical-adventures.firebaseapp.com',
	projectId: 'mathical-adventures',
	storageBucket: 'mathical-adventures.appspot.com',
	messagingSenderId: '312537606902',
	appId: '1:312537606902:web:67c8fe0086e55ddf081ad7',
	measurementId: 'G-3SVKDB3CKZ'
};

export const app = initializeApp(config);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

function userStore() {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<User | null>(null);
		return {
			subscribe
		};
	}
	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return { subscribe };
}

function docStore<T>(path: string) {
	let unsubscribe: () => void;

	const docRef = doc(db, path);

	const { subscribe } = writable<T | null>(null, (set) => {
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			set((snapshot.data() as T) ?? null);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: docRef,
		id: docRef.id
	};
}

export const user = userStore();

interface UserData {
	photoURL: string;
	username: string;
	bio: string;
	links: any[];
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
	if ($user) {
		return docStore<UserData>(`users/${$user?.uid}`).subscribe(set);
	} else {
		set(null);
	}
});
