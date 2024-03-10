import axios, {AxiosError} from 'axios';
import {axiosInstance} from '../../hooks/useAxios';
import {ErrorResponse} from '../../../types/type';
import config from '../../../../config';
import {
  FetchWeatherAPIRequest,
  FetchWeatherResponse,
  ForecastRequestParams,
  ForecastResponse,
  LocationSearchParams,
  LocationSearchResponse,
} from './type';

export const getWeatherByLocation = async (
  request: FetchWeatherAPIRequest,
): Promise<FetchWeatherResponse | undefined> => {
  try {
    const {lat, lon} = request;
    const response = await axiosInstance.get<FetchWeatherResponse>(
      `data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.apiKey}`,
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    throw err;
  }
};

export const getLocationsEndpointByCityName = async (
  request: LocationSearchParams,
): Promise<LocationSearchResponse[] | undefined> => {
  try {
    const {cityName, limit = 5} = request;
    
    const response = await axiosInstance.get<LocationSearchResponse[]>(
      `geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${config.apiKey}`,
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    throw err;
  }
};

export const getForecastByCoordinates = async (
    request : ForecastRequestParams
): Promise<ForecastResponse | undefined> => {
  try {
    const {lat, lon} = request;
    const response = await axiosInstance.get<ForecastResponse>(
      `data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${config.apiKey}`,
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    throw err;
  }
};