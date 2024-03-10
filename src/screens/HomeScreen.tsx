import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MagnifyingGlassIcon, XMarkIcon} from 'react-native-heroicons/outline';
import { MapPinIcon} from 'react-native-heroicons/solid';
import {debounce} from 'lodash';
import * as Progress from 'react-native-progress';
import {StatusBar} from 'expo-status-bar';
import {theme} from '../common/themes/theme';
import {styled} from 'nativewind';
import {LocationSearchResponse} from '../common/services/weather/type';
import useHandle from '../common/hooks/useHandle';
import {calculateSunRiseTime} from '../common/utils';
import WeatherStatus from '../common/components/WeatherStatus';
import WeatherLocation from '../common/components/WeatherLocation';
import WeatherStats from '../common/components/WeatherStats';
import WeatherForecast from '../common/components/WeatherForecast';

const StyledSafeArea = styled(SafeAreaView);
const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

export default function HomeScreen() {
  const {
    cities,
    weatherRes,
    loading,
    forecastData,
    toggleSearch,
    showSearch,
    handleLocation,
    handleSearch,
  } = useHandle();

  const handleTextDebounce = useCallback(debounce(handleSearch, 300), []);

  return (
    <StyledView className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require('../assets/images/bg.png')}
        style={{position: 'absolute', width: '100%', height: '100%'}}
      />
      {loading ? (
        <StyledView className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </StyledView>
      ) : (
        <StyledSafeArea className="flex flex-1">
          {/* search section */}
          <StyledView style={{height: '7%'}} className="mx-4 relative z-50">
            <StyledView
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderRadius: showSearch ? 25 : 0,
                backgroundColor: showSearch
                  ? theme.bgWhite(0.2)
                  : 'transparent',
              }}>
              {showSearch ? (
                <StyledTextInput
                  className="pl-6 h-10 pb-1 flex-1 text-base text-white"
                  onChangeText={handleTextDebounce}
                  placeholder="Search city"
                  placeholderTextColor={'lightgray'}
                />
              ) : null}
              <StyledTouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                className="rounded-full p-3 m-1"
                style={{backgroundColor: theme.bgWhite(0.3)}}>
                {showSearch ? (
                  <XMarkIcon size={25} color="white" />
                ) : (
                  <MagnifyingGlassIcon size={25} color="white" />
                )}
              </StyledTouchableOpacity>
            </StyledView>
            {cities.length > 0 && showSearch ? (
              <StyledView className="absolute w-full bg-gray-300 top-16 rounded-3xl ">
                {cities.map((loc: LocationSearchResponse, index: number) => {
                  let showBorder = index + 1 != cities.length;
                  let borderClass = showBorder
                    ? ' border-b-2 border-b-gray-400'
                    : '';
                  return (
                    <StyledTouchableOpacity
                      key={index}
                      onPress={() => handleLocation(loc)}
                      className={
                        'flex-row items-center border-0 p-3 px-4 mb-1 ' +
                        borderClass
                      }>
                      <MapPinIcon size={20} color="gray" />
                      <StyledText className="text-black text-lg ml-2">
                        {loc?.name}, {loc.country}
                      </StyledText>
                    </StyledTouchableOpacity>
                  );
                })}
              </StyledView>
            ) : null}
          </StyledView>

          {/* forecast section */}
          <StyledView className="mx-4 flex justify-around flex-1 mb-2">
            <WeatherLocation weatherRes={weatherRes} />
            <WeatherStatus weatherRes={weatherRes} />
            <WeatherStats weatherRes={weatherRes} sunriseTimeString={calculateSunRiseTime(weatherRes?.sys?.sunrise)} />
          </StyledView>
          <WeatherForecast forecastData={forecastData ?? []} />
        </StyledSafeArea>
      )}
    </StyledView>
  );
}
