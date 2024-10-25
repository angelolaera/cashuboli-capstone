import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./ConfermaPrenotazione.css";

const ConfermaPrenotazionePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Recupera i dettagli di prenotazione dallo stato
  const { dataSelezionata, biciclettaSelezionata, percorsoSelezionato, partecipanti, totale } = location.state || {};

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Container className="confirmation-page">
      <Row className="justify-content-center mt-5">
        <Col xs={10} md={8} className="text-center">
          <h2 className="mb-4">Prenotazione Confermata!</h2>
          <p className="mb-5">Grazie per aver prenotato il tour con noi. Ecco i dettagli della tua prenotazione:</p>

          <div className="details-section">
            <h4>Dettagli del Tour</h4>
            <p>
              <strong>Data:</strong> {dataSelezionata}
            </p>
            <p>
              <strong>Percorso:</strong> {percorsoSelezionato?.name}
            </p>
          </div>

          <div className="details-section mt-4">
            <h4>Dettagli della Bicicletta</h4>
            <p>
              <strong>Modello:</strong> {biciclettaSelezionata?.modello}
            </p>
            <p>
              <strong>Descrizione:</strong> {biciclettaSelezionata?.descrizione}
            </p>
          </div>

          <div className="details-section mt-4">
            <h4>Partecipanti</h4>
            {partecipanti.map((partecipante, index) => (
              <div key={index} className="participant-info">
                <p>
                  <strong>Partecipante {index + 1}</strong>
                </p>
                <p>Nome: {partecipante.nome}</p>
                <p>Cognome: {partecipante.cognome}</p>
                <p>Età: {partecipante.età}</p>
              </div>
            ))}
          </div>

          <div className="details-section mt-4">
            <h4>Totale</h4>
            <p>
              <strong>Prezzo totale:</strong> €{totale}
            </p>
          </div>

          <Button variant="primary" className="mt-4" onClick={handleBackToHome}>
            Torna alla Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfermaPrenotazionePage;
