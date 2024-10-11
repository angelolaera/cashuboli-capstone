import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./Checkout.css";

const CheckoutPage = () => {
  const location = useLocation();
  const { dataSelezionata, biciclettaSelezionata, percorsoSelezionato } = location.state;
  const [numPersone, setNumPersone] = useState(1); // Stato per il numero di persone

  const prezzoBicicletta = 50; // Puoi personalizzare i prezzi
  const totale = numPersone * prezzoBicicletta;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logica per l'invio del form
    alert("Prenotazione completata!");
  };

  return (
    <Container>
      <div>
        <h2 className="h2-checkout">Riepilogo Ordine</h2>
        <p className="p-checkout">Data selezionata: {dataSelezionata}</p> {/* Data formattata passata dalla pagina precedente */}
        <p className="p-checkout">Bicicletta selezionata: {biciclettaSelezionata}</p>
        <p className="p-checkout">Percorso selezionato: {percorsoSelezionato}</p>
        <h3 className="h2-checkout">Inserisci i tuoi dati</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" required />
          </label>
          <br />
          <label>
            Email:
            <input type="email" required />
          </label>
          <br />
          <label>
            Numero di persone:
            <input type="number" value={numPersone} onChange={(e) => setNumPersone(e.target.value)} min="1" />
          </label>
          <br />
          <h3>Totale: €{totale}</h3>
          <button type="submit">Conferma Ordine</button>
        </form>
      </div>
    </Container>
  );
};

export default CheckoutPage;
