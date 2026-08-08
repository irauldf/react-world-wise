export const CitiesActions = {
  LoadCitiesStarted: "cities/loadStarted",
  LoadCitiesSucceeded: "cities/loadSucceeded",
  LoadCitiesFailed: "cities/loadFailed",

  LoadCityStarted: "city/loadStarted",
  LoadCitySucceeded: "city/loadSucceeded",
  LoadCityFailed: "city/loadFailed",

  CreateStarted: "cities/createStarted",
  CreateSucceeded: "cities/createSucceeded",
  CreateFailed: "cities/createFailed",

  DeleteStarted: "cities/deleteStarted",
  DeleteSucceeded: "cities/deleteSucceeded",
  DeleteFailed: "cities/deleteFailed",

  GeocodingStarted: "geocoding/loadStarted",
  GeocodingSucceeded: "geocoding/loadSucceeded",
  GeocodingFailed: "geocoding/loadFailed",

  MapMoved: "map/moved",
} as const;
