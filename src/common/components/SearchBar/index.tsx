import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {MagnifyingGlassIcon, MapIcon, XMarkIcon} from 'react-native-heroicons/outline';
import {LocationSearchResponse} from '../../services/weather/type';
import {styled} from 'nativewind';
import {MapPinIcon} from 'react-native-heroicons/solid';
import {theme} from '../../themes/theme';
import {SearchBarProps} from './type';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

const SearchBar: React.FC<SearchBarProps> = ({
  showSearch,
  toggleSearch,
  handleTextDebounce,
  cities,
  handleLocation,
  getCurrentLocation
}) => {
  return (
    <StyledView style={{height: '7%'}} className="mx-4 relative z-50">
      <StyledView
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          borderRadius: showSearch ? 25 : 0,
          backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
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
       {!showSearch ? <StyledTouchableOpacity
          onPress={getCurrentLocation}
          className="rounded-full p-3 m-1"
          style={{backgroundColor: theme.bgWhite(0.3)}}>
            <MapPinIcon size={25} color="white" />
        </StyledTouchableOpacity>: null}
      </StyledView>
      {cities.length > 0 && showSearch ? (
        <StyledView className="absolute w-full bg-gray-300 top-16 rounded-3xl ">
          {cities.map((loc: LocationSearchResponse, index: number) => {
            let showBorder = index + 1 != cities.length;
            let borderClass = showBorder ? ' border-b-2 border-b-gray-400' : '';
            return (
              <StyledTouchableOpacity
                key={index}
                onPress={() => handleLocation(loc.name, loc.lat, loc.lon)}
                className={
                  'flex-row items-center border-0 p-3 px-4 mb-1 ' + borderClass
                }>
                <MapPinIcon size={20} color="gray" />
                <StyledText className="text-black text-lg ml-2 font-bold">
                  {loc?.name + ','}
                </StyledText>
                <StyledText className="text-black text-lg ml-2">
                  {loc.country}
                </StyledText>
              </StyledTouchableOpacity>
            );
          })}
        </StyledView>
      ) : null}
    </StyledView>
  );
};

export default SearchBar;
