import React from 'react';
import {WeatherStatusProps} from './type';
import {styled} from 'nativewind';
import {Image, Text, View} from 'react-native';
import weatherImages from '../../../constants/images';
import {kelvinToCelsius} from '../../utils';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const WeatherStatus: React.FC<WeatherStatusProps> = ({
  weatherRes,
  keyboardStatus,
}) => {
  const description = weatherRes?.weather?.[0]?.description;
  return (
    <>
      {keyboardStatus ? null : (
        <StyledView className="flex-row justify-center">
          <StyledImage
            source={
              description !== undefined
                ? weatherImages[description]
                : weatherImages['other']
            }
            className="w-52 h-52"
          />
        </StyledView>
      )}
      <StyledView className="space-y-2">
        <StyledText className="text-center font-bold text-white text-6xl ml-5 ">
          {weatherRes &&
            weatherRes.main &&
            weatherRes.main.temp &&
            kelvinToCelsius(weatherRes.main.temp).toFixed(2)}
          &#176;
        </StyledText>
        <StyledText className="text-center text-white text-xl tracking-widest capitalize">
          {weatherRes &&
            weatherRes.weather &&
            weatherRes.weather[0] &&
            weatherRes.weather[0].description}
        </StyledText>
      </StyledView>
    </>
  );
};

export default WeatherStatus;
