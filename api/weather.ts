/**
 * Weather API Functions
 *
 * Integrates with Open-Meteo API to fetch weather data for specific coordinates.
 * Provides current weather information and helper functions for coordinate extraction.
 * Includes error handling and data transformation for weather display.
 */
import { Country } from "@/types/country";
import { WeatherData } from "@/types/weather";

export function getCoordsFromCountry(
  country: Country
): { lat: number; lon: number } | null {
  if (!country) return null;
  if (country.capitalInfo?.latlng && country.capitalInfo.latlng.length === 2) {
    return {
      lat: country.capitalInfo.latlng[0],
      lon: country.capitalInfo.latlng[1],
    };
  }
  if (country.latlng && country.latlng.length === 2) {
    return { lat: country.latlng[0], lon: country.latlng[1] };
  }
  return null;
}

export async function fetchWeatherByCoords(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(
    lat
  )}&longitude=${encodeURIComponent(
    lon
  )}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather API error");
  return res.json();
}

export async function fetchWeatherForCountry(
  country: Country
): Promise<WeatherData> {
  const coords = getCoordsFromCountry(country);
  if (!coords) throw new Error("Inga koordinater tillgängliga för landet");
  return fetchWeatherByCoords(coords.lat, coords.lon);
}
