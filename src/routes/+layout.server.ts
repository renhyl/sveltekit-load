import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	console.log('hello from +layout.server.ts load() fn');
};
