export interface City {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: CityPosition;
  id: number;
}

export type CreateCityRequest = Omit<City, "id">;

export interface CityPosition {
  lat: number;
  lng: number;
}

export interface CityListProps {
  cities: City[];
}

export interface CityItemProps {
  city: City;
}

export interface CityProps {
  city: City;
}
