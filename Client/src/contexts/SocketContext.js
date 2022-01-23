import React, { useState, useEffect, useContext, createContext } from 'react';
import Constants from '../common/Constants';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const { userData } = useAuth();
  useEffect(() => {
    const newSocket = io(Constants.server_url, {
      auth: {
        token: userData.token,
      },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [userData]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
