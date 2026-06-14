import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getInfo = (city) => {
  return axios.get(`${baseUrl}?q=${city}&appid=${api_key}&units=metric`);
};

export default { getInfo };
