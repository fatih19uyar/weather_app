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
