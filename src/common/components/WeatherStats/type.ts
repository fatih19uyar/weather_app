export interface WeatherStatsProps {
  weatherRes: {
    wind: {
      speed: number;
    };
    main: {
      humidity: number;
    };
    sys: {
      sunrise: number;
    };
  } | null;
  sunriseTimeString: string;
}
