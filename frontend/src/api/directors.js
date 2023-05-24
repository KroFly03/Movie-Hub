import API from './api';

export const getDirectors = () => API.get(`/directors/`);
export const getDirector = (id) => API.get(`/directors/${id}`);
