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
        partecipanti,
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
      {/* Il resto del contenuto della tua pagina */}
      <Row className="mt-5">
        <Col xs={10}>
          <h2 className="mt-3 text-center">PRENOTA IL TUO TOUR</h2>

          {/* Componenti per il calendario, la selezione della bicicletta e dei partecipanti */}

          <button className="confirm-button" onClick={confermaPrenotazione}>
            Conferma Prenotazione
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default TourBooking;
