import axios from './axiosInstance';

export const getAllProblems = () => axios.get('/problems');
export const getProblem = (id) => axios.get(`/problems/${id}`);
export const createProblem = (problemData) => axios.post('/problems', problemData);
export const getProblemsByCreator = (username) => axios.get(`/problems/creator/${username}`);
