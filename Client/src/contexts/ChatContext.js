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
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);

  const addMessageToChannel = (messageObj) => {
    setChannels((prev) => {
      let index = prev.findIndex((x) => x.id === messageObj.channelId);
      if (index !== -1) {
        let temporaryarray = prev.slice();
        temporaryarray[index]['messages'] = [
          ...temporaryarray[index]['messages'],
          messageObj,
        ];
        return temporaryarray;
      }
      return prev;
    });
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
    <ChatContext.Provider
      value={{ channels, sendMessage, activeChannel, setActiveChannel }}
    >
      {children}
    </ChatContext.Provider>
  );
}
