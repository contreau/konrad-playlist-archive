export type playlistJSON = Playlist[];

interface Playlist {
  name: string;
  followers?: number;
  dateCreated: string;
  description: string | undefined;
  url: string;
  image?: string;
  trackCount: number;
  tracks: Array<Tracks>;
}

interface Tracks {
  name: string;
  artists: Array<string>;
  album: string;
  url: string;
  dateAdded?: string;
}
