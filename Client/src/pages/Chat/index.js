import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import ChatList from './components/ChatList';
import ChatContent from './components/ChatContent';
import ActiveUsers from './components/ActiveUsers';
import { useChat } from '../../contexts/ChatContext';

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
  const { channels, sendMessage } = useChat();
  const [activeChannel, setActiveChannel] = useState(null);

  return (
    <div className={classes.root}>
      <ChatList
        channels={channels}
        setActiveChannel={setActiveChannel}
        activeChannel={activeChannel}
      />
      <ChatContent
        activeChannel={activeChannel}
        messagesArray={
          channels?.find((channel) => channel.id === activeChannel?.id)
            ?.messages
        }
        sendMessage={sendMessage}
      />
      <ActiveUsers />
    </div>
  );
}
