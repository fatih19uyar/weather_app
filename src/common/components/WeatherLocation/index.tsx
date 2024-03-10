import React from "react";
import { styled } from 'nativewind';
import { Text } from "react-native";
import { WeatherLocationProps } from "./type";

const StyledText = styled(Text);

const WeatherLocation: React.FC<WeatherLocationProps> = ({ weatherRes }) => {
  return (
    <StyledText className="text-white text-center text-2xl font-bold">
      {weatherRes?.name}
      <StyledText className="text-lg font-semibold text-gray-300">
         {weatherRes?.sys?.country}
      </StyledText>
    </StyledText>
  );
};

export default WeatherLocation;
