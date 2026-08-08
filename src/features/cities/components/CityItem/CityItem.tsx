import { formatDate } from "@/shared";
import type { CityItemProps } from "../../city.types";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../../context";

export function CityItem(props: CityItemProps) {
  const { id, cityName, emoji, date } = props.city;
  const { currentCity, isDeletingCity, deleteCity } = useCities();

  async function handleDeleteClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await deleteCity(id);
  }

  return (
    <li className={`${isDeletingCity ? styles.loading : ""}`}>
      <Link
        className={`${styles.cityItem} ${id === currentCity?.id ? styles["cityItem--active"] : ""}`}
        to={id.toString()}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDeleteClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}
