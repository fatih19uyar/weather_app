import axios, { AxiosError } from 'axios';
import useToastMessage from './useToastMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearAllLocalStorage } from './useLocalStorage';
import config from '../../../config';
import { ErrorResponse } from '../../types/type';

const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_KEY!);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from AsyncStorage:', error);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

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

export default axiosInstance;
