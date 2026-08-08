import { CitiesActions } from "./actions";
import { type CitiesAction, type CitiesState } from "./reducer.types";

export function reducer(state: CitiesState, action: CitiesAction): CitiesState {
  switch (action.type) {
    case CitiesActions.LoadCitiesStarted:
      return { ...state, isLoadingCities: true, errorMessage: "", cities: [] };
    case CitiesActions.LoadCitiesSucceeded:
      return { ...state, isLoadingCities: false, cities: action.payload };
    case CitiesActions.LoadCitiesFailed:
      return { ...state, isLoadingCities: false, errorMessage: action.payload };

    case CitiesActions.LoadCityStarted:
      return {
        ...state,
        isLoadingCity: true,
        errorMessage: "",
        currentCity: null,
      };
    case CitiesActions.LoadCitySucceeded: {
      const { lat, lng } = action.payload.position;
      return {
        ...state,
        isLoadingCity: false,
        currentCity: action.payload,
        mapPosition: [lat, lng],
      };
    }
    case CitiesActions.LoadCityFailed:
      return { ...state, isLoadingCity: false, errorMessage: action.payload };

    case CitiesActions.CreateStarted:
      return { ...state, isCreatingCity: true, errorMessage: "" };
    case CitiesActions.CreateSucceeded:
      return {
        ...state,
        isCreatingCity: false,
        cities: [...state.cities, action.payload],
      };
    case CitiesActions.CreateFailed:
      return { ...state, isCreatingCity: false, errorMessage: action.payload };

    case CitiesActions.DeleteStarted:
      return { ...state, isDeletingCity: true, errorMessage: "" };
    case CitiesActions.DeleteSucceeded:
      return {
        ...state,
        isDeletingCity: false,
        cities: state.cities.filter((c) => c.id !== action.payload),
      };
    case CitiesActions.DeleteFailed:
      return { ...state, isDeletingCity: false, errorMessage: action.payload };

    case CitiesActions.GeocodingStarted:
      return {
        ...state,
        isLoadingGeocoding: true,
        geocoding: null,
        errorMessage: "",
      };
    case CitiesActions.GeocodingSucceeded:
      return { ...state, isLoadingGeocoding: false, geocoding: action.payload };
    case CitiesActions.GeocodingFailed:
      return {
        ...state,
        isLoadingGeocoding: false,

        errorMessage: action.payload,
      };

    case CitiesActions.MapMoved:
      return { ...state, mapPosition: action.payload };
  }
}
