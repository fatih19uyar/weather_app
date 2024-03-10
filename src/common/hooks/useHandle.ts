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
  LocationSearchResponse,
} from '../services/weather/type';
import {getLocalStorageItem, setLocalStorage} from './useLocalStorage';
import {processWeatherForecast} from '../utils';
import {ForecastData} from '../utils/type';

export default function useHandle() {
  const {showToast} = useToastMessage();
  const [error, position, refresh] = useGeolocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [showSearch, toggleSearch] = useState<boolean>(false);
  const [cities, setCities] = useState<LocationSearchResponse[]>([]);
  const [selectedCity, setSelectedCity] = useState<{
    name?: string;
    lat?: number;
    lon?: number;
  }>({});
  const [weatherRes, setWeatherRes] = useState({} as FetchWeatherResponse);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const getLocation = () => {
    if (position && typeof position.latitude === 'number') {
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
      const filteredCities = res?.filter(
        (location, index, self) =>
          index === self.findIndex(t => t.name === location.name),
      );

      setCities(filteredCities ?? []);
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
      getForecastData(lat,lon);
    } catch (error) {
      setWeatherRes({} as FetchWeatherResponse);
      console.log('err', error);
    }
  };

  const getForecastData = async (lat: number, lon: number) => {
    try {
      const res = await getForecastByCoordinates({lat, lon});
      if (res !== undefined) {
        setForecastData(processWeatherForecast(res));
      }
    } catch (error) {
      setForecastData([]);
      console.log('err', error);
    }
  };

  const fetchMyWeatherData = async () => {
    setLoading(true);
    let myCity: {latitude: number; longitude: number} | null = null;

    const cityString: string | null = await getLocalStorageItem('city');
    if (cityString) {
      try {
        const cityObj = JSON.parse(cityString);
        if (typeof cityObj === 'object' && cityObj !== null) {
          const {latitude, longitude} = cityObj;
          if (typeof latitude === 'number' && typeof longitude === 'number') {
            myCity = {latitude, longitude};
          }
        }
      } catch (error) {
        console.error('Error parsing city data:', error);
      }
    }
    if (myCity !== null) {
      getWeather(myCity.latitude, myCity.longitude);
    } else {
      getLocation();
    }
    setLoading(false);
  };

  const handleSearch = (search: string) => {
    if (search && search.length > 2) {
      getLocationsByCityName(search);
    }
  };

  const handleLocation = async (name: string, lat: number, lon: number) => {
    setSelectedCity({name: name, lat: lat, lon: lon});
    toggleSearch(false);
    setCities([]);
  };

  const handleCurrentLocation = () => {
    refresh();
    getWeather(position.latitude,position.longitude);
  };

  useEffect(() => {
    if (selectedCity && selectedCity.lat && selectedCity.lon)
      getWeather(selectedCity.lat, selectedCity.lon);
  }, [selectedCity]);

  useEffect(() => {
    !showSearch && cities.length > 0 ? setCities([]) : null;
  }, [showSearch]);

  useEffect(() => {
    if (position.latitude && typeof position.latitude === 'number') {
      setCurrentLocation({
        latitude: position.latitude,
        longitude: position.longitude,
      });
      setLocalStorage('city', JSON.stringify({
        latitude: position.latitude,
        longitude: position.longitude,
      }));
      getForecastData(position.latitude, position.longitude);
    }
    fetchMyWeatherData();
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
    showSearch,
    toggleSearch,
    setCities,
    handleLocation,
    handleSearch,
    handleCurrentLocation,
  };
}
