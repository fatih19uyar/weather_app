import React from 'react';
import {styled} from 'nativewind';
import {Image, ScrollView, Text, View} from 'react-native';
import {WeatherForecastProps} from './type';
import {CalendarDaysIcon} from 'react-native-heroicons/outline';
import {weatherImages} from '../../../constants';
import {theme} from '../../themes/theme';
import {kelvinToCelsius} from '../../utils';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const WeatherForecast: React.FC<WeatherForecastProps> = ({forecastData}) => {
  if (!forecastData) return null;
  return (
    <StyledView className="mb-2 space-y-3">
      <StyledView className="flex-row items-center mx-5 space-x-2">
        <CalendarDaysIcon size={22} color="white" />
        <StyledText className="text-white text-base">Daily forecast</StyledText>
      </StyledView>
      <ScrollView
        horizontal
        contentContainerStyle={{paddingHorizontal: 15}}
        showsHorizontalScrollIndicator={false}>
        {forecastData?.map((dayForecast, index) => {
          const date = new Date(dayForecast.dt * 1000);
          const options: Intl.DateTimeFormatOptions = {weekday: 'long'};
          let dayName = date.toLocaleDateString('en-US', options);
          dayName = dayName.split(',')[0];
          const weatherCondition = dayForecast.weather[0].description;
          const weatherImageKey = Object.keys(weatherImages).find(
            key => key.toLowerCase() === weatherCondition.toLowerCase(),
          );

          return (
            <StyledView
              key={index}
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{backgroundColor: theme.bgWhite(0.15)}}>
              <StyledImage
                source={weatherImages[weatherImageKey || 'other']}
                className="w-11 h-11"
              />
              <StyledText className="text-white">{dayName}</StyledText>
              <StyledText className="text-white text-xl font-semibold">
                {kelvinToCelsius(dayForecast?.main?.temp).toFixed(2)}&#176;
              </StyledText>
            </StyledView>
          );
        })}
      </ScrollView>
    </StyledView>
  );
};

export default WeatherForecast;
