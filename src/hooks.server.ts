import { GOOGLE_ID, GOOGLE_SECRET } from '$env/static/private';

import Google from '@auth/core/providers/google';
import { SvelteKitAuth } from '@auth/sveltekit';

export const handle = SvelteKitAuth({
	providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })]
});
