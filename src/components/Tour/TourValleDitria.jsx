import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";

function TourValleDitria() {
  return (
    <Container>
      <Row className="mt-5">
        <Col xs={12} md={6}>
          <Image src="https://cdn.getyourguide.com/img/tour/545a5b4d43bcc3360498da68df4b5158bad7fa08e1afc9eca0884cf39ee71821.jpeg/98.jpg" fluid />
        </Col>

        <Col xs={12} md={3}>
          <Image
            src="https://cdn.getyourguide.com/img/tour/593ce0770751ee21c934bd0e61a20eafe7f35d0866f68efe7656229ef351ed54.jpeg/vertical_520_780.jpg"
            fluid
            style={{ height: "330.6px", width: "100%", objectFit: "cover" }}
          />
        </Col>

        <Col xs={12} md={3}>
          <Row>
            <Col xs={12}>
              <Image src="https://cdn.getyourguide.com/img/tour/00d6e023d21522e7ee7861f912154e48361b199b8939df8d92ff31b3beb0845b.jpeg/97.jpg" fluid />
            </Col>
            <Col xs={12} className="mt-3">
              <Image src="https://cdn.getyourguide.com/img/tour/e84a95136b55a6359de9cf277e93778c52617ff6538a0a498583ad0d9903e502.jpeg/97.jpg" fluid />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <h6 className="ValleDitriah6 mt-5">
            Primo tour alla scoperta della Valle d'Itria e del suo splendido territorio. Un viaggio tra i muri di pietra e gli iconici trulli di Alberobello e
            Locorotondo.
          </h6>
          <hr />
          <h5 className="ValleDitriah5">Informazioni sull'attività</h5>
          <p className="mt-3">
            <i class="bi bi-stopwatch"></i> Durata: 3,5 ore
          </p>
          <p className="mt-3">
            <i class="bi bi-person-hearts"></i> Personale d'accoglienza: italiano, inglese
          </p>
          <p className="mt-3">
            <i className="bi bi-people-fill"></i> Limitato a 4 partecipanti
          </p>
          <hr />
          <h5 className="ValleDitriah5 mb-5">La tua esperienza</h5>
          <Row>
            <Col xs={3}>
              <p>In evidenza</p>
            </Col>
            <Col>
              <ul>
                <li>Scopri Alberobello e i suoi iconici trulli</li>
                <li>Un viaggio in macchina nella campagna della Valle D'Itria</li>
                <li>Pedala con una e bike lungo la pista ciclabile dell'Acquedotto Pugliese</li>
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
                Un tour impressionante e incredibilmente gratificante da aggiungere alla lista delle cose da fare durante la tua vacanza! Si parte da
                Alberobello, da dove, percorrendo strade di campagna, potrai ammirare gli iconici trulli, patrimonio dell'Unesco. Durante il viaggio su strada,
                ricco di caratteristici muri in pietra, percorri la pista ciclabile dell'Acquedotto Pugliese, una delle più famose e storiche piste ciclabili
                italiane, lunga 500 km. Hai l'opportunità di percorrere un tratto che collega le città della Valle d'Itria ammirando il panorama pittoresco.
                Alla fine del tour arriverai a Locorotondo, uno dei borghi più suggestivi della Puglia con il suo splendido centro storico.
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
                <p>noleggio di biciclette elettriche, casco, bottiglia d'acqua, itinerario</p>
              </div>
              <div className="d-flex">
                <i class="bi bi-x"></i>
                <p>Il cibo non è incluso ma c'è la possibilità di aggiungere un picnic gourmet organizzato da Giardini 36 a Cisternino.</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default TourValleDitria;
