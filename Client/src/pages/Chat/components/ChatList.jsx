import React from 'react';
import { makeStyles } from '@mui/styles';
import ChatListItem from './ChatListItem';

const useStyles = makeStyles({
  root: {
    minWidth: '20%',
    borderRight: '1px solid #ebe7fb',
    padding: '0 40px 0 0px',
  },
});
export default function ChatList(props) {
  const classes = useStyles();
  const { channels, setActiveChannel, activeChannel } = props;
  return (
    <div className={classes.root}>
      <h2>Chats</h2>
      <div>
        {channels?.length > 0
          ? channels.map((channel) => {
              return (
                <ChatListItem
                  key={channel.id}
                  channelName={channel.name}
                  channelId={channel.id}
                  setActiveChannel={setActiveChannel}
                  activeChannel={activeChannel}
                  channelType={channel.teamId ? 'Team' : 'Hackathon'}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}
