import type { CityListProps } from "../../city.types";
import { CityItem } from "../CityItem/CityItem";
import styles from "./CityList.module.css";

export function CityList(props: CityListProps) {
  return (
    <ul className={styles.cityList}>
      {props.cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
