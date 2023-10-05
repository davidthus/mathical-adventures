import { writable } from 'svelte/store';

type Toast = {
	message: string;
	type?: 'success' | 'error' | 'info';
	icon?: string;
	delay?: number;
} | null;

export const toast = writable<Toast>(null);

window.addEventListener('flamethrower:router:fetch', () => {
	toast.set(null);
});
