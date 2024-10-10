import React, { useState } from "react";
import { addDays, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import "./TourBooking.css";
import { Col, Container, Row } from "react-bootstrap";

const TourBooking = () => {
  // Stato per la data selezionata, bicicletta e percorso
  const [dataSelezionata, setDataSelezionata] = useState(null);
  const [biciclettaSelezionata, setBiciclettaSelezionata] = useState("");
  const [percorsoSelezionato, setPercorsoSelezionato] = useState("");

  // Calcola la data minima prenotabile (tra 3 giorni da oggi)
  const oggi = new Date();
  const dataMinimaPrenotabile = addDays(oggi, 3);

  // Funzione per gestire la selezione della data
  const gestisciSelezioneData = (data) => {
    if (data >= dataMinimaPrenotabile) {
      setDataSelezionata(data);
    } else {
      alert("Puoi prenotare solo a partire dai prossimi tre giorni.");
    }
  };

  // Genera un array di giorni per il layout del calendario
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
    <Container>
      <Row className="mt-5">
        <Col xs={10}>
          <h2 className="mt-3 text-center">PRENOTA IL TUO TOUR</h2>{" "}
          <div className="tour-booking">
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

            {/* Box di selezione bicicletta e percorso */}

            <div className="selection-box mt-3">
              <label className="label-option-value mb-4">Scegli la tua bicicletta:</label>
              <div className="bikes-selection">
                <div
                  className={`bike-option ${biciclettaSelezionata === "SIDE BY SIDE TANDEM" ? "selected" : ""}`}
                  onClick={() => setBiciclettaSelezionata("SIDE BY SIDE TANDEM")}
                >
                  <img src="https://www.re-moove.it/images/bikes/side-by-side-tandem.webp" alt="SIDE BY SIDE TANDEM" />
                  <p className="tourbookingP">SIDE BY SIDE TANDEM</p>
                </div>
                <div
                  className={`bike-option ${biciclettaSelezionata === "WHEELCHAIR BIKE" ? "selected" : ""}`}
                  onClick={() => setBiciclettaSelezionata("WHEELCHAIR BIKE")}
                >
                  <img src="https://www.re-moove.it/images/bikes/wheelchair-bike.webp" alt="WHEELCHAIR BIKE" />
                  <p className="tourbookingP">WHEELCHAIR BIKE</p>
                </div>
                <div
                  className={`bike-option ${biciclettaSelezionata === "TAXI TRIKE" ? "selected" : ""}`}
                  onClick={() => setBiciclettaSelezionata("TAXI TRIKE")}
                >
                  <img src="https://www.re-moove.it/images/bikes/taxi-trike.webp" alt="TAXI TRIKE" />
                  <p className="tourbookingP">TAXI TRIKE</p>
                </div>
                <div
                  className={`bike-option ${biciclettaSelezionata === "CARGO TRIKE" ? "selected" : ""}`}
                  onClick={() => setBiciclettaSelezionata("CARGO TRIKE")}
                >
                  <img src="https://www.re-moove.it/images/bikes/cargo-trike.webp" alt="CARGO TRIKE" />
                  <p className="tourbookingP">SIDE BY SIDE TANDEM</p>
                </div>
                <div
                  className={`bike-option ${biciclettaSelezionata === "SPORT TRIKE" ? "selected" : ""}`}
                  onClick={() => setBiciclettaSelezionata("SPORT TRIKE")}
                >
                  <img src="https://www.re-moove.it/images/bikes/sport-trike.webp" alt="SPORT TRIKE" />
                  <p className="tourbookingP">WHEELCHAIR BIKE</p>
                </div>
                <div className={`bike-option ${biciclettaSelezionata === "TANDEM" ? "selected" : ""}`} onClick={() => setBiciclettaSelezionata("TANDEM")}>
                  <img src="https://www.re-moove.it/images/bikes/tandem.webp" alt="TANDEM" />
                  <p className="tourbookingP">TANDEM</p>
                </div>
              </div>

              <div className="mt-3">
                <label className="label-option-value mb-5">Scegli il percorso:</label>
                <div className="percorso-selection d-flex justify-content-center gap-5">
                  <div
                    className={`percorso-option ${percorsoSelezionato === "Scoprire la Valle D'Itria" ? "selected" : ""}`}
                    onClick={() => setPercorsoSelezionato("Scoprire la Valle D'Itria")}
                  >
                    <img
                      src="https://cdn.getyourguide.com/img/tour/545a5b4d43bcc3360498da68df4b5158bad7fa08e1afc9eca0884cf39ee71821.jpeg/132.webp"
                      alt="Tour Valle  D'Itria"
                    />
                    <p className="tourbookingP">Scoprire la Valle D'Itria</p>
                  </div>
                  <div
                    className={`percorso-option ${percorsoSelezionato === "Alberobello tutto intorno: Masserie e Trulli" ? "selected" : ""}`}
                    onClick={() => setPercorsoSelezionato("Alberobello tutto intorno: Masserie e Trulli")}
                  >
                    <img src="https://cdn.getyourguide.com/img/tour/dd43582e1cb89017.jpeg/132.webp" alt="Tour Alberobello" />
                    <p className="tourbookingP">
                      Alberobello tutto intorno: <br /> Masserie e Trulli
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={2} className="mt-3">
          <div className="mt-3 border border-1 rounded-3 p-3">
            {" "}
            {dataSelezionata && (
              <div className="booking-details">
                <p className="tourbookingP">
                  Hai selezionato il giorno:
                  <br />
                  {format(dataSelezionata, "dd MMMM yyyy")}
                </p>
                <p className="tourbookingP">Bicicletta selezionata: {biciclettaSelezionata}</p>
                <p className="tourbookingP">Percorso selezionato: {percorsoSelezionato}</p>
                <button className="confirm-button ">Conferma Prenotazione</button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TourBooking;
