import {View, Image} from 'react-native';
import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {debounce} from 'lodash';
import * as Progress from 'react-native-progress';
import {StatusBar} from 'expo-status-bar';
import {styled} from 'nativewind';
import useHandle from '../common/hooks/useHandle';
import {calculateSunRiseTime} from '../common/utils';
import WeatherStatus from '../common/components/WeatherStatus';
import WeatherLocation from '../common/components/WeatherLocation';
import WeatherStats from '../common/components/WeatherStats';
import WeatherForecast from '../common/components/WeatherForecast';
import SearchBar from '../common/components/SearchBar';

const StyledSafeArea = styled(SafeAreaView);
const StyledView = styled(View);

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
    handleCurrentLocation
  } = useHandle();

  const handleTextDebounce = useCallback(debounce(handleSearch, 600), []);

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
          <SearchBar
            showSearch={showSearch}
            toggleSearch={toggleSearch}
            handleTextDebounce={handleTextDebounce}
            cities={cities}
            handleLocation={handleLocation}
            getCurrentLocation={handleCurrentLocation}
          />
          {/* forecast section */}
          <StyledView className="mx-4 flex justify-around flex-1 mb-2">
            <WeatherLocation weatherRes={weatherRes} />
            <WeatherStatus weatherRes={weatherRes} />
            <WeatherStats
              weatherRes={weatherRes}
              sunriseTimeString={calculateSunRiseTime(weatherRes?.sys?.sunrise)}
            />
          </StyledView>
          <WeatherForecast forecastData={forecastData ?? []} />
        </StyledSafeArea>
      )}
    </StyledView>
  );
}
