import React from 'react';
import { makeStyles } from '@mui/styles';
import { CustomAvatar } from '../../../components';

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
  const {
    channelName,
    channelId,
    setActiveChannel,
    activeChannel,
    channelType,
  } = props;
  const classes = useStyles();

  const setChannel = () => {
    setActiveChannel({ name: channelName, id: channelId });
  };

  return (
    <div
      className={`${classes.root} ${
        activeChannel?.id === channelId ? classes.active : ''
      }`}
      onClick={setChannel}
    >
      <CustomAvatar size={40} name={channelType} />
      <div>
        <p className={classes.name}>{channelName}</p>
      </div>
    </div>
  );
}
