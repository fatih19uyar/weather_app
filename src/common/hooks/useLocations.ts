import { useState, useEffect } from "react";
import Geolocation, { GeolocationError, GeolocationResponse } from "@react-native-community/geolocation";

interface GeolocationData {
  latitude: number;
  longitude: number;
}

export const useGeolocation = (): [string, GeolocationData, () => void] => {
  const [error, setError] = useState<string>('');
  const [position, setPosition] = useState<GeolocationData>({
    latitude: 0,
    longitude: 0
  });

  const refresh = () => {
    Geolocation.getCurrentPosition(
      (pos: GeolocationResponse) => {
        setError('');
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      (e: GeolocationError) => setError(e.message)
    );
  };

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      (pos: GeolocationResponse) => {
        setError('');
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      (e: GeolocationError) => setError(e.message)
    );
    return () => Geolocation.clearWatch(watchId);
  }, []);

  return [error, position, refresh];
};