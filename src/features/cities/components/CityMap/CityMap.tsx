import type { LeafletMouseEvent } from "leaflet";
import styles from "./CityMap.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect } from "react";
import { useCities } from "../../context";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../../hooks";
import { Button } from "@/shared/components";

export function CityMap() {
  const { cities, mapPosition, setMapPosition } = useCities();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (!geolocationPosition) return;
    setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition, setMapPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button variant="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeMapCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

interface ChangeMapCenterProps {
  position: [number, number];
}

function ChangeMapCenter({ position }: ChangeMapCenterProps) {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [map, position]);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      const params = new URLSearchParams({
        lat: e.latlng.lat.toString(),
        lng: e.latlng.lng.toString(),
      });

      navigate(`form?${params.toString()}`);
    },
  });

  return <></>;
}
