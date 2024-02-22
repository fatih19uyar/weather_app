import { ForecastData, WeatherForecast } from "./type";

export const kelvinToCelsius = (kelvin: number) => {
  return kelvin - 273.15; // Kelvin'i Celsius'a dönüştürmek için 273.15 çıkarılır
};

export const calculateSunRiseTime = (time: number) => {
  const sunriseDate = time ? new Date(time * 1000) : null;
  const sunriseTimeString = sunriseDate
    ? sunriseDate.toLocaleTimeString()
    : 'Bilinmiyor';
  return sunriseTimeString;
};

export const processWeatherForecast = (forecast: WeatherForecast) => {
  const dailyForecasts: ForecastData[] = [];
  // İlk tahmini alarak her gün için bir tahmin oluştur
  const dailyForecastMap: Map<string, ForecastData> = new Map();
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toDateString();
    // Eğer bu günün ilk tahmini zaten varsa, minimum sıcaklık değerini güncelle
    if (dailyForecastMap.has(dayKey)) {
      const existingForecast = dailyForecastMap.get(dayKey)!;
      if (item.dt < existingForecast.dt) {
        dailyForecastMap.set(dayKey, item);
      }
    } else {
      dailyForecastMap.set(dayKey, item);
    }
  });
  // Map'ten günlük tahminleri al
  dailyForecastMap.forEach((value) => {
    dailyForecasts.push(value);
  });

  return dailyForecasts;
};