import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";

function TourValleDitria() {
  return (
    <Container>
      <Row>
        {/* Prima colonna con l'immagine grande (spazio 6) */}
        <Col xs={12} md={6}>
          <Image src="https://cdn.getyourguide.com/img/tour/545a5b4d43bcc3360498da68df4b5158bad7fa08e1afc9eca0884cf39ee71821.jpeg/98.jpg" fluid />
        </Col>

        {/* Seconda colonna con una singola immagine (spazio 3) */}
        <Col xs={12} md={3}>
          <Image src="https://cdn.getyourguide.com/img/tour/593ce0770751ee21c934bd0e61a20eafe7f35d0866f68efe7656229ef351ed54.jpeg/vertical_520_780.jpg" fluid />
        </Col>

        {/* Terza colonna con due immagini incolonnate (spazio 3) */}
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
    </Container>
  );
}

export default TourValleDitria;
