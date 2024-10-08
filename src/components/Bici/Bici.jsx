import { Card, Col, Container, Row } from "react-bootstrap";

function Bici() {
  return (
    <Container>
      <h1 className="bicititle text-center mt-4">LA NOSTRA FLOTTA</h1>
      <Row className="mt-5">
        <Col xs={4}>
          <Card className="border border-0">
            <Card.Img variant="top" src="https://www.re-moove.it/images/bikes/side-by-side-tandem.webp" />
            <Card.Body>
              <Card.Title className="cardtitle">SIDE BY SIDE TANDEM</Card.Title>
              <Card.Text className="biciParagraph">
                Biciclette per chi desidera pedalare fianco a fianco. Diversi modelli, diverse esigenze: selettore di pedalata, retromarcia, dimensioni
                ottimizzate, pedalata assistita.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          {" "}
          <Card className="border border-0">
            <Card.Img variant="top" src="https://www.re-moove.it/images/bikes/wheelchair-bike.webp" />
            <Card.Body>
              <Card.Title className="cardtitle">WHEELCHAIR BIKE</Card.Title>
              <Card.Text className="biciParagraph">
                Biciclette progettate per pedalare con bambini o adulti su sedia a rotelle che non possono o non se la sentono di farlo da soli a causa di una
                disabilità.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          {" "}
          <Card className="border border-0">
            <Card.Img variant="top" src="https://www.re-moove.it/images/bikes/taxi-trike.webp" />
            <Card.Body>
              <Card.Title className="cardtitle">TAXI TRIKE</Card.Title>
              <Card.Text className="biciParagraph">
                Biciclette a 3 ruote progettate per trasportare fino a 8 persone: bambini, adulti o anziani. Sicure, robuste e resistenti, per una mobilità
                davvero sostenibile.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5 mb-5">
        <Col xs={4}>
          <Card className="border border-0">
            <Card.Img variant="top" src="https://www.re-moove.it/images/bikes/cargo-trike.webp" />
            <Card.Body>
              <Card.Title className="cardtitle">SIDE BY SIDE TANDEM</Card.Title>
              <Card.Text className="biciParagraph">
                Biciclette a 3 ruote progettate per trasportare le merci: sicure, robuste e resistenti, completamente personalizzabili e coibentabili per il
                trasporto di cibi e bevande.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          {" "}
          <Card className="border border-0">
            <Card.Img variant="top" src="https://www.re-moove.it/images/bikes/sport-trike.webp" />
            <Card.Body>
              <Card.Title className="cardtitle">WHEELCHAIR BIKE</Card.Title>
              <Card.Text className="biciParagraph">
                Biciclette a 3 ruote per l'attività sportiva e cicloturistica. Le triciclette sono personalizzabili con sistemi di postura e adattamenti per
                massimizzare comfort e sicurezza.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          {" "}
          <Card className="border border-0">
            <Card.Img variant="top" src="https://www.re-moove.it/images/bikes/tandem.webp" />
            <Card.Body>
              <Card.Title className="cardtitle">TAXI TRIKE</Card.Title>
              <Card.Text className="biciParagraph">
                Biciclette per chi desidera pedalare in coppia. Diversi modelli, diverse esigenze: telai ribassati, dimensioni ottimizzate, guida anteriore o
                posteriore, pedalata assistita.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default Bici;
