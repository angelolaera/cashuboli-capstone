import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./Checkout.css";

const CheckoutPage = () => {
  const location = useLocation();
  const { dataSelezionata, biciclettaSelezionata, percorsoSelezionato } = location.state;
  const [numPersone, setNumPersone] = useState(1);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const prezzoBicicletta = 50;
  const totale = numPersone * prezzoBicicletta;

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Prenotazione completata!");
  };

  return (
    <Container>
      <Row className="d-flex justify-content-around">
        <Col xs={4}>
          <div className="mt-3">
            <h2 className="h2-checkout">Riepilogo Ordine</h2>
            <p className="p-checkout">Data selezionata: {dataSelezionata}</p>
            <p className="p-checkout">Bicicletta selezionata: {biciclettaSelezionata}</p>
            <p className="p-checkout">Percorso selezionato: {percorsoSelezionato}</p>
            <h3 className="h3-checkout my-3">Inserisci i tuoi dati</h3>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div className="form-group">
                <label>Nome:</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Cognome:</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Data di nascita:</label>
                <input type="date" required />
              </div>
              <div className="form-group">
                <label>Città:</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Indirizzo:</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Altezza:</label>
                <input type="text" required />
                cm
              </div>
              <div className="form-group">
                <label>Peso:</label>
                <input type="text" required />
                Kg
              </div>
              <div className="form-group">
                <label>Informazioni in più:</label>
                <textarea required value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Numero di persone:</label>
                <input type="number" value={numPersone} onChange={(e) => setNumPersone(e.target.value)} min="1" />
              </div>
              <br />
              <h3 className="h3-checkout mt-2">Totale: €{totale}</h3>
              <button type="submit" className="btn-checkout">
                Conferma Ordine
              </button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;

// import React, { useCallback, useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe("pk_test_XUIpXpyaGuuw0Dc9Ng80xFWs");

// const CheckoutForm = () => {
//   const fetchClientSecret = useCallback(() => {
//     // Create a Checkout Session
//     return fetch("/create-checkout-session", {
//       method: "POST",
//     })
//       .then((res) => res.json())
//       .then((data) => data.clientSecret);
//   }, []);

//   const options = { fetchClientSecret };

//   return (
//     <div id="checkout">
//       <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
//         <EmbeddedCheckout />
//       </EmbeddedCheckoutProvider>
//     </div>
//   );
// };

// export default CheckoutForm;
