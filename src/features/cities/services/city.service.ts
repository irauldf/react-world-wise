import type { City, CreateCityRequest } from "../city.types";

const BASE_URL = "http://localhost:8000";

export async function getCities(signal: AbortSignal): Promise<City[]> {
  const URL = `${BASE_URL}/cities`;
  const resp = await fetch(URL, { signal });

  if (!resp.ok) {
    throw new Error("Something went wrong while fetching cities");
  }

  const data = await resp.json();

  if (!data) {
    throw new Error("No data found");
  } else if (!data.length) {
    throw new Error("Add your first city by clicking on a city on the map.");
  }

  return data;
}

export async function getCity(id: number, signal: AbortSignal): Promise<City> {
  const URL = `${BASE_URL}/cities/${id}`;
  const resp = await fetch(URL, { signal });

  if (!resp.ok) {
    throw new Error("Something went wrong while fetching the city");
  }

  const data = await resp.json();

  if (!data) {
    throw new Error("No data found");
  }

  return data;
}

export async function getCityFromPosition(
  lat: number,
  lng: number,
  signal: AbortSignal,
) {
  const URL = "https://nominatim.openstreetmap.org/reverse";

  const searchParams = new URLSearchParams({
    lat: lat.toString(),
    lon: lng.toString(),
    format: "jsonv2",
  });

  const resp = await fetch(`${URL}?${searchParams.toString()}`, { signal });

  if (!resp.ok) {
    throw new Error("Something went wrong while fetching the city");
  }

  const data = await resp.json();

  if (!data) {
    throw new Error("No data found");
  }

  return data;
}

export async function createCity(
  newCity: CreateCityRequest,
  signal: AbortSignal,
) {
  const URL = `${BASE_URL}/cities`;

  const resp = await fetch(URL, {
    signal,
    method: "POST",
    body: JSON.stringify(newCity),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!resp.ok) {
    throw new Error("Something went wrong while creating the city");
  }

  const data = await resp.json();

  if (!data) {
    throw new Error("No data was retrieved after saving.");
  }

  return data;
}

export async function deleteCity(id: number, signal: AbortSignal) {
  const URL = `${BASE_URL}/cities/${id}`;

  const resp = await fetch(URL, {
    signal,
    method: "DELETE",
  });

  if (!resp.ok) {
    throw new Error("Something went wrong while deleting the city");
  }

  return resp.ok;
}
