import type { playlistJSON } from "./types.ts";

export function merge_sort(data: playlistJSON): playlistJSON {
  if (data.length <= 1) {
    return data;
  }

  const mid = Math.floor(data.length / 2);
  const left_half = data.slice(0, mid);
  const right_half = data.slice(mid, data.length);

  const sortedLeft: playlistJSON = merge_sort(left_half);
  const sortedRight: playlistJSON = merge_sort(right_half);

  return merge(sortedLeft, sortedRight);
}

function merge(
  left_half: playlistJSON,
  right_half: playlistJSON
): playlistJSON {
  let result: playlistJSON = [];
  let i: number = 0,
    j: number = 0;

  while (i < left_half.length && j < right_half.length) {
    if (
      new Date(left_half[i].dateCreated) < new Date(right_half[j].dateCreated)
    ) {
      result.push(left_half[i]);
      i++;
    } else {
      result.push(right_half[j]);
      j++;
    }
  }

  result = [...result, ...left_half.slice(i, left_half.length)];
  result = [...result, ...right_half.slice(j, right_half.length)];
  return result;
}

export function formatDate(dateString: string): string {
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
