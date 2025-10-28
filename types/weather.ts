export interface WeatherData {
  current_weather: {
    temperature: number;
    windspeed: number;
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}