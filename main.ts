import type { playlistJSON } from "./types.ts";
import { unescape } from "@std/html/entities";
import { merge_sort, formatDate } from "./functions.ts";

// read in playlists.json
const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("./data/playlists.json");
const decodedData: string = decoder.decode(data);
const playlists: playlistJSON | string = JSON.parse(decodedData);

// reformat
for (let i = 0; i < playlists.length; i++) {
  const pl = playlists as playlistJSON;
  delete pl[i].image;
  delete pl[i].followers;
  pl[i].name = unescape(pl[i].name);
  pl[i].dateCreated = formatDate(pl[i].dateCreated);
  for (let j = 0; j < pl[i].tracks.length; j++) {
    delete pl[i].tracks[j].dateAdded;
  }
}

// sort playlists by dateCreated into two copies, one ascending and one descending
let playlists_ascending: playlistJSON | string = merge_sort(
  playlists as playlistJSON
);
let playlists_descending: playlistJSON | string = playlists_ascending
  .slice()
  .reverse();

// write out new files
playlists_ascending = JSON.stringify(playlists_ascending);
playlists_descending = JSON.stringify(playlists_descending);
const encoder = new TextEncoder();
const write_ascending_pl: Uint8Array = encoder.encode(playlists_ascending);
const write_descending_pl: Uint8Array = encoder.encode(playlists_descending);
await Deno.writeFile("./web/playlists-web-ascending.json", write_ascending_pl);
await Deno.writeFile(
  "./web/playlists-web-descending.json",
  write_descending_pl
);
