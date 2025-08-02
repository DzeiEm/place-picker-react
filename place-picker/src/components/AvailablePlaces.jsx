import React from "react";
import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import ErrorComponent from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/places");
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error("Fail to fetch places");
        }

        navigator.geolocation.getCurrentPosition(() => {});

        setAvailablePlaces(responseData.places);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later",
        });
      }

      setIsFetching(false);
    }
    fetchPlaces();
  }, []);

  if (error) {
    return (
      <ErrorComponent
        title="An error occured!"
        message={error.message}
        onConfirm={undefined}
      />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
