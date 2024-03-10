import { LocationSearchResponse } from "../../services/weather/type";

export interface SearchBarProps {
    showSearch: boolean;
    toggleSearch: (show: boolean) => void;
    handleTextDebounce: (text: string) => void;
    cities: LocationSearchResponse[];
    handleLocation: (name: string, lat: number, lon: number) => void;
}
