import axios from './axiosInstance';

export const getPlayer = (username) => axios.get(`/players/${username}`);
export const createPlayer = (data) => axios.post('/players', data);
export const getAllPlayers = () => axios.get('/players');
