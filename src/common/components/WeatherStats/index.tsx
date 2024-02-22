import React from "react";
import { WeatherStatsProps } from "./type";
import { styled } from 'nativewind';
import { Image, Text, View } from "react-native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const WeatherStats: React.FC<WeatherStatsProps> = ({ weatherRes , sunriseTimeString }) => {
  if (!weatherRes) return null;
  const { wind, main } = weatherRes;
  return (
    <StyledView className="flex-row justify-between mx-4">
      {/* Wind */}
      <StyledView className="flex-row space-x-2 items-center">
        <StyledImage
          source={require('../../../assets/icons/wind.png')}
          className="w-6 h-6"
        />
        <StyledText className="text-white font-semibold text-base">
          {wind.speed}km
        </StyledText>
      </StyledView>
      {/* Humidity */}
      <StyledView className="flex-row space-x-2 items-center">
        <StyledImage
          source={require('../../../assets/icons/drop.png')}
          className="w-6 h-6"
        />
        <StyledText className="text-white font-semibold text-base">
          {main.humidity}%
        </StyledText>
      </StyledView>
      {/* Sunrise */}
      <StyledView className="flex-row space-x-2 items-center">
        <StyledImage
          source={require('../../../assets/icons/sun.png')}
          className="w-6 h-6"
        />
        <StyledText className="text-white font-semibold text-base">
          {sunriseTimeString}
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default WeatherStats;
