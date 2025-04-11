import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BASE_URL from "../../config";

const AreaUtente = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrenotazioniUtente();
  }, []);

  const fetchPrenotazioniUtente = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const utenteId = localStorage.getItem("userId");

      const response = await fetch(`${BASE_URL}/api/prenotazioni/user/${utenteId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Errore nel recupero delle prenotazioni");

      const data = await response.json();
      setPrenotazioni(data);
    } catch (err) {
      console.error("Errore:", err);
      setError("Non ci sono prenotazioni disponibili.");
    } finally {
      setLoading(false);
    }
  };

  const isDataPassata = (dataPrenotazione) => {
    const oggi = new Date();
    const dataPrenotazioneObj = new Date(dataPrenotazione);
    // Imposta l'ora a mezzanotte per confrontare solo le date
    oggi.setHours(0, 0, 0, 0);
    dataPrenotazioneObj.setHours(0, 0, 0, 0);
    return dataPrenotazioneObj < oggi;
  };

  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="mt-5">
      <h2 className="text-center">Il Tuo Storico Prenotazioni</h2>
      <ul className="list-unstyled mt-4">
        {prenotazioni.length === 0 ? (
          <p className="text-center">Non hai ancora effettuato prenotazioni.</p>
        ) : (
          prenotazioni.map((prenotazione) => (
            <li
              key={prenotazione.id}
              className="mb-3 p-3 rounded border"
              style={{
                backgroundColor: "#f8f9fa",
                display: isDataPassata(prenotazione.dataPrenotazione) ? "none" : "block",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{prenotazione.tour.name}</h5>
                <small className="text-muted">{prenotazione.dataPrenotazione}</small>
              </div>
              <div className="mt-2">
                <p className="mb-1">
                  <strong>Bicicletta:</strong> {prenotazione.bicicletta.modello}
                </p>
                <p className="mb-1">
                  <strong>Numero:</strong> {prenotazione.numeroBiciclettePrenotate}
                </p>
                <p className="mb-1">
                  <strong>Totale:</strong> €{prenotazione.totalePrezzo}
                </p>
                <p className="mb-0">
                  <strong>Stato:</strong> {prenotazione.stato}
                </p>
                <small>{prenotazione.note}</small>
              </div>
            </li>
          ))
        )}
      </ul>
    </Container>
  );
};

export default AreaUtente;
