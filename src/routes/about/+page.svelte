<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { data } = $props();

	const loadedValue = $derived(page.url.searchParams.get('value'));

	const handleOnClick = async (value) => {
		await goto('?value=' + value); // this will trigger load()
	};

	const handleOnClickWithoutLoad = async (value) => {
		page.url.searchParams.set('value', value); // this will not trigger load()
		goto(page.url);
	};
</script>

<div class="min-h-screen bg-white">
	<!-- Main container with svelte.dev-like max width and padding -->
	<div class="mx-auto p-4">
		<div class="flex flex-row gap-4">
			<div class="w-1/2 border-r-1 border-r-amber-600 p-2">
				<!-- Header section -->
				<div class="mb-2">
					<div
						class="mb-4 inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700"
					>
						URL Parameter: <span class="ml-1 font-mono text-orange-800"
							>{loadedValue || 'none'}</span
						>
					</div>
				</div>

				<!-- Important note section -->
				<div class="mb-2 rounded-r-lg border-l-4 border-orange-500 bg-gray-50 p-6">
					<p class="mb-2 text-lg font-semibold text-gray-900">
						SvelteKit tracks the dependencies of each load function to avoid rerunning it
						unnecessarily during navigation.
					</p>
					<a
						href="https://svelte.dev/docs/kit/load#Rerunning-load-functions"
						target="_blank"
						class="font-medium text-orange-600 underline decoration-orange-300 transition-colors hover:text-orange-700 hover:decoration-orange-500"
					>
						Learn more in the docs →
					</a>
				</div>

				<!-- Interactive buttons section -->
				<div class="space-y-8">
					<!-- First button group -->
					<div class="space-y-4">
						<h3 class="text-xl font-bold text-gray-900">Buttons that trigger load()</h3>
						<div class="flex flex-wrap gap-3">
							<button
								class="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-orange-600 hover:shadow-md"
								onclick={() => handleOnClick('a1')}
							>
								Set to 'a1'
							</button>
							<button
								class="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-orange-600 hover:shadow-md"
								onclick={() => handleOnClick('a2')}
							>
								Set to 'a2'
							</button>
						</div>
					</div>

					<div class="mb-2 rounded-r-lg border-l-4 border-orange-500 bg-gray-50 p-6">
						<p class="mb-4 leading-relaxed text-gray-700">
							Clicking the buttons below will trigger <code
								class="rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800">load()</code
							>
							in
							<code class="rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800"
								>+layout.ts</code
							> <strong>once</strong> (after hard refresh/initial page load) and then subsequent clicks
							no longer trigger load() due to SvelteKit optimizing away the load() call.
						</p>
						<a
							href="https://svelte.dev/docs/kit/load#Rerunning-load-functions-When-do-load-functions-rerun"
							target="_blank"
							class="font-medium text-blue-600 underline decoration-blue-300 transition-colors hover:text-blue-700 hover:decoration-blue-500"
						>
							Read about when load functions rerun →
						</a>
					</div>

					<!-- Second button group -->
					<div class="space-y-4">
						<h3 class="text-xl font-bold text-gray-900">
							Buttons that don't trigger load() (url param changes)
						</h3>
						<div class="flex flex-wrap gap-3">
							<button
								class="rounded-lg border border-gray-300 bg-gray-200 px-6 py-3 font-semibold text-gray-800 shadow-sm transition-colors duration-200 hover:bg-gray-300 hover:shadow-md"
								onclick={() => handleOnClickWithoutLoad('a1')}
							>
								Set to 'a1' (no load)
							</button>
							<button
								class="rounded-lg border border-gray-300 bg-gray-200 px-6 py-3 font-semibold text-gray-800 shadow-sm transition-colors duration-200 hover:bg-gray-300 hover:shadow-md"
								onclick={() => handleOnClickWithoutLoad('a2')}
							>
								Set to 'a2' (no load)
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="w-1/2 p-2">
				<div class="mb-2 rounded-r-lg border-l-4 border-orange-500 bg-gray-50 p-6">
					<a
						href="https://svelte.dev/docs/kit/load#Streaming-with-promises"
						target="_blank"
						class="font-medium text-blue-600 underline decoration-blue-300 transition-colors hover:text-blue-700 hover:decoration-blue-500"
					>
						Streaming-with-promises docs →
					</a>
				</div>
				<!-- Progressive loading demonstration -->
				<div class="border-t border-gray-200 pt-8">
					<p class="mb-6 text-gray-600">
						Posts will load after 2s while comments will load after 4s. Check browser console for
						load() trigger info, and terminal console for server-side load() output.
					</p>
				</div>
				<!-- Data loading sections -->
				<div class="mt-12 space-y-12">
					<!-- Posts section -->
					<div class="space-y-4">
						<h3 class="text-xl font-bold text-gray-900">Posts</h3>
						{#await data.posts}
							<div class="flex items-center space-x-3 rounded-lg bg-gray-50 p-4">
								<div class="h-5 w-5 animate-spin rounded-full border-b-2 border-orange-500"></div>
								<span class="text-gray-600">Loading posts...</span>
							</div>
						{:then posts}
							<div class="grid gap-4">
								{#each posts as post (post)}
									<div
										class="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300"
									>
										<h4 class="font-semibold text-gray-900">{post.title}</h4>
									</div>
								{/each}
							</div>
						{/await}
					</div>

					<!-- Comments section -->
					<div class="space-y-4">
						<h3 class="text-xl font-bold text-gray-900">Comments</h3>
						{#await data.comments}
							<div class="flex items-center space-x-3 rounded-lg bg-gray-50 p-4">
								<div class="h-5 w-5 animate-spin rounded-full border-b-2 border-orange-500"></div>
								<span class="text-gray-600">Loading comments...</span>
							</div>
						{:then comments}
							<div class="space-y-3">
								{#each comments as comment (comment)}
									<div class="rounded-lg border-l-4 border-gray-300 bg-gray-50 p-3">
										<p class="text-gray-700">{comment.message}</p>
									</div>
								{/each}
							</div>
						{:catch error}
							<div class="rounded-lg border border-red-200 bg-red-50 p-4">
								<p class="font-medium text-red-700">Error loading comments: {error.message}</p>
							</div>
						{/await}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
