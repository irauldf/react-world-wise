import type { City, CreateCityRequest } from "../city.types";
import type { ReactNode } from "react";

export interface CitiesContextType {
  cities: City[];
  isLoadingCities: boolean;

  currentCity: City | null;
  isLoadingCity: boolean;

  geocoding: Geocoding | null;
  isLoadingGeocoding: boolean;

  isCreatingCity: boolean;
  isDeletingCity: boolean;

  errorMessage: string;
  mapPosition: [number, number];

  getCity: (id: number) => Promise<void>;
  getCityFromPosition: (lat: number, lng: number) => Promise<void>;
  setMapPosition(position: [number, number]): void;
  createCity: (newCity: CreateCityRequest) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
}

export interface CitiesProviderProps {
  children: ReactNode;
}

export interface Geocoding {
  locality: string;
  country: string;
  country_code: string;
  emoji: string;
}
