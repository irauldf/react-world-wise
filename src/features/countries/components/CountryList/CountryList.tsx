import type { CountryListProps } from "../../country.types";
import { CountryItem } from "../CountryItem";
import styles from "./CountryList.module.css";

export function CountryList(props: CountryListProps) {
  return (
    <ul className={styles.countryList}>
      {props.countries.map((country) => (
        <CountryItem country={country} key={country.name} />
      ))}
    </ul>
  );
}
