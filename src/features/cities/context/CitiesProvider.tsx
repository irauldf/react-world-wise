import { useCallback, useEffect, useReducer } from "react";
import type { CreateCityRequest } from "../city.types";
import { CitiesContext } from "./CitiesContext";
import * as cityService from "../services";
import { type CitiesProviderProps, type Geocoding } from "./context.types";
import { CitiesActions, initialState, reducer } from "../reducers";
import { convertToEmoji, parseErrorMessage } from "@/shared/utils";

export function CitiesProvider({ children }: CitiesProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCities() {
      dispatch({ type: CitiesActions.LoadCitiesStarted });

      try {
        const citiesResp = await cityService.getCities(controller.signal);
        dispatch({
          type: CitiesActions.LoadCitiesSucceeded,
          payload: citiesResp,
        });
      } catch (error) {
        dispatch({
          type: CitiesActions.LoadCitiesFailed,
          payload: parseErrorMessage(error),
        });
      }
    }

    fetchCities();

    return () => controller.abort();
  }, []);

  const getCity = useCallback(async (id: number) => {
    const controller = new AbortController();
    dispatch({ type: CitiesActions.LoadCityStarted });

    try {
      const cityResp = await cityService.getCity(id, controller.signal);
      dispatch({ type: CitiesActions.LoadCitySucceeded, payload: cityResp });
    } catch (error) {
      dispatch({
        type: CitiesActions.LoadCityFailed,
        payload: parseErrorMessage(error),
      });
    }
  }, []);

  const getCityFromPosition = useCallback(async (lat: number, lng: number) => {
    const controller = new AbortController();
    dispatch({ type: CitiesActions.GeocodingStarted });

    try {
      const geocodingResp = await cityService.getCityFromPosition(
        lat,
        lng,
        controller.signal,
      );

      if (geocodingResp.error) {
        throw new Error(geocodingResp.error);
      } else {
        const {
          country,
          country_code,
          locality,
          province,
          municipality,
          state,
          region,
          village,
          city_district,
        } = geocodingResp.address;

        const geocoding: Geocoding = {
          locality:
            locality ??
            province ??
            municipality ??
            state ??
            region ??
            village ??
            city_district,
          country,
          country_code,
          emoji: convertToEmoji(country_code),
        };

        dispatch({
          type: CitiesActions.GeocodingSucceeded,
          payload: geocoding,
        });
      }
    } catch (error) {
      dispatch({
        type: CitiesActions.GeocodingFailed,
        payload: parseErrorMessage(error),
      });
    }
  }, []);

  async function createCity(newCity: CreateCityRequest) {
    const controller = new AbortController();
    dispatch({ type: CitiesActions.CreateStarted });

    try {
      const cityCreated = await cityService.createCity(
        newCity,
        controller.signal,
      );

      dispatch({
        type: CitiesActions.CreateSucceeded,
        payload: cityCreated,
      });
    } catch (error) {
      dispatch({
        type: CitiesActions.CreateFailed,
        payload: parseErrorMessage(error),
      });
    }
  }

  async function deleteCity(id: number) {
    const controller = new AbortController();
    dispatch({ type: CitiesActions.DeleteStarted });

    try {
      await cityService.deleteCity(id, controller.signal);
      dispatch({
        type: CitiesActions.DeleteSucceeded,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: CitiesActions.DeleteFailed,
        payload: parseErrorMessage(error),
      });
    }
  }

  const setMapPosition = useCallback((position: [number, number]) => {
    dispatch({
      type: CitiesActions.MapMoved,
      payload: position,
    });
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities: state.cities,
        isLoadingCities: state.isLoadingCities,
        currentCity: state.currentCity,
        isLoadingCity: state.isLoadingCity,
        geocoding: state.geocoding,
        isLoadingGeocoding: state.isLoadingGeocoding,
        isCreatingCity: state.isCreatingCity,
        isDeletingCity: state.isDeletingCity,
        errorMessage: state.errorMessage,
        mapPosition: state.mapPosition,
        getCity,
        setMapPosition,
        getCityFromPosition,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
