// API service functions for GigFlow

import api from '../config/api';

// Auth API calls
export const authAPI = {
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  logout: () =>
    api.post('/auth/logout'),
  getMe: () =>
    api.get('/auth/me'),
};

// Gig API calls
export const gigAPI = {
  getAll: (search = '') =>
    api.get('/gigs', { params: search ? { search } : {} }),
  getById: (id) =>
    api.get(`/gigs/${id}`),
  create: (title, description, budget) =>
    api.post('/gigs', { title, description, budget }),
  update: (id, data) =>
    api.patch(`/gigs/${id}`, data),
};

// Bid API calls
export const bidAPI = {
  submit: (gigId, message, price) =>
    api.post('/bids', { gigId, message, price }),
  getByGig: (gigId) =>
    api.get(`/bids/${gigId}`),
  hire: (bidId) =>
    api.patch(`/bids/${bidId}/hire`),
};

export default {
  authAPI,
  gigAPI,
  bidAPI,
};
