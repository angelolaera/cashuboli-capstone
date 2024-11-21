import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

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
      const utenteId = localStorage.getItem("userId"); // Recupera l'ID dell'utente

      const response = await fetch(`https://backend.cashuboli.it/api/prenotazioni/user/${utenteId}`, {
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
      setError("Non è stato possibile recuperare le prenotazioni");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="mt-5">
      <h2 className="text-center">Il Tuo Storico Prenotazioni</h2>
      <Row className="mt-4">
        {prenotazioni.length === 0 ? (
          <p className="text-center">Non hai ancora effettuato prenotazioni.</p>
        ) : (
          prenotazioni.map((prenotazione) => (
            <Col xs={12} md={6} lg={4} key={prenotazione.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Tour: {prenotazione.tour.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Data: {prenotazione.dataPrenotazione}</Card.Subtitle>
                  <Card.Text>
                    <strong>Bicicletta:</strong> {prenotazione.bicicletta.modello} <br />
                    <strong>Numero di biciclette:</strong> {prenotazione.numeroBiciclettePrenotate} <br />
                    <strong>Prezzo Totale:</strong> €{prenotazione.totalePrezzo} <br />
                    <strong>Stato:</strong> {prenotazione.stato}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default AreaUtente;
