import API from './api';

export const authUser = (data) => API.post(`/auth/login`, data);
export const registerUser = (data) => API.post(`/auth/register`, data);
export const updateToken = (data) => API.put(`/auth/login`, data);
