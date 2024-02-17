import {AxiosError} from 'axios';
import axiosInstance from '../../hooks/useAxios';
import {ErrorResponse} from '../../../types/type';
import {
  FetchWeatherAPIRequest,
  FetchWeatherResponse,
  LocationSearchParams,
  LocationSearchResponse,
} from './type';
import config from '../../../../config';

export const forecastEndpoint = async (
  request: FetchWeatherAPIRequest,
): Promise<FetchWeatherResponse | undefined> => {

  try {
    const { q, days } = request;
    const response = await axiosInstance.get<FetchWeatherResponse>(
      `forecast.json?q=${encodeURIComponent(q)}&days=${days}&key=${config.apiKey}`,
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    throw err;
  }
};


export const locationsEndpoint = async (
  request: LocationSearchParams,
): Promise<LocationSearchResponse | undefined> => {
  try {
    const { cityName } = request;
    const response = await axiosInstance.get<LocationSearchResponse>(
      `search.json?q=${encodeURIComponent(cityName)}&key=${config.apiKey}`,
    ); 
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    throw err;
  }
};