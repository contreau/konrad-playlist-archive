<script>
	let { children } = $props();
</script>

<svelte:head>
	<title>Konrad's Songbook</title>
</svelte:head>

<header>
	<img src="/konrad-pfp--180x180.png" alt="Konrad" height="180" width="180" />
	<div>
		<h1>Konrad's Songbook</h1>
		<p>
			<span>826</span> Original Playlists • <span>59,903</span> Songs •
			<a href="https://open.spotify.com/user/1261690341?si=235dbc5649f8441e" target="_blank"
				>Spotify Profile</a
			>
		</p>
	</div>
</header>

<main>
	{@render children()}
</main>

<style>
	:global {
		:root {
			--text: #ededee;
			--background: #0e0d11;
			--primary: #b1aec8;
			--secondary: #3d3964;
			--accent: #a095ff;
			--page-border: #a095ff7e;
		}

		*,
		*::before,
		*::after {
			box-sizing: border-box;
		}

		html,
		body {
			margin: 0;
			padding: 0;
		}

		html {
			min-height: 100vh;
			border-left: solid 3px var(--page-border);
			border-right: solid 3px var(--page-border);
			border-radius: 2px;
		}

		body {
			font-family: system-ui;
			color: var(--text);
			padding-inline: 4em;
			background-color: var(--background);
		}

		img {
			display: block;
		}

		a {
			color: #c0b9ff;
		}

		header {
			margin-top: 1.5rem;
			display: flex;
			align-items: center;
			gap: 6rem;
			max-width: fit-content;
			margin-inline: auto;

			div p {
				font-weight: 600;
				font-size: 1.25rem;
				span {
					color: var(--accent);
				}
			}
		}

		h1 {
			margin-top: 0;
			margin-bottom: 1rem;
			font-size: 5rem;
			font-weight: 550;
		}

		main {
			margin-top: 4rem;
		}
	}
</style>
