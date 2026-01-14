// Utility functions for GigFlow

// Format currency to Indian Rupees
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// Validate email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Get status badge color
export const getStatusColor = (status) => {
  const colors = {
    open: 'bg-green-100 text-green-800',
    assigned: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    hired: 'bg-green-200 text-green-800',
    rejected: 'bg-red-200 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

// Get status label
export const getStatusLabel = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export default {
  formatCurrency,
  formatDate,
  truncateText,
  validateEmail,
  validatePassword,
  getStatusColor,
  getStatusLabel,
};
