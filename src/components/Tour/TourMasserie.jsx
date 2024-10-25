import "./TourMasserie.css";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Row, Modal } from "react-bootstrap";

function TourMasserie() {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null); // Stato per il tour selezionato
  const [showModal, setShowModal] = useState(false); // Stato per mostrare o nascondere il modale

  useEffect(() => {
    fetchTours();
  }, []);

  // Funzione per recuperare i tour dal backend
  const fetchTours = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/api/tours", {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel caricamento dei tour");
        }
        return response.json();
      })
      .then((data) => setTours(data))
      .catch((error) => console.error("Errore nel caricamento dei tour:", error));
  };

  // Funzione per aprire il modale e selezionare il tour
  const handleShowDetails = (tour) => {
    setSelectedTour(tour);
    setShowModal(true);
  };

  // Funzione per chiudere il modale
  const handleClose = () => {
    setShowModal(false);
    setSelectedTour(null);
  };

  return (
    <Container>
      <h1 className="tourTitlePage text-center my-4">ESPLORA I NOSTRI TOUR</h1>
      <Row>
        {tours.map((tour) => (
          <Col key={tour.id} xs={4}>
            <Card className="border border-1">
              <Card.Img variant="top" src={tour.imageUrl} />
              <Card.Body>
                <Card.Title className="cardtitle">{tour.name}</Card.Title>
                <Card.Text className="biciParagraph">
                  {tour.tempoMedioPercorrenza} - {tour.lunghezzaItinerario} Km
                </Card.Text>
                <div className="d-flex align-items-center justify-content-between">
                  <Button className="mt-3" onClick={() => handleShowDetails(tour)}>
                    Dettagli
                  </Button>
                  <Badge className="priceBadge ms-auto mt-3">€{tour.price}</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modale per mostrare i dettagli del tour */}
      <Modal show={showModal} onHide={handleClose}>
        {selectedTour && (
          <>
            <Modal.Header>
              <Modal.Title className="tourCardh5">{selectedTour.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={selectedTour.imageUrl} alt={selectedTour.name} style={{ width: "100%" }} />
              <h5 className="mt-3 tourCardh5">
                Descrizione Completa <i class="bi bi-file-earmark-text"></i>
              </h5>
              <p className="tourCardParagraph">{selectedTour.descrizioneCompleta}</p>

              <h5 className="mt-3 tourCardh5">
                Lingua del Personale di Accoglienza <i class="bi bi-chat-text"></i>
              </h5>
              <p className="tourCardParagraph">{selectedTour.linguaAccoglienza}</p>

              <h5 className="mt-3 tourCardh5">
                Accessori Inclusi <i class="bi bi-backpack3"></i>
              </h5>
              <p className="tourCardParagraph">{selectedTour.accessoriInclusi}</p>

              <h5 className="mt-3 tourCardh5">
                Lunghezza dell'Itinerario <i class="bi bi-bicycle"></i>
              </h5>
              <p className="tourCardParagraph">{selectedTour.lunghezzaItinerario} Km</p>

              <h5 className="mt-3 tourCardh5">
                Tempo Medio di Percorrenza <i class="bi bi-stopwatch"></i>
              </h5>
              <p className="tourCardParagraph">{selectedTour.tempoMedioPercorrenza}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose}>Chiudi</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
}

export default TourMasserie;
