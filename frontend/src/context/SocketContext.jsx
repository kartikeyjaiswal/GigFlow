import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const newSocket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000', {
        withCredentials: true,
      });

      newSocket.on('hired', (data) => {
        // Only show notification if it's for the current user
        if (data.userId === user._id || data.userId === user._id?.toString()) {
          setNotification({
            type: 'success',
            message: data.message || `You have been hired for ${data.gigTitle}!`,
            gigId: data.gigId,
          });
        }
      });

      newSocket.on('bid_rejected', (data) => {
        if (data.userId === user._id || data.userId === user._id?.toString()) {
          setNotification({
            type: 'error',
            message: data.message || `Your bid for ${data.gigTitle} was rejected.`,
            gigId: data.gigId,
          });
        }
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  const clearNotification = () => {
    setNotification(null);
  };

  const value = {
    socket,
    notification,
    clearNotification,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

