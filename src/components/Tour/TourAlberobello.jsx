import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";

function TourAlberobello() {
  return (
    <Container>
      <Row className="mt-5">
        <Col xs={12} md={6}>
          <Image src="https://cdn.getyourguide.com/img/tour/dd43582e1cb89017.jpeg/98.jpg" fluid />
        </Col>

        <Col xs={12} md={3}>
          <Image
            src="https://cdn.getyourguide.com/img/tour/e787418a480c5659.jpeg/vertical_520_780.jpg"
            fluid
            style={{ height: "330.6px", width: "100%", objectFit: "cover" }}
          />
        </Col>

        <Col xs={12} md={3}>
          <Row>
            <Col xs={12}>
              <Image src="https://cdn.getyourguide.com/img/tour/b6f8e313fcfefc1e.jpeg/97.jpg" fluid />
            </Col>
            <Col xs={12} className="mt-3">
              <Image src="https://cdn.getyourguide.com/img/tour/992a7936f8f67cd5.jpeg/97.jpg" fluid />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <h6 className="ValleDitriah6 mt-5">
            Il tour in sella ad una e-bike che ti permette di scoprire l'incantevole paesaggio dei trulli e delle Masserie nocesi percorrendo le strade rurali
            del territorio.
          </h6>
          <hr />
          <h5 className="ValleDitriah5">Informazioni sull'attività</h5>
          <p className="mt-3">
            <i class="bi bi-stopwatch"></i> Durata: 5 ore
          </p>
          <p className="mt-3">
            <i class="bi bi-person-hearts"></i> Personale d'accoglienza: italiano, inglese
          </p>
          <p className="mt-3">
            <i className="bi bi-people-fill"></i> Limitato a 8 partecipanti
          </p>
          <hr />
          <h5 className="ValleDitriah5 mb-5">La tua esperienza</h5>
          <Row>
            <Col xs={3}>
              <p>In evidenza</p>
            </Col>
            <Col>
              <ul>
                <li>Vivi un'esperienza suggestiva tra i trulli di Alberobello</li>
                <li>Lasciati incantare dal paesaggio della murgia dei trulli</li>
                <li>Assapora i prodotti tipici di noci direttamente dai produttori</li>
                <li>Scopri le masserie di Noci in sella ad un'e-bike inclusiva</li>
              </ul>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={3}>
              <p>Descrizione Completa</p>
            </Col>
            <Col>
              <p>
                Il tour tra Alberobello e le masserie di Noci è un' occasione di conoscenza profonda del territorio che permette di conoscere la storia dei
                trulli di Alberobello, patrimonio dell'Unesco e di vivere la storia delle sue masserie comprese nel territorio fino a Noci. In sella alla
                biciletta elettrica percorreremo i sentieri storici, ammireremo quei luoghi che producono quello che da secoli arriva sulle nostre tavole grazie
                al lavoro instancabile di aziende agricole che si impegnano tutti i giorni per consegnarci prodotti tipici del territorio, quegli stessi
                prodotti che sarà possibile degustare ad un piccolo costo aggiuntivo. Avremo l'opportunità di vivere un'esperienza suggestiva nella mitica
                cornice dei trulli e potremo deliziarci con panorami suggestivi fatti di boschi e campi coltivati presenti lungo tutto il percorso. Perché
                Alberobello non è solo la città dei trulli!
              </p>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={3}>
              <p>Cosa è incluso</p>
            </Col>
            <Col>
              <div className="d-flex">
                <i className="bi bi-check"></i>
                <p>Bicicletta Elettrica</p>
              </div>
              <div className="d-flex">
                <i className="bi bi-check"></i>
                <p>Casco protettivo</p>
              </div>
              <div className="d-flex">
                <i className="bi bi-check"></i>
                <p>Assicurazione</p>
              </div>
              <div className="d-flex">
                <i className="bi bi-check"></i>
                <p>Acqua</p>
              </div>
              <div className="d-flex">
                <i class="bi bi-x"></i>
                <p>Pranzo</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default TourAlberobello;
