import { RefObject } from "react";
import { LocationSearchResponse } from "../../services/weather/type";
import { TextInput } from "react-native";

export interface SearchBarProps {
    showSearch: boolean;
    toggleSearch: (show: boolean) => void;
    handleTextDebounce: (text: string) => void;
    cities: LocationSearchResponse[];
    handleLocation: (name: string, lat: number, lon: number) => void;
    getCurrentLocation: () => void;
    inputRef: RefObject<TextInput>;
}
