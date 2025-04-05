import axios from './axiosInstance';

export const getAllSolutionSteps = () => axios.get('/solution_step');
export const getSolutionStepById = (id) => axios.get(`/solution_step/${id}`);
export const createSolutionStep = (solutionStep) => axios.post('/solution_step', solutionStep);