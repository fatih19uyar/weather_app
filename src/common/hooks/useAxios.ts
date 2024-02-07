import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import config from "../../../config";

interface ForecastParams {
    cityName: string;
    days: number;
}

interface LocationParams {
    cityName: string;
}

interface ApiResponse {

}

interface ErrorType {
    message: string;
    // statusCode: number;
}

const useAxios = (endpoint: string) => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse<any> = await axios.get(endpoint);
                setData(response.data);
            } catch (error) {
                const err = error as ErrorType;
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [endpoint]);

    return { data, loading, error };
};

export const useWeatherForecast = (params: ForecastParams) => {
    const forecastEndpoint = `${config.BASE_URL}forecast.json?key=${config.apiKey}&q=${params.cityName}&days=${params.days}`;
    return useAxios(forecastEndpoint);
};

export const useLocations = (params: LocationParams) => {
    const locationsEndpoint = `${config.BASE_URL}search.json?key=${config.apiKey}&q=${params.cityName}`;
    return useAxios(locationsEndpoint);
};
