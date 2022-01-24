import React, { useState, useEffect, useContext, createContext } from 'react';
import { fetchAllUsersChannels } from '../common/utils';
import { useAuth } from './AuthContext';
import { useSocket } from './SocketContext';

const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const socket = useSocket();
  const { userData } = useAuth();
  const [channels, setChannels] = useState(null);

  const addMessageToChannel = (messageObj) => {
    let index = channels?.findIndex((x) => x.id === messageObj.channelId);
    if (index !== -1) {
      let temporaryarray = channels.slice();
      temporaryarray[index]['messages'] = [
        ...temporaryarray[index]['messages'],
        messageObj,
      ];
      setChannels(temporaryarray);
    }
  };
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

  useEffect(() => {
    if (socket == null) return;

    socket.on('receiveMessage', addMessageToChannel);

    return () => socket.off('receiveMessage');
  }, [socket]);

  const sendMessage = (message, channelId) => {
    socket.emit(
      'sendMessage',
      {
        message,
        channelId,
      },
      (res) => {
        const { success, data, message } = res;
        if (success) {
          addMessageToChannel(data);
        } else {
          console.log(message);
        }
      }
    );
  };

  return (
    <ChatContext.Provider value={{ channels, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}
