import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import "./Checkout.css";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dataSelezionata, biciclettaSelezionata, percorsoSelezionato, partecipanti } = location.state;

  const [userData, setUserData] = useState({
    nome: "",
    cognome: "",
    dataNascita: "",
    città: "",
    indirizzo: "",
    altezza: "",
    peso: "",
  });

  const [numPersone, setNumPersone] = useState(partecipanti.length || 1);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const prezzoBicicletta = 50; // Prezzo singolo, sostituire con valore dinamico se necessario
  const totale = numPersone * prezzoBicicletta;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Devi effettuare il login per completare la prenotazione.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumPersoneChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumPersone(value > 0 ? value : 1);
  };

  const prenotazioneData = {
    tourId: percorsoSelezionato.id,
    biciclettaId: biciclettaSelezionata.id,
    numeroBiciclettePrenotate: numPersone,
    userData,
    additionalInfo,
    dataSelezionata,
  };

  return (
    <Container>
      <Row className="d-flex justify-content-around">
        <Col xs={4}>
          <div className="mt-3">
            <h2 className="h2-checkout">Riepilogo Ordine</h2>
            <p className="p-checkout">Data selezionata: {dataSelezionata}</p>
            <p className="p-checkout">Bicicletta selezionata: {biciclettaSelezionata.modello}</p>
            <p className="p-checkout">Percorso selezionato: {percorsoSelezionato.name}</p>
            <h3 className="h3-checkout my-3">Inserisci i tuoi dati</h3>
            <form className="d-flex flex-column gap-3">
              <div className="form-group">
                <label>Nome:</label>
                <input type="text" name="nome" value={userData.nome} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Cognome:</label>
                <input type="text" name="cognome" value={userData.cognome} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Data di nascita:</label>
                <input type="date" name="dataNascita" value={userData.dataNascita} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Città:</label>
                <input type="text" name="città" value={userData.città} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Indirizzo:</label>
                <input type="text" name="indirizzo" value={userData.indirizzo} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Informazioni in più:</label>
                <textarea value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Numero di persone:</label>
                <input type="number" value={numPersone} onChange={handleNumPersoneChange} min="1" />
              </div>
            </form>
            <h3 className="h3-checkout mt-3 mb-3">Totale: €{totale}</h3>
            <CheckoutForm totalAmount={totale} prenotazioneData={prenotazioneData} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
