import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

function BookingManagement() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  // Funzione per recuperare le prenotazioni
  const fetchBookings = () => {
    const token = localStorage.getItem("token");

    fetch("https://backend.cashuboli.it/api/prenotazioni", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel caricamento delle prenotazioni");
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error("Errore nel caricamento delle prenotazioni:", error);
      });
  };

  // Funzione per eliminare una prenotazione
  const handleDeleteBooking = (id) => {
    const token = localStorage.getItem("token");

    fetch(`https://backend.cashuboli.it/api/prenotazioni/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(() => fetchBookings())
      .catch((error) => console.error("Errore nella cancellazione della prenotazione:", error));
  };

  return (
    <div>
      <h2>Gestisci Prenotazioni</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID Utente</th>
            <th>Nominativo</th>
            <th>Tour</th>
            <th>Bicicletta</th>
            <th>Data Prenotazione</th>
            <th>Numero Biciclette Prenotate</th>
            <th>Prezzo Totale €</th>
            <th>Stato Prenotazione</th>
            <th>Azione</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.utente.id}</td>
              <td>{booking.utente.nome + " " + booking.utente.cognome}</td>
              <td>{booking.tour.name}</td>
              <td>{booking.bicicletta.modello}</td>
              <td>{booking.dataPrenotazione}</td>
              <td>{booking.numeroBiciclettePrenotate}</td>
              <td>{booking.totalePrezzo + ",00€"}</td>
              <td>{booking.stato}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteBooking(booking.id)}>
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BookingManagement;
