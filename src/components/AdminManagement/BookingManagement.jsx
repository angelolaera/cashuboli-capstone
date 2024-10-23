import React, { useEffect, useState } from "react";

function BookingManagement() {
  const [bookings, setBookings] = useState([]);

  // Chiamata API per ottenere i dati delle prenotazioni
  useEffect(() => {
    fetch("http://localhost:3001/api/prenotazioni")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Errore nel caricamento delle prenotazioni:", error));
  }, []);

  return (
    <div>
      <h2>Gestione Prenotazioni</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>Prenotazione di {booking.utente.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookingManagement;
