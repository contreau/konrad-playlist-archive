<script lang="ts">
	import MusicNote from '$lib/svg/MusicNote.svelte';
	import Calendar from '$lib/svg/Calendar.svelte';
	const entry = $props();
	let isOpen = $state(false); // open + close state of details element
	function formatDate(dateString: string): string {
		const months: Record<string, string> = {
			'01': 'January',
			'02': 'February',
			'03': 'March',
			'04': 'April',
			'05': 'May',
			'06': 'June',
			'07': 'July',
			'08': 'August',
			'09': 'September',
			'10': 'October',
			'11': 'November',
			'12': 'December'
		};
		const dateComponents = dateString.split('-');
		let day = dateComponents[1];
		if (day[0] === '0') {
			day = day[1];
		}
		return `${months[dateComponents[0]]} ${day}, ${dateComponents[2]}`;
	}
</script>

<div class="playlist">
	<div class="playlist--info">
		<h3><a href={entry.url} target="__blank">{entry.name}</a></h3>
		<div class="track-info">
			<p>
				<span>
					<MusicNote />
					{entry.trackCount} songs
				</span>
				<span>
					<Calendar />
					{formatDate(entry.dateCreated)}
				</span>
			</p>
		</div>
	</div>

	{#if entry.description}
		<p class="description"><em>{entry.description}</em></p>
	{/if}

	<details bind:open={isOpen}>
		<summary>
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
				<path
					fill="none"
					stroke="#ffffff"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 5v14m-7-7h14"
				/>
			</svg>
			{#if isOpen}
				Collapse Songs
			{:else}
				View Songs
			{/if}
		</summary>
		<ol>
			{#each entry.tracks as track}
				<li>
					<a href={track.url} target="_blank">{track.name}</a> ••
					{#each track.artists as artist, i}
						{#if i === track.artists.length - 1}
							{artist}
						{:else}
							{artist}, &nbsp;
						{/if}
					{/each}
				</li>
			{/each}
		</ol>
	</details>
</div>

<style>
	h3 {
		font-weight: 550;
		font-size: 2.1rem;
		margin: 1rem 0;
	}

	.playlist {
		width: 100%;
		border: solid 2px #b1aec82b;
		border-radius: 12px;
		padding: 0.25em 0.8em;
	}

	.track-info {
		max-width: fit-content;
		gap: 0.25rem;

		p {
			font-size: 1.2rem;
			display: flex;
			align-items: center;
			gap: 1rem;
			margin-top: 0;
			margin-bottom: 0;
		}
	}

	.playlist--info {
		display: block;
		align-items: center;
		gap: 2.5rem;
	}

	.description {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	ol {
		padding-left: 1.5em;
	}

	li + li {
		margin-top: 1.5rem;
	}

	details {
		margin-bottom: 1rem;
		margin-top: 1rem;

		summary {
			list-style: none;
			font-size: 1.15rem;
			font-weight: 500;
			cursor: pointer;
			display: flex;
			align-items: center;
		}

		summary::-webkit-details-marker {
			display: none;
		}
	}

	details summary svg {
		transition: transform 0.3s;
	}

	details[open] summary svg {
		transform: rotate(45deg);
	}

	:global svg {
		margin-right: 0.2rem;
	}
</style>
