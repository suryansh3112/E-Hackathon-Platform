import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Constants from '../common/Constants';

function stringToColor(string = '') {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name, size, image_url) {
  let str = name?.split(' ');
  let b = str?.[0]?.[0] || '';
  let c = str?.[1]?.[0] || '';
  const t = `${b}${c}`;
  return {
    src: image_url
      ? `${Constants.server_url}/${image_url}`
      : '/broken-image.jpg',
    sx: {
      bgcolor: name && stringToColor(name),
      width: size,
      height: size,
      m: 'auto',
    },
    children: `${t.toUpperCase()}`,
  };
}

export default function CustomAvatar({ name, size = 80, image_url }) {
  if (!name && !image_url) {
    return <Avatar sx={{ width: size, height: size }} />;
  }
  return <Avatar {...stringAvatar(name, size, image_url)} />;
}
