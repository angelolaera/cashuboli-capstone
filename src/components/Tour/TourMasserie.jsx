import React from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Tour/TourMasserie.css";

function TourMasserie() {
  return (
    <Container>
      <Row>
        <Col xs={4}>
          <Card className="border border-0">
            <Card.Img
              variant="top"
              src="https://cdn.getyourguide.com/img/tour/545a5b4d43bcc3360498da68df4b5158bad7fa08e1afc9eca0884cf39ee71821.jpeg/132.webp"
            />
            <Card.Body>
              <Card.Title className="cardtitle">Scoprire la Valle D'Itria</Card.Title>
              <Card.Text className="biciParagraph">3,5H - Gruppo Ristretto</Card.Text>
              <div className="d-flex align-items-center justify-content-between">
                <Link to="/tourvalleditria">
                  <Button className="mt-3">Dettagli</Button>
                </Link>
                <Badge className="priceBadge ms-auto mt-3">€55,00</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Card className="border border-0">
            <Card.Img variant="top" src="https://cdn.getyourguide.com/img/tour/dd43582e1cb89017.jpeg/132.webp" />
            <Card.Body>
              <Card.Title className="cardtitle">Alberobello tutto intorno: Masserie e Trulli</Card.Title>
              <Card.Text className="biciParagraph">5H - Gruppo Ristretto - Prelievo disponibile</Card.Text>
              <div className="d-flex align-items-center justify-content-between">
                <Link to="/touralberobello">
                  <Button className="mt-3">Dettagli</Button>
                </Link>
                <Badge className="priceBadge ms-auto mt-3">€50,00</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TourMasserie;
