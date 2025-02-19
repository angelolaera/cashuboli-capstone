import { Card, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import BASE_URL from "../../config";

function Bici() {
  const [bikes, setBikes] = useState([]);

  // Funzione per recuperare le biciclette dal backend
  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = () => {
    fetch(`${BASE_URL}/api/biciclette`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel caricamento delle biciclette");
        }
        return response.json();
      })
      .then((data) => setBikes(data))
      .catch((error) => console.error("Errore nel caricamento delle biciclette:", error));
  };

  return (
    <Container>
      <h1 className="bicititle text-center mt-4">LA NOSTRA FLOTTA</h1>
      <Row className="mt-5">
        {bikes.map((bike) => (
          <Col key={bike.id} xs={4}>
            <Card className="border border-0 mt-2">
              <Card.Img variant="top" src={bike.imageUrl} alt={bike.modello} />
              <Card.Body>
                <Card.Title className="cardtitle">{bike.modello}</Card.Title>
                <Card.Text className="biciParagraph">{bike.descrizione}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Bici;
