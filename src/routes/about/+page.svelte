<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { data } = $props();

	const loadedValue = $derived(page.url.searchParams.get('value'));

	const handleOnClick = async (value) => {
		// page.url.searchParams.set('value', value);
		await goto('?value=' + value);
	};
</script>

<div class="flex flex-col gap-4">
	<button class="w-fit cursor-pointer border p-2" onclick={() => handleOnClick('a1')}>a1</button>
	<button class="w-fit cursor-pointer border p-2" onclick={() => handleOnClick('a2')}>a2</button>
	<br />
	<h2>
		Demonstrates progressive loading, posts will load after 2s while comments will load after 4s
	</h2>

	NOTE: inspect browser console for more info on when +layout.ts - load() is triggered, and see
	terminal console output for when +layout.server.ts - load() is triggered. url param loaded
	immedietly from page.url.searchParams.get('value'): {loadedValue}
</div>

<br />

{#await data.posts}
	Loading posts...
{:then posts}
	<div>
		loaded posts:
		{#each posts as post (post)}
			<p>{post.title}</p>
		{/each}
	</div>
{/await}

<br />
<br />

{#await data.comments}
	Loading comments...
{:then comments}
	{#each comments as comment (comment)}
		<p>{comment.message}</p>
	{/each}
{:catch error}
	<p>error loading comments: {error.message}</p>
{/await}
