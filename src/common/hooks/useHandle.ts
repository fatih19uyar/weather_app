import {useEffect, useState} from 'react';
import {useGeolocation} from './useLocations';
import useToastMessage from './useToastMessage';
import {
  getLocationsEndpointByCityName,
  getWeatherByLocation,
} from '../services/weather';
import {
  FetchWeatherResponse,
  LocationSearchResponse,
} from '../services/weather/type';
import {setLocalStorage} from './useLocalStorage';

export default function useHandle() {
  const {showToast} = useToastMessage();
  const current = useGeolocation();
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState({} as LocationSearchResponse);
  const [weatherRes, setWeeatherRes] = useState({} as FetchWeatherResponse);
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
        setWeeatherRes(res);
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    if (current[1] && typeof current[1].latitude === 'number') {
        
      setCurrentLocation({
        latitude: current[1].latitude,
        longitude: current[1].longitude,
      });
      setLocalStorage('city', JSON.stringify(current[1]));
    }
  }, []);

  return {
    getLocationsByCityName,
    setCurrentLocation,
    currentLocation,
    getLocation,
    setLoading,
    getWeather,
    weatherRes,
    loading,
    cities,
  };
}
