import React, { useEffect, useState } from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import BASE_URL from "../../config";
import Swal from "sweetalert2";

function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  // Funzione per recuperare le prenotazioni
  const fetchBookings = () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    Swal.fire({
      title: "Caricamento prenotazioni...",
      text: "Attendere prego...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    fetch(`${BASE_URL}/api/prenotazioni`, {
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
        console.log(data);
        setBookings(data);
        Swal.close();
      })
      .catch((error) => {
        console.error("Errore nel caricamento delle prenotazioni:", error);
        Swal.fire("Errore", "Non è stato possibile caricare le prenotazioni.", "error");
      })
      .finally(() => setLoading(false));
  };

  // Funzione per eliminare una prenotazione
  const handleDeleteBooking = (id) => {
    Swal.fire({
      title: "Sei sicuro?",
      text: "Questa operazione è irreversibile!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sì, elimina!",
      cancelButtonText: "Annulla",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");

        Swal.fire({
          title: "Eliminazione in corso...",
          text: "Attendere prego...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        fetch(`${BASE_URL}/api/prenotazioni/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then(() => {
            Swal.fire("Eliminata!", "La prenotazione è stata eliminata con successo.", "success");
            fetchBookings();
          })
          .catch((error) => {
            console.error("Errore nella cancellazione della prenotazione:", error);
            Swal.fire("Errore", "Si è verificato un problema durante l'eliminazione.", "error");
          });
      }
    });
  };

  // Funzione per confermare una prenotazione (aggiorna lo stato a "CONFERMATA")
  const handleConfirmBooking = (id) => {
    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/api/prenotazioni/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella conferma della prenotazione");
        }
        return response.json();
      })
      .then(() => {
        Swal.fire("Confermata!", "La prenotazione è stata confermata con successo.", "success");
        fetchBookings(); // Aggiorna la lista delle prenotazioni
      })
      .catch((error) => {
        console.error("Errore nella conferma della prenotazione:", error);
        Swal.fire("Errore", "Si è verificato un problema durante la conferma.", "error");
      });
  };

  return (
    <div>
      <h2>Gestisci Prenotazioni</h2>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID Utente</th>
              <th>Nominativo</th>
              <th>Tour</th>
              <th>Bicicletta</th>
              <th>Data Prenotazione</th>
              <th>Numero Biciclette Prenotate</th>
              <th>Informazioni Aggiuntive</th>
              <th>Prezzo Totale €</th>
              <th>Stato Prenotazione</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {bookings.filter((booking) => booking.stato !== "CANCELLATA").length > 0 ? (
              bookings
                .filter((booking) => booking.stato !== "CANCELLATA") // Filtra le prenotazioni cancellate
                .map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.utente.id}</td>
                    <td>{booking.utente.nome + " " + booking.utente.cognome}</td>
                    <td>{booking.tour.name}</td>
                    <td>{booking.bicicletta.modello}</td>
                    <td>{booking.dataPrenotazione}</td>
                    <td>{booking.numeroBiciclettePrenotate}</td>
                    <td>{booking.informazioniAggiuntive || "Nessuna info"}</td>
                    <td>{booking.totalePrezzo.toFixed(2) + "€"}</td>
                    <td>{booking.stato}</td>
                    <td className="d-flex justify-content-center gap-2 align-items-center">
                      <Button variant="success" className="me-2" onClick={() => handleConfirmBooking(booking.id)}>
                        Conferma
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteBooking(booking.id)}>
                        Elimina
                      </Button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  Nessuna prenotazione disponibile.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default BookingManagement;
