import React from 'react';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    borderBottom: '1px solid #ebe7fb',
    marginTop: 10,
    cursor: 'pointer',
    padding: '10px 10px 10px 20px',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#fff',
      borderRadius: 10,
    },
  },
  active: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  name: {
    color: '#000',
    fontWeight: 600,
    fontSize: 16,
    marginLeft: 10,
  },
});
export default function ChatListItem(props) {
  const { channel, setActiveChannel, activeChannel } = props;
  const classes = useStyles();
  const { name, id } = channel;

  const setChannel = () => {
    setActiveChannel({ id, name });
  };

  return (
    <div
      className={`${classes.root} ${
        activeChannel?.id === id ? classes.active : ''
      }`}
      onClick={setChannel}
    >
      <Avatar src='/broken-image.jpg' />
      <div>
        <p className={classes.name}>{name}</p>
      </div>
    </div>
  );
}
