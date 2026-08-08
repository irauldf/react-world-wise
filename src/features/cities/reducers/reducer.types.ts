import type { City } from "../city.types";
import type { Geocoding } from "../context";
import type { CitiesActions } from "./actions";

export interface CitiesState {
  cities: City[];
  currentCity: City | null;
  geocoding: Geocoding | null;
  mapPosition: [number, number];
  isLoadingCities: boolean;
  isLoadingCity: boolean;
  isLoadingGeocoding: boolean;
  isCreatingCity: boolean;
  isDeletingCity: boolean;
  errorMessage: string;
}

export type CitiesAction =
  | { type: typeof CitiesActions.LoadCitiesStarted }
  | { type: typeof CitiesActions.LoadCitiesSucceeded; payload: City[] }
  | { type: typeof CitiesActions.LoadCitiesFailed; payload: string }
  | { type: typeof CitiesActions.LoadCityStarted }
  | { type: typeof CitiesActions.LoadCitySucceeded; payload: City }
  | { type: typeof CitiesActions.LoadCityFailed; payload: string }
  | { type: typeof CitiesActions.CreateStarted }
  | { type: typeof CitiesActions.CreateSucceeded; payload: City }
  | { type: typeof CitiesActions.CreateFailed; payload: string }
  | { type: typeof CitiesActions.DeleteStarted }
  | { type: typeof CitiesActions.DeleteSucceeded; payload: number }
  | { type: typeof CitiesActions.DeleteFailed; payload: string }
  | { type: typeof CitiesActions.GeocodingStarted }
  | { type: typeof CitiesActions.GeocodingSucceeded; payload: Geocoding }
  | { type: typeof CitiesActions.GeocodingFailed; payload: string }
  | { type: typeof CitiesActions.MapMoved; payload: [number, number] };
