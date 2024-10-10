import React, { useState } from "react";
import { addDays, format, startOfDay, getDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import "./TourBooking.css";

const TourBooking = () => {
  // Stato per la data selezionata dall'utente
  const [dataSelezionata, setDataSelezionata] = useState(null);
  // Ottieni la data di oggi a mezzanotte
  const oggi = startOfDay(new Date());
  // Calcola la data minima prenotabile (tra 3 giorni da oggi)
  const dataMinimaPrenotabile = addDays(oggi, 3);

  // Funzione per gestire la selezione della data
  const gestisciSelezioneData = (data) => {
    if (data >= dataMinimaPrenotabile) {
      setDataSelezionata(data);
    } else {
      alert("Puoi prenotare solo a partire dai prossimi tre giorni.");
    }
  };

  // Funzione per renderizzare il calendario
  const renderizzaCalendario = () => {
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

    return (
      <table className="calendar">
        <thead>
          <tr>
            <th>Lunedì</th>
            <th>Martedì</th>
            <th>Mercoledì</th>
            <th>Giovedì</th>
            <th>Venerdì</th>
            <th>Sabato</th>
            <th>Domenica</th>
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
    );
  };

  return (
    <div className="tour-booking">
      <h2>Prenota il tuo tour in bicicletta</h2>
      {/* Renderizza il calendario */}
      {renderizzaCalendario()}
      {/* Mostra i dettagli della prenotazione se una data è stata selezionata */}
      {dataSelezionata && (
        <div className="booking-details">
          <p>Hai selezionato il giorno: {format(dataSelezionata, "dd MMMM yyyy")}</p>
          <button className="confirm-button">Conferma Prenotazione</button>
        </div>
      )}
    </div>
  );
};

export default TourBooking;
