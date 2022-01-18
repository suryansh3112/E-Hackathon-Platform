import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  let str = name.split(" ");
  let b = str?.[0]?.[0] || "";
  let c = str?.[1]?.[0] || "";
  const t = `${b}${c}`;
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 80,
      height: 80,
      m: "auto",
    },
    children: `${t.toUpperCase()}`,
  };
}

export default function LetterAvatar({ name }) {
  return <Avatar {...stringAvatar(name)} />;
}
