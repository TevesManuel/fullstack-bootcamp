const APIKEY="NULL"
const OPENWEATHER_URL      = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lat={lat}&lon={lon}&appid={APIKEY}'
const OPENWEATHER_ICON_URL = 'https://openweathermap.org/img/wn/{icon}@2x.png'

import axios from 'axios';

const getWeather = (lat, lon) => {
    return axios.get(OPENWEATHER_URL.replace('{lat}', lat).replace("{lon}", lon).replace('{APIKEY}', APIKEY)).then(response => {
        return {
            temperature: response.data.main.temp,
            url_weather_icon: OPENWEATHER_ICON_URL.replace('{icon}', response.data.weather[0].icon),
            wind_vel: response.data.wind.speed,
        }
    });
};

export default {
    getWeather,
};