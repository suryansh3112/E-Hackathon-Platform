import React from 'react';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import { useAuth } from '../../../contexts/AuthContext';
const useStyles = makeStyles({
  chat__item: {
    display: 'flex',
    margin: '8px 0',
    maxWidth: '70%',
  },
  my_chat__item: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  lightText: {
    fontSize: 10,
  },
  name: {
    fontSize: 13,
    margin: '0 0 5px',
  },
  myName: {
    alignSelf: 'flex-end',
  },
  right: {
    margin: '0 10px 0',
    display: 'flex',
    flexDirection: 'column',
  },
  myMessage: {
    backgroundColor: '#4462ff',
    color: '#fff',
    padding: 15,
    borderRadius: '10px 0 10px 10px',
  },
  messageBody: {
    backgroundColor: '#fff',
    color: '#000',
    padding: 15,
    borderRadius: '0 10px 10px 10px',
  },
});
export default function Message(props) {
  const classes = useStyles();
  const { userId, name, message, createdAt } = props;
  const { userData } = useAuth();
  const me = userData.user.id === userId;

  const getTime = () => {
    const t = new Date(createdAt);
    return t.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  return (
    <div className={`${classes.chat__item} ${me && classes.my_chat__item}`}>
      <div className={classes.left}>
        <Avatar src='/broken-image.jpg' />
        <p className={classes.lightText}>{getTime(createdAt)}</p>
      </div>
      <div className={classes.right}>
        <p className={`${classes.name} ${me && classes.myName}`}>{name}</p>
        <div className={`${me ? classes.myMessage : classes.messageBody}`}>
          {message}
        </div>
      </div>
    </div>
  );
}
