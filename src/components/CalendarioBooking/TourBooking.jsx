import React, { useEffect, useState } from "react";
import { addDays, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Accordion, Button, Col, Container, Form, Row } from "react-bootstrap";
import "./TourBooking.css";

const TourBooking = () => {
  const navigate = useNavigate();

  // Stati
  const [dataSelezionata, setDataSelezionata] = useState(null);
  const [biciclettaSelezionata, setBiciclettaSelezionata] = useState(null);
  const [percorsoSelezionato, setPercorsoSelezionato] = useState(null);
  const [biciclette, setBiciclette] = useState([]);
  const [tour, setTour] = useState([]);
  const [partecipanti, setPartecipanti] = useState([{ nome: "", cognome: "", età: "" }]);

  const oggi = new Date();
  const dataMinimaPrenotabile = addDays(oggi, 3);

  useEffect(() => {
    fetchBiciclette();
    fetchTour();
    checkAuth(); // Verifica autenticazione all'avvio
  }, []);

  // Funzione per controllare autenticazione
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Devi effettuare il login per continuare la prenotazione.");
      navigate("/login");
    }
  };

  // Funzione per gestire il fetch biciclette e tour
  const fetchBiciclette = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/biciclette");
      const data = await response.json();
      setBiciclette(data);
    } catch (error) {
      console.error("Errore nel caricamento delle biciclette:", error);
    }
  };

  const fetchTour = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/tours");
      const data = await response.json();
      setTour(data);
    } catch (error) {
      console.error("Errore nel caricamento dei tour:", error);
    }
  };

  // Funzione per selezionare data
  const gestisciSelezioneData = (data) => {
    if (data >= dataMinimaPrenotabile) {
      setDataSelezionata(data);
    } else {
      alert("Puoi prenotare solo a partire dai prossimi tre giorni.");
    }
  };

  // Funzione per confermare prenotazione
  const confermaPrenotazione = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Effettua il login per continuare la prenotazione.");
      navigate("/login");
      return;
    }

    const dataFormattata = dataSelezionata ? format(dataSelezionata, "dd MMMM yyyy") : "";

    navigate("/checkoutpage", {
      state: {
        dataSelezionata: dataFormattata,
        biciclettaSelezionata,
        percorsoSelezionato,
        partecipanti: partecipanti || [], // Aggiunto valore di default qui
      },
    });
  };

  // Aggiungi i partecipanti dinamicamente
  const aggiungiPartecipante = () => {
    setPartecipanti([...partecipanti, { nome: "", cognome: "", età: "" }]);
  };

  // Funzione per gestire la modifica di un partecipante
  const handlePartecipanteChange = (index, field, value) => {
    const nuoviPartecipanti = [...partecipanti];
    nuoviPartecipanti[index][field] = value;
    setPartecipanti(nuoviPartecipanti);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col xs={10}>
          <h2 className="mt-3 text-center">PRENOTA IL TUO TOUR</h2>

          {/* Renderizza il calendario */}
          <table className="calendar">
            <thead>
              <tr>
                <th>Lun</th>
                <th>Mar</th>
                <th>Mer</th>
                <th>Gio</th>
                <th>Ven</th>
                <th>Sab</th>
                <th>Dom</th>
              </tr>
            </thead>
            <tbody>
              {settimane.map((settimana, index) => (
                <tr key={index}>
                  {settimana.map((giorno) => (
                    <td
                      key={giorno}
                      className={
                        giorno.getMonth() !== meseInizio.getMonth()
                          ? "outside-month"
                          : dataSelezionata && dataSelezionata.getTime() === giorno.getTime()
                          ? "selected"
                          : ""
                      }
                    >
                      <button onClick={() => gestisciSelezioneData(giorno)} disabled={giorno < dataMinimaPrenotabile}>
                        {format(giorno, "d")}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Selezione Bicicletta e Percorso dinamici */}
          <div className="selection-box mt-3">
            <label className="label-option-value mb-4">Scegli la tua bicicletta:</label>
            <div className="bikes-selection">
              {biciclette.map((bicicletta) => (
                <div
                  key={bicicletta.id}
                  className={`bike-option ${biciclettaSelezionata?.id === bicicletta.id ? "selected" : ""}`}
                  onClick={() => setBiciclettaSelezionata(bicicletta)}
                >
                  <img src={bicicletta.imageUrl} alt={bicicletta.modello} />
                  <p className="tourbookingP">{bicicletta.modello}</p>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <label className="label-option-value mb-5">Scegli il percorso:</label>
              <div className="percorso-selection d-flex justify-content-center gap-5">
                {tour.map((percorso) => (
                  <div
                    key={percorso.id}
                    className={`percorso-option ${percorsoSelezionato?.id === percorso.id ? "selected" : ""}`}
                    onClick={() => setPercorsoSelezionato(percorso)}
                  >
                    <img src={percorso.imageUrl} alt={percorso.name} />
                    <p className="tourbookingP">{percorso.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Aggiungi i partecipanti */}
          <div className="mt-4">
            <h5>Inserisci i partecipanti</h5>
            <Accordion>
              {partecipanti.map((partecipante, index) => (
                <Accordion.Item eventKey={index} key={index}>
                  <Accordion.Header>Partecipante {index + 1}</Accordion.Header>
                  <Accordion.Body>
                    <Form.Group>
                      <Form.Label>Nome</Form.Label>
                      <Form.Control type="text" value={partecipante.nome} onChange={(e) => handlePartecipanteChange(index, "nome", e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Cognome</Form.Label>
                      <Form.Control type="text" value={partecipante.cognome} onChange={(e) => handlePartecipanteChange(index, "cognome", e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Età</Form.Label>
                      <Form.Control type="number" value={partecipante.età} onChange={(e) => handlePartecipanteChange(index, "età", e.target.value)} />
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
            <Button className="mt-3" onClick={aggiungiPartecipante}>
              Aggiungi Partecipante
            </Button>
          </div>
        </Col>
        <Col xs={2} className="mt-3">
          <div className="mt-3 border border-1 rounded-3 p-3">
            {dataSelezionata && (
              <div className="booking-details">
                <p className="tourbookingP">Hai selezionato il giorno: {format(dataSelezionata, "dd MMMM yyyy")}</p>
                <p className="tourbookingP">Bicicletta selezionata: {biciclettaSelezionata?.modello || "Nessuna bicicletta selezionata"}</p>{" "}
                <p className="tourbookingP">Percorso selezionato: {percorsoSelezionato?.name || "Nessun percorso selezionato"}</p>
                <button className="confirm-button" onClick={confermaPrenotazione}>
                  Conferma Prenotazione
                </button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TourBooking;
