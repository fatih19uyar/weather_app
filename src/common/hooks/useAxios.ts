import axios, { AxiosError } from 'axios';
import useToastMessage from './useToastMessage';
import { clearAllLocalStorage } from './useLocalStorage';
import config from '../../../config';
import { ErrorResponse } from '../../types/type';

const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
});

axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error: AxiosError) => {
    const { showToast } = useToastMessage(); 

    if (error.response?.status === 401) {
      showToast({type:'error',text1: 'Api key failed'});
    }
     else if ((error.response?.data as ErrorResponse).error.code === 2008) {
      await clearAllLocalStorage(); 
      showToast({type:'error',text1: 'Api key failed'});
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export  {axiosInstance};

