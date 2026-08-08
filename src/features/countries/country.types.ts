export interface Country {
  name: string;
  emoji:string;
}

export interface CountryListProps {
  countries: Country[];
}

export interface CountryItemProps {
  country: Country;
}
