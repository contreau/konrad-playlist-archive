<script lang="ts">
	import Playlist from '$lib/components/Playlist.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	const playlists = data['playlists'];
</script>

<section class="content-grid">
	{#each playlists as playlist}
		<Playlist
			name={playlist.name}
			url={playlist.url}
			trackCount={playlist.trackCount}
			description={playlist.description}
			dateCreated={playlist.dateCreated}
			tracks={playlist.tracks}
		/>
	{/each}
</section>

<style>
	.content-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		column-gap: 2rem;
		row-gap: 4rem;
		place-items: center;
	}
</style>
