import {useEffect, useState} from 'react';
import {useGeolocation} from './useLocations';
import useToastMessage from './useToastMessage';
import {
  getForecastByCoordinates,
  getLocationsEndpointByCityName,
  getWeatherByLocation,
} from '../services/weather';
import {
  FetchWeatherResponse,
  ForecastResponse,
  LocationSearchResponse,
} from '../services/weather/type';
import {setLocalStorage} from './useLocalStorage';
import { processWeatherForecast } from '../utils';
import { ForecastData, WeatherForecast } from '../utils/type';

export default function useHandle() {
  const {showToast} = useToastMessage();
  const current = useGeolocation();
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState({} as LocationSearchResponse);
  const [weatherRes, setWeatherRes] = useState({} as FetchWeatherResponse);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const getLocation = () => {
    if (current[1] && typeof current[1].latitude === 'number') {
      showToast({type: 'success', text1: 'Location updated.'});
    } else {
      showToast({
        type: 'error',
        text1: 'Latitude not available',
        text2: 'Please location check permission.',
      });
    }
  };

  const getLocationsByCityName = async (city: string) => {
    try {
      const res = await getLocationsEndpointByCityName({
        cityName: city,
      });
            if (res !== undefined) {
        setCities(res);
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  const getWeather = async (lat: number, lon: number) => {
    try {
      const res = await getWeatherByLocation({lat, lon});
      if (res !== undefined) {
        setWeatherRes(res);
      }
    } catch (error) {
      setWeatherRes({} as FetchWeatherResponse);
      console.log('err', error);
    }
  };
  const getForecastData = async (lat:number , lon : number) =>{
    try {
      const res = await getForecastByCoordinates({lat,lon});
      if (res !== undefined) {   
        setForecastData(processWeatherForecast(res));
      }
    } catch (error) {
      setForecastData([]);
      console.log('err', error);
    }
  }

  useEffect(() => {
    if (current[1] && typeof current[1].latitude === 'number') {
      setCurrentLocation({
        latitude: current[1].latitude,
        longitude: current[1].longitude,
      });
      setLocalStorage('city', JSON.stringify(current[1]));
      getForecastData(current[1].latitude, current[1].longitude);
    }
  }, []);

  return {
    getLocationsByCityName,
    setCurrentLocation,
    currentLocation,
    forecastData,
    getLocation,
    setLoading,
    getWeather,
    weatherRes,
    loading,
    cities,
  };
}
