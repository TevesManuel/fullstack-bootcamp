import { useState, useEffect } from "react";
import WeatherService from "../services/WeatherService";

const WeatherDisplay = ({countryData}) => {
    
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        WeatherService.getWeather(countryData.latlng[0], countryData.latlng[1])
            .then(respWeatherData => setWeatherData(respWeatherData));
    }, [countryData]);   

    if(weatherData != null)
    {
        console.log(weatherData)
        return (
            <div>
                <h5>Temperature: {weatherData.temperature}</h5>
                <img src={weatherData.url_weather_icon}></img>
                <h6>Wind velocity: {weatherData.wind_vel}m/s</h6>
            </div>
        );
    }
    return(
        <div>
            <p>Fetching weather data...</p>
        </div>
    );
};

export default WeatherDisplay;