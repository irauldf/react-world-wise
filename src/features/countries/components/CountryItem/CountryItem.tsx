import type { CountryItemProps } from "../../country.types";
import styles from "./CountryItem.module.css";

export function CountryItem(props: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{props.country.emoji}</span>
      <span>{props.country.name}</span>
    </li>
  );
}
