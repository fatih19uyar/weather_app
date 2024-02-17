import {AxiosError} from 'axios';
import axiosInstance from '../../hooks/useAxios';
import useToastMessage from '../../hooks/useToastMessage';
import {ErrorResponse} from '../../../types/type';
import {
  FetchWeatherAPIRequest,
  FetchWeatherResponse,
  LocationSearchParams,
  LocationSearchResponse,
} from './type';

export const forecastEndpoint = async (
  request: FetchWeatherAPIRequest,
): Promise<FetchWeatherResponse | undefined> => {
  const {showToast} = useToastMessage();
  try {
    const response = await axiosInstance.get<FetchWeatherResponse>(
      'forecast.json',
      {
        params: request,
      },
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    showToast({type: 'error', text1: 'Bir hata oluştu. forecast'});
  }
};

export const locationsEndpoint = async (
  request: LocationSearchParams,
): Promise<LocationSearchResponse | undefined> => {
  const {showToast} = useToastMessage();
  try {
    const response = await axiosInstance.get<LocationSearchResponse>(
      'search.json',
      {
        params: request,
      },
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    showToast({type: 'error', text1: 'Bir hata oluştu. search'});
  }
};
