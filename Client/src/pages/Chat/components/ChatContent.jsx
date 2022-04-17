import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Avatar from '@mui/material/Avatar';
import Message from './Message';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    padding: '20px 40px',
    minWidth: '50%',
    borderRight: '1px solid #ebe7fb',
    display: 'flex',
    flexDirection: 'column',
    height: '84vh',
  },
  content__header: {
    paddingBottom: 15,
    borderBottom: '1px solid #ebe7fb',
    display: 'flex',
    alignItems: 'center',
    '& p': {
      fontWeight: 600,
      marginLeft: 15,
    },
  },
  content__body: {
    flexGrow: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },

  content__footer: {
    borderTop: '1px solid #ebe7fb',
    paddingTop: 30,
    display: 'flex',
  },
});
export default function ChatContent(props) {
  const classes = useStyles();
  const { activeChannel, messagesArray, sendMessage } = props;
  const [newMessage, setNewMessage] = useState('');
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  if (!activeChannel) {
    return (
      <div className={classes.root}>
        <h2>Make Sure Internet is connected</h2>
      </div>
    );
  }

  const handleClick = () => {
    sendMessage(newMessage, activeChannel.id);
    setNewMessage('');
  };

  const handleVideoCallClick = () => {
    // sendMessage(newMessage, activeChannel.id);
  };

  return (
    <div className={classes.root}>
      <div className={classes.content__header}>
        <Avatar src='/broken-image.jpg' />
        <p>{activeChannel?.name}</p>
      </div>
      <div className={classes.content__body}>
        {messagesArray?.length > 0 ? (
          messagesArray.map((message, idx) => {
            return (
              <Message
                key={message.id}
                message={message.message}
                createdAt={message.createdAt}
                name={message.user.profile.fullName}
                userId={message.userId}
                image_url={message.user.profile.image_url}
                setRef={setRef}
                lastMessage={messagesArray.length - 1 === idx}
              />
            );
          })
        ) : (
          <h2>Start Conversation</h2>
        )}
      </div>
      <div className={classes.content__footer}>
        <TextField
          label='Message'
          name='message'
          value={newMessage}
          style={{ flexGrow: 1 }}
          size='small'
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Fab
          style={{ marginLeft: 10 }}
          size='small'
          color='secondary'
          aria-label='edit'
          onClick={handleVideoCallClick}
          component={Link}
          to={`/video-call/${activeChannel.id}`}
          target='_blank'
        >
          <VideoCallIcon />
        </Fab>
        {newMessage?.length > 0 && (
          <Fab
            style={{ marginLeft: 10 }}
            size='small'
            color='secondary'
            aria-label='edit'
            onClick={handleClick}
          >
            <SendIcon />
          </Fab>
        )}
      </div>
    </div>
  );
}
