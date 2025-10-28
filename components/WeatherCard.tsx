"use client";
import React, { useEffect, useState } from "react";
import { fetchWeatherByCoords, getCoordsFromCountry } from "@/api/weather";
import { Spinner } from "./ui/spinner";
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
      setError(e instanceof Error ? e.message : "Kunde inte hämta väder.");
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
      setError("Ingen position angiven för väder.");
      setLoading(false);
    }
  }, [lat, lon, country]);

  if (loading) return <Spinner />;

  if (error)
    return (
      <div className="p-3 border rounded">
        <p className="text-sm text-red-600">{error}</p>
        <Button
          className="mt-2 px-3 py-1 bg-sky-600 text-white rounded"
          onClick={() => load(lat, lon, country)}
          aria-label="Försök igen"
        >
          Försök igen
        </Button>
      </div>
    );

  if (!data) return null;

  const current = data.current_weather;
  const daily = data.daily;
  // const pos = (() => {
  //   if (country) {
  //     const c = getCoordsFromCountry(country);
  //     return c ? `${c.lat.toFixed(3)}, ${c.lon.toFixed(3)}` : "";
  //   }
  //   return `${(lat ?? 0).toFixed(3)}, ${(lon ?? 0).toFixed(3)}`;
  // })();

  return (
    <div className="p-3 border rounded" aria-live="polite">
      <div className="mt-2">
        <div className="text-lg font-semibold">
          {current?.temperature ?? "—"}°C
        </div>
        <div className="text-sm">Vind: {current?.windspeed ?? "—"} m/s</div>
      </div>

      {daily && (
        <div className="mt-3 text-sm">
          <div>Max idag: {daily.temperature_2m_max?.[0]}°C</div>
          <div>Min idag: {daily.temperature_2m_min?.[0]}°C</div>
        </div>
      )}
    </div>
  );
}
