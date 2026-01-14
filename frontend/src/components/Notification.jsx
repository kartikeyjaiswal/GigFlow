import { useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

const Notification = () => {
  const { notification, clearNotification } = useSocket();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 5000); // Auto-dismiss after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  if (!notification) return null;

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
      default:
        return 'bg-blue-500';
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <div
      className={`fixed top-6 right-6 ${getBgColor()} text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center gap-4 min-w-[300px] max-w-md animate-slide-in`}
      role="alert"
    >
      <span className="text-2xl font-bold flex-shrink-0">{getIcon()}</span>
      <p className="font-semibold flex-1">{notification.message}</p>
      <button
        onClick={clearNotification}
        className="ml-2 text-white hover:opacity-80 font-bold text-xl flex-shrink-0"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default Notification;

