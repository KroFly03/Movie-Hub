import API from './api';

export const getMovies = (query) => API.get(`/movies/${query ? "?" + query : ""}`);
export const getMovie = (id) => API.get(`/movies/${id}`);
