/**
 * WeatherCard Component
 *
 * Displays current weather information for a country or specific coordinates.
 * Fetches data from Open-Meteo API and shows temperature, humidity, wind speed, and direction.
 * Includes loading states, error handling, and retry functionality.
 */

"use client";
import React, { useEffect, useState } from "react";
import { fetchWeatherByCoords, getCoordsFromCountry } from "@/api/weather";
import { Loading } from "./Loading";
import { Button } from "./ui/button";
import { Country } from "@/types/country";
import { WeatherData } from "@/types/weather";

export default function WeatherCard({
  lat,
  lon,
  country,
}: {
  lat?: number;
  lon?: number;
  country?: Country;
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async (
    useLat?: number,
    useLon?: number,
    useCountry?: Country
  ) => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (useCountry) {
        const coords = getCoordsFromCountry(useCountry);
        if (!coords) throw new Error("Inga koordinater för landet");
        result = await fetchWeatherByCoords(coords.lat, coords.lon);
      } else if (typeof useLat === "number" && typeof useLon === "number") {
        result = await fetchWeatherByCoords(useLat, useLon);
      } else {
        throw new Error("Ingen position angiven");
      }
      setData(result);
    } catch (e: unknown) {
      setError(
        e instanceof Error ? e.message : "Could not fetch weather data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (country) {
      load(undefined, undefined, country);
    } else if (typeof lat === "number" && typeof lon === "number") {
      load(lat, lon, undefined);
    } else {
      setError("No location provided for weather data.");
      setLoading(false);
    }
  }, [lat, lon, country]);

  if (loading) return <Loading message="Loading weather data..." size="sm" />;

  if (error)
    return (
      <div className="p-3 border rounded">
        <p className="text-sm text-red-600">{error}</p>
        <Button
          className="mt-2 px-3 py-1 bg-sky-600 text-white rounded"
          onClick={() => load(lat, lon, country)}
          aria-label="Try again"
        >
          Try again
        </Button>
      </div>
    );

  if (!data) return null;

  const current = data.current_weather;
  const daily = data.daily;

  return (
    <div className="p-3 border rounded" aria-live="polite">
      <div className="mt-2">
        <div className="text-lg font-semibold">
          {current?.temperature ?? "—"}°C
        </div>
        <div className="text-sm">Wind: {current?.windspeed ?? "—"} m/s</div>
      </div>

      {daily && (
        <div className="mt-3 text-sm">
          <div>Max today: {daily.temperature_2m_max?.[0]}°C</div>
          <div>Min today: {daily.temperature_2m_min?.[0]}°C</div>
        </div>
      )}
    </div>
  );
}
