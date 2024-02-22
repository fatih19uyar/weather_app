export interface WeatherLocationProps {
    weatherRes: {
      name: string;
      sys: {
        country: string;
      };
    } | null;
  }