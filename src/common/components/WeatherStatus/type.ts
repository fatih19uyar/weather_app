export interface WeatherStatusProps {
    weatherRes: {
      main?: {
        temp?: number;
      };
      weather?: {
        description?: string;
      }[];
    };
    keyboardStatus: boolean
  }