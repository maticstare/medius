import axios from './axiosInstance';

export const createSolution = (solution) => axios.post('/solutions', solution);
export const getSolutionsByUser = (username) => axios.get(`/solutions/solver/${username}`);
export const getSolutionsForProblem = (id) => axios.get(`/solutions/problem/${id}`);
