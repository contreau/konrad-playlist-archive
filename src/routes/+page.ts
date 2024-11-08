import type { PageLoad } from './$types';
import type { playlistJSON } from '$lib/types';

export const load: PageLoad = async () => {
	const { default: playlists } = (await import('$lib/playlists.json')) as { default: playlistJSON };
	return {
		playlists
	};
};
