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

    fetch("http://localhost:3001/api/prenotazioni", {
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

    fetch(`http://localhost:3001/api/prenotazioni/${id}`, {
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
            <th>ID Tour</th>
            <th>ID Bicicletta</th>
            <th>Data Prenotazione</th>
            <th>Numero Biciclette Prenotate</th>
            <th>Prezzo Totale</th>
            <th>Azione</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.utente.id}</td>
              <td>{booking.tour.id}</td>
              <td>{booking.bicicletta.id}</td>
              <td>{booking.dataPrenotazione}</td>
              <td>{booking.numeroBiciclettePrenotate}</td>
              <td>{booking.totalePrezzo}</td>
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
