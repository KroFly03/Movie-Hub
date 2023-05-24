import API from './api';

export const getUser = () => API.get(`/user/`);
export const updateUser = (data) => API.patch(`/user/`, data);
export const updateUserPassword = (data) => API.put(`/user/password`, data);

export const getFavorites = () => API.get(`/favourites/movies/`);
export const setFavorites = (movie_id) => API.post(`/favourites/movies/${movie_id}`);
export const deleteFavorites = (movie_id) => API.delete(`/favourites/movies/${movie_id}`);