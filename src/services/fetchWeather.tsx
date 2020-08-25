import axios from 'axios';

const URL : string = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY : string = '467769210294e86dc2741d9a46646dd6';

// Function return type not defined

export const fetchWeather = async(query:string):Promise<WeatherData> => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY
        }
    })
    const result:WeatherData = {
        city: data.name,
        country: data.sys.country,
        discription: data.weather[0].description,
        iconName: data.weather[0].icon,
        temp: data.main.temp,
    }
    return result;
}