import React, { useEffect, useState } from "react";
import { addDays, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Accordion, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./TourBooking.css";

const TourBooking = () => {
  const navigate = useNavigate();

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
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Devi effettuare il login per continuare la prenotazione.");
      navigate("/login");
    }
  };

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

  const gestisciSelezioneData = (data) => {
    if (data >= dataMinimaPrenotabile) {
      setDataSelezionata(data);
    } else {
      alert("Puoi prenotare solo a partire dai prossimi tre giorni.");
    }
  };

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
        partecipanti,
      },
    });
  };

  const meseInizio = startOfMonth(oggi);
  const meseFine = endOfMonth(meseInizio);
  const settimanaInizio = startOfWeek(meseInizio, { weekStartsOn: 1 });
  const settimanaFine = endOfWeek(meseFine, { weekStartsOn: 1 });
  const giorniArray = [];
  let giornoCorrente = settimanaInizio;

  while (giornoCorrente <= settimanaFine) {
    giorniArray.push(giornoCorrente);
    giornoCorrente = addDays(giornoCorrente, 1);
  }

  const settimane = [];
  for (let i = 0; i < giorniArray.length; i += 7) {
    settimane.push(giorniArray.slice(i, i + 7));
  }

  const aggiungiPartecipante = () => {
    setPartecipanti([...partecipanti, { nome: "", cognome: "", età: "" }]);
  };

  const handlePartecipanteChange = (index, field, value) => {
    const nuoviPartecipanti = [...partecipanti];
    nuoviPartecipanti[index][field] = value;
    setPartecipanti(nuoviPartecipanti);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col xs={10}>
          <h2 className="mt-3 text-center">Book Your Tour</h2>

          {/* Renderizza il calendario */}
          <table className="calendar">
            <thead>
              <tr>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
                <th>Sun</th>
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

          {/* Selezione Bicicletta */}
          <div className="selection-box mt-3">
            <label className="label-option-value mb-4">Choose your bike:</label>
            <Row className="bikes-selection">
              {biciclette.length > 0 ? (
                biciclette.map((bicicletta) => (
                  <Col xs={12} md={6} lg={4} key={bicicletta.id} className="mb-4">
                    <Card
                      onClick={() => setBiciclettaSelezionata(bicicletta)}
                      className={`bike-option ${biciclettaSelezionata?.id === bicicletta.id ? "selected" : ""}`}
                    >
                      <Card.Img variant="top" src={bicicletta.imageUrl} alt={bicicletta.modello} />
                      <Card.Body>
                        <Card.Title>{bicicletta.modello}</Card.Title>
                        <Card.Text>{bicicletta.descrizione}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No bikes available</p>
              )}
            </Row>

            <label className="label-option-value mt-4 mb-5">Choose the tour:</label>
            <Row className="tour-selection">
              {tour.length > 0 ? (
                tour.map((percorso) => (
                  <Col xs={12} md={6} lg={4} key={percorso.id} className="mb-4">
                    <Card
                      onClick={() => setPercorsoSelezionato(percorso)}
                      className={`tour-option ${percorsoSelezionato?.id === percorso.id ? "selected" : ""}`}
                    >
                      <Card.Img variant="top" src={percorso.imageUrl} alt={percorso.name} />
                      <Card.Body>
                        <Card.Title>{percorso.name}</Card.Title>
                        <Card.Text>{percorso.descrizione}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No tours available</p>
              )}
            </Row>
          </div>

          {/* Partecipanti */}
          <div className="mt-4">
            <h5>Enter Participant Details</h5>
            <Accordion>
              {partecipanti.map((partecipante, index) => (
                <Accordion.Item eventKey={index} key={index}>
                  <Accordion.Header>Participant {index + 1}</Accordion.Header>
                  <Accordion.Body>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" value={partecipante.nome} onChange={(e) => handlePartecipanteChange(index, "nome", e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" value={partecipante.cognome} onChange={(e) => handlePartecipanteChange(index, "cognome", e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Age</Form.Label>
                      <Form.Control type="number" value={partecipante.età} onChange={(e) => handlePartecipanteChange(index, "età", e.target.value)} />
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
            <Button className="mt-3" onClick={aggiungiPartecipante}>
              Add Participant
            </Button>
          </div>
        </Col>

        <Col xs={2} className="mt-3">
          <div className="mt-3 border border-1 rounded-3 p-3">
            {dataSelezionata && (
              <div className="booking-details">
                <p className="tourbookingP">Selected Date: {format(dataSelezionata, "dd MMMM yyyy")}</p>
                <p className="tourbookingP">Selected Bike: {biciclettaSelezionata?.modello || "No bike selected"}</p>
                <p className="tourbookingP">Selected Tour: {percorsoSelezionato?.name || "No tour selected"}</p>
                <button className="confirm-button" onClick={confermaPrenotazione}>
                  Confirm Booking
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
