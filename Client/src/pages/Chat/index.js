import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import ChatList from './components/ChatList';
import ChatContent from './components/ChatContent';
import ActiveUsers from './components/ActiveUsers';
import { fetchAllUsersChannels } from './utils';
import { useAuth } from '../../contexts/AuthContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: '#f4f3f8',
    borderRadius: 10,
    padding: '15px 20px',
  },
});

export default function Chat() {
  const classes = useStyles();
  const { userData } = useAuth();
  const [channels, setChannels] = useState(null);
  const [activeChannel, setActiveChannel] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetchAllUsersChannels(userData.token);
      if (res.success) {
        setChannels(res.data);
      } else {
        console.log(res.message);
      }
    };
    getData();
  }, []);

  return (
    <div className={classes.root}>
      <ChatList
        channels={channels}
        setActiveChannel={setActiveChannel}
        activeChannel={activeChannel}
      />
      <ChatContent activeChannel={activeChannel} />
      <ActiveUsers />
    </div>
  );
}
