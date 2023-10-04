/* eslint-disable @typescript-eslint/no-explicit-any */
const config = {
	apiKey: 'AIzaSyAvbhiMKAf6PGGtDVdHRZoTKMpt-HI05Yk',
	authDomain: 'mathical-adventures.firebaseapp.com',
	projectId: 'mathical-adventures',
	storageBucket: 'mathical-adventures.appspot.com',
	messagingSenderId: '312537606902',
	appId: '1:312537606902:web:67c8fe0086e55ddf081ad7',
	measurementId: 'G-3SVKDB3CKZ'
};

import { initializeAnalytics, logEvent } from 'firebase/analytics';
import {
	GoogleAuthProvider,
	OAuthProvider,
	getAuth,
	isSignInWithEmailLink,
	sendSignInLinkToEmail,
	signInWithEmailLink,
	signInWithPopup,
	signOut
} from 'firebase/auth';

import { initializeApp } from 'firebase/app';
import type { UserCredential } from 'firebase/auth';
import { rootURL } from './stores/data';

const firebaseApp = initializeApp(config);
export const auth = getAuth(firebaseApp);

export const anal = initializeAnalytics(firebaseApp);

export function GAPageView() {
	logEvent(anal, 'page_view', {
		page_location: window.location.href
	});
}

export function GAEvent(name: string, data?: any) {
	logEvent(anal, name, data);
}

export async function signInWithGoogle() {
	const credential = signInWithPopup(auth, new GoogleAuthProvider());
	return loginHandler(credential);
}

export async function signInWithApple() {
	const provider = new OAuthProvider('apple.com');
	const credential = signInWithPopup(auth, provider);
	return loginHandler(credential);
}

// TODO update url in production
export async function sendPasswordlessEmail(email: string, url?: string) {
	const actionCodeSettings = {
		// url: 'https://fireship.io/dashboard',
		url: url ?? `${rootURL}/dashboard`, // TODO
		// This must be true.
		handleCodeInApp: true
	};

	let res: any, serverError: string;
	try {
		await sendSignInLinkToEmail(auth, email, actionCodeSettings);
		window.localStorage.setItem('emailForSignIn', email);
		res = `Magic signin link sent to ${email}`;
	} catch (error: any) {
		serverError = error.message;
	}

	return { res, serverError };
}
export async function passwordlessSignin() {
	if (isSignInWithEmailLink(auth, window.location.href)) {
		let email = window.localStorage.getItem('emailForSignIn');
		if (!email) {
			email = window.prompt('Please provide your email for confirmation');
		}

		const credential = signInWithEmailLink(auth, email, window.location.href);
		window.localStorage.removeItem('emailForSignIn');
		return loginHandler(credential);
	} else {
		return { res: null, serverError: 'Invalid link' };
	}
}

export async function firebaseSignOut() {
	await signOut(auth);
	toast.set({
		icon: '👋',
		message: 'Thanks for hanging out, see ya around!'
	});
}

async function loginHandler(promise: Promise<UserCredential>) {
	let res: any, serverError: string;
	try {
		res = await promise;
		modal.set(null);
		toast.set({
			message: 'Access granted! Logged into the mainframe!',
			type: 'success'
		});
	} catch (err) {
		serverError = err.message;
		console.error(err);
		toast.set({
			message: serverError,
			type: 'error'
		});
	}
	return { res, serverError };
}
