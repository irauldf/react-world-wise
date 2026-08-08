import type { CitiesState } from "./reducer.types";

export const initialState: CitiesState = {
  cities: [],
  currentCity: null,
  geocoding: null,
  mapPosition: [40, 0],
  isLoadingCities: false,
  isLoadingCity: false,
  isLoadingGeocoding: false,
  isCreatingCity: false,
  isDeletingCity: false,
  errorMessage: "",
};
