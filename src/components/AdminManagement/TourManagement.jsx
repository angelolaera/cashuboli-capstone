import React, { useEffect, useState } from "react";

function TourManagement() {
  const [tours, setTours] = useState([]);

  // Chiamata API per ottenere i dati dei tour
  useEffect(() => {
    fetch("http://localhost:3001/api/tours")
      .then((response) => response.json())
      .then((data) => setTours(data))
      .catch((error) => console.error("Errore nel caricamento dei tour:", error));
  }, []);

  return (
    <div>
      <h2>Gestione Tour</h2>
      <ul>
        {tours.map((tour) => (
          <li key={tour.id}>{tour.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TourManagement;
