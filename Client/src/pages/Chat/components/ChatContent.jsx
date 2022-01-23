import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import Message from './Message';
import { TextField } from '@mui/material';
import { useState } from 'react';
const chatItms = [
  {
    id: 1,
    userId: 'e0480185-25a2-4074-b5f5-4e93910fe294',
    image:
      'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
    type: '',
    msg: 'Hi Tim, How are you?',
  },
  {
    id: 2,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
    type: 'other',
    msg: 'I am fine.',
  },
  {
    id: 3,
    userId: 'e0480185-25a2-4074-b5f5-4e93910fe294',

    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
    type: 'other',
    msg: 'What about you?',
  },
  {
    id: 4,
    image:
      'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
    type: '',
    msg: 'Awesome these days.',
  },
  {
    id: 5,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
    type: 'other',
    msg: "Finally. What's the plan?",
  },
  {
    id: 6,
    userId: 'e0480185-25a2-4074-b5f5-4e93910fe294',

    image:
      'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
    type: '',
    msg: 'what plan mate?',
  },
  {
    id: 7,
    userId: 'e0480185-25a2-4074-b5f5-4e93910fe294',

    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
    type: 'other',
    msg: "I'm taliking about the tutorial",
  },
  {
    id: 6,
    userId: 'e0480185-25a2-4074-b5f5-4e93910fe294',

    image:
      'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
    type: '',
    msg: "I'm taliking about the tutorial I'm taliking about the tutorial I'm taliking about the tutorial",
  },
  {
    id: 7,

    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
    type: 'other',
    msg: "I'm taliking about the tutorial I'm taliking about the tutorial I'm taliking about the tutorial",
  },
];

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

  return (
    <div className={classes.root}>
      <div className={classes.content__header}>
        <Avatar src='/broken-image.jpg' />
        <p>{activeChannel?.name}</p>
      </div>
      <div className={classes.content__body}>
        {messagesArray?.length > 0 ? (
          messagesArray.map((message) => {
            return (
              <Message
                key={message.id}
                message={message.message}
                createdAt={message.createdAt}
                name={message.user.profile.fullName}
                userId={message.userId}
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
