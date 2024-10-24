import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

function TourManagement() {
  const [tours, setTours] = useState([]);
  const [newTour, setNewTour] = useState({
    name: "",
    description: "",
    price: "",
    maxParticipants: "",
  });

  useEffect(() => {
    fetchTours();
  }, []);

  // Funzione per recuperare i tour
  const fetchTours = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/api/tours", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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

  // Funzione per creare un nuovo tour
  const handleCreateTour = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/api/tours", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Assicurati che il token sia passato
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTour),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella creazione del tour");
        }
        return response.json();
      })
      .then(() => {
        fetchTours();
        // Reset del form dopo la creazione
        setNewTour({
          name: "",
          description: "",
          price: "",
          maxParticipants: "",
        });
      })
      .catch((error) => console.error("Errore nella creazione del tour:", error));
  };

  // Funzione per eliminare un tour
  const handleDeleteTour = (id) => {
    const token = localStorage.getItem("token");

    if (!id) {
      console.error("L'ID del tour è undefined o non valido.");
      return;
    }

    fetch(`http://localhost:3001/api/tours/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Aggiungi il token JWT nell'header
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella cancellazione del tour");
        }
        fetchTours();
      })
      .catch((error) => console.error("Errore nella cancellazione del tour:", error));
  };

  return (
    <div>
      <h2>Gestisci Tour</h2>
      <Form onSubmit={handleCreateTour}>
        <Form.Group controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" value={newTour.name} onChange={(e) => setNewTour({ ...newTour, name: e.target.value })} required />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control type="text" value={newTour.description} onChange={(e) => setNewTour({ ...newTour, description: e.target.value })} required />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Prezzo</Form.Label>
          <Form.Control type="number" value={newTour.price} onChange={(e) => setNewTour({ ...newTour, price: e.target.value })} required />
        </Form.Group>
        <Form.Group controlId="maxParticipants">
          <Form.Label>Massimo Partecipanti</Form.Label>
          <Form.Control type="number" value={newTour.maxParticipants} onChange={(e) => setNewTour({ ...newTour, maxParticipants: e.target.value })} required />
        </Form.Group>
        <Button type="submit" className="mt-2">
          Crea Tour
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrizione</th>
            <th>Prezzo</th>
            <th>Numero Massimo Partecipanti</th>
            <th>Azione</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour.id}>
              <td>{tour.name}</td>
              <td>{tour.description}</td>
              <td>{tour.price}</td>
              <td>{tour.maxParticipants}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteTour(tour.id)}>
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TourManagement;
