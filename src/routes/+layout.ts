import type { LayoutLoad } from './$types';

const posts = [
	{
		title: 'post title a1'
	},
	{
		title: 'post title a2'
	}
];

const comments = [
	{
		message: 'comment a1'
	},
	{
		message: 'comment a2'
	}
];

async function fakeFetchComments(delay: number) {
	await new Promise((resolve) => setTimeout(resolve, delay));
	return comments;
}

async function fakeFetchPosts(delay: number, value: string | null) {
	await new Promise((resolve) => setTimeout(resolve, delay));

	if (!value) return posts;
	if (value === 'a1') return [posts[0]];

	return [posts[1]];
}

export const load: LayoutLoad = async ({ url }) => {
	console.log('hello from +layout.ts load() fn');
	const value = url.searchParams.get('value');

	return {
		posts: fakeFetchPosts(2000, value),
		comments: fakeFetchComments(4000)
	};
};
