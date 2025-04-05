import axiosInstance from './axiosInstance';

export const solveBoard = async (board) => {
  const response = await axiosInstance.post('/api/solver', { board });
  return response.data;
};