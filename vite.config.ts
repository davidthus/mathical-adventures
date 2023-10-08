import { sveltekit } from '@sveltejs/kit/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), svelte({ compilerOptions: { customElement: true } })],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
