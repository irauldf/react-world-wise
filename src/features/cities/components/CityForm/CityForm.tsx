import { useEffect, useState } from "react";
import { BackButton, Button, Message, Spinner } from "@/shared/components";
import { useUrlPosition } from "../../hooks";
import { useCities } from "../../context";
import DatePicker from "react-datepicker";

import styles from "./CityForm.module.css";
import "react-datepicker/dist/react-datepicker.css";
import type { CreateCityRequest } from "../../city.types";
import { useNavigate } from "react-router-dom";

export function CityForm() {
  const [lat, lng] = useUrlPosition();
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState("");

  const {
    geocoding,
    isLoadingGeocoding,
    getCityFromPosition,
    errorMessage,
    isCreatingCity,
    createCity,
  } = useCities();

  useEffect(() => {
    if (!lat || !lng) return;
    getCityFromPosition(Number(lat), Number(lng));
  }, [lat, lng, getCityFromPosition]);

  useEffect(() => {
    if (!geocoding) return;
    setCityName(geocoding.locality);
  }, [geocoding]);

  if (isLoadingGeocoding) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <Message message={errorMessage} />;
  }

  if (!lat || !lng) {
    return <Message message="Start by clicking somewhere on the map" />;
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!geocoding || !cityName || !date) return;

    const newCity: CreateCityRequest = {
      cityName,
      country: geocoding.country,
      date: date.toString(),
      emoji: geocoding.emoji!,
      notes,
      position: { lat: Number(lat), lng: Number(lng) },
    };

    await createCity(newCity);
    navigate("/app");
  }

  return (
    <form
      className={`${styles.form} ${isCreatingCity ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{geocoding?.emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date.toString()}
        /> */}

        <DatePicker
          id="date"
          onChange={setDate}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button variant="primary" type="submit">
          {isCreatingCity ? "Saving..." : "Add"}
        </Button>
        {!isCreatingCity && <BackButton />}
      </div>
    </form>
  );
}
