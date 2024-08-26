import { useState } from "react";

function Test() {
  const [initialPlanetsFetched, setInitialPlanetsFetched] = useState(false);
  const [planetsList, setPlanetsList] = useState(null);
  const [planetId, setPlanetId] = useState();

  const [initialPlacesFetched, setInitialPlacesFetched] = useState(false);
  const [placesList, setPlacesList] = useState(null);
  const [placeId, setPlaceId] = useState();

  const fetchPlanets = async () => {
    const response = await fetch("/planets.json");
    const result = await response.json();
    setPlanetsList(result);
    setPlanetId(result[0].id);
  };

  const fetchPlaces = async (placeId) => {
    const response = await fetch(`/planets.${placeId}.places.json`);
    const result = await response.json();
    setPlacesList(result);
    setPlaceId(result[0].id);
  };

  const handleChangePlanet = (e) => {
    setPlanetId(e.target.value);
    fetchPlaces(e.target.value);
  };

  const handleChangePlace = (e) => {
    setPlaceId(e.target.value);
  };

  console.log(initialPlanetsFetched);

  if (!initialPlanetsFetched) {
    fetchPlanets().finally(() => setInitialPlanetsFetched(true));
  }

  console.log(initialPlanetsFetched);

  if (initialPlanetsFetched) {
    console.log(planetsList);
  }

  if (initialPlanetsFetched && !initialPlacesFetched) {
    fetchPlaces(planetId).finally(() => setInitialPlacesFetched(true));
  }
  // fetchPlaces()

  return (
    <div>
      <label>Choose planet: </label>
      <select value={planetId} onChange={handleChangePlanet}>
        {planetsList ? (
          planetsList.map((planet) => {
            return (
              <option key={planet.id} value={planet.id}>
                {planet.name}
              </option>
            );
          })
        ) : (
          <option>no planet</option>
        )}
      </select>
      <br />
      <label>Choose place: </label>
      <select value={placeId} onChange={handleChangePlace}>
        {placesList ? (
          placesList.map((place) => {
            return (
              <option key={place.id} value={place.id}>
                {place.name}
              </option>
            );
          })
        ) : (
          <option>no place</option>
        )}
      </select>
      <hr />
      {planetsList && "going to " + placeId + " on " + planetId}
    </div>
  );
}

export default Test;
