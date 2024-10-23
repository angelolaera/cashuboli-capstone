import React, { useEffect, useState } from "react";

function BikeManagement() {
  const [bikes, setBikes] = useState([]);

  // Chiamata API per ottenere i dati delle biciclette
  useEffect(() => {
    fetch("http://localhost:3001/api/biciclette")
      .then((response) => response.json())
      .then((data) => setBikes(data))
      .catch((error) => console.error("Errore nel caricamento delle biciclette:", error));
  }, []);

  return (
    <div>
      <h2>Gestione Biciclette</h2>
      <ul>
        {bikes.map((bike) => (
          <li key={bike.id}>{bike.modello}</li>
        ))}
      </ul>
    </div>
  );
}

export default BikeManagement;
