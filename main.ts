import type { playlistJSON } from "./types.ts";
import { unescape } from "@std/html/entities";

function formatDate(dateString: string): string {
  const months: Record<string, string> = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };
  const dateComponents = dateString.split("-");
  let day = dateComponents[1];
  if (day[0] === "0") {
    day = day[1];
  }
  return `${months[dateComponents[0]]} ${day}, ${dateComponents[2]}`;
}

// read in playlists.json
const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("./data/playlists.json");
const decodedData: string = decoder.decode(data);
let playlists: playlistJSON | string = JSON.parse(decodedData);

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

// write out new file
playlists = JSON.stringify(playlists);
const encoder = new TextEncoder();
const writeData: Uint8Array = encoder.encode(playlists);
await Deno.writeFile("./web/playlists-web.json", writeData);
