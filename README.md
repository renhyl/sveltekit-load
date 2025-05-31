# sveltekit demo of progressive load

this is demo repo showcasing best pratices and techniques/patterns.

## Streaming with promises & Loading data

ref: https://svelte.dev/docs/kit/load#Streaming-with-promises
ref: https://svelte.dev/docs/kit/load

# setup

```bash
bun i


bun run dev
```

check About page for implemention see files:
+layout.server.ts
+page.svelte

Description:
`+page.svelte` has a buttons, respectively clicking a button will trigger SvelteKit's `goto()`, this will update url param `value`,
when param changes, the `load()` function inside of``+layout.server.ts` will trigger.
