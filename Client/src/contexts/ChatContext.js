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

    socket.on('receiveMessage', (message) => {
      console.log(message);
    });

    return () => socket.off('receiveMessage');
  }, [socket]);

  const sendMessage = (message, channelId) => {
    socket.emit('sendMessage', { message, channelId });
  };

  return (
    <ChatContext.Provider value={{ channels, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}
