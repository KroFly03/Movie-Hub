import API from './api';

export const getGenres = () => API.get(`/genres/`);
export const getGenre = (id) => API.get(`/genres/${id}`);
