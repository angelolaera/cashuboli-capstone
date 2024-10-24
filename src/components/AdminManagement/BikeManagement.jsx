import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

function BikeManagement() {
  const [bikes, setBikes] = useState([]);
  const [newBike, setNewBike] = useState({
    modello: "",
    tipo: "",
    disponibilita: true,
  });
  const [imageFile, setImageFile] = useState(null); // Nuovo stato per il file immagine

  useEffect(() => {
    fetchBikes();
  }, []);

  // Funzione per recuperare le biciclette
  const fetchBikes = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/api/biciclette", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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

  // Funzione per creare una nuova bicicletta
  const handleCreateBike = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/api/biciclette", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBike),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella creazione della bicicletta");
        }
        return response.json();
      })
      .then((data) => {
        if (imageFile) {
          handleUploadImage(data.id); // Carica l'immagine associata alla bicicletta
        } else {
          fetchBikes(); // Aggiorna la lista delle biciclette se non c'è nessun file
        }
        setNewBike({
          modello: "",
          tipo: "",
          disponibilita: true,
        });
      })
      .catch((error) => console.error("Errore nella creazione della bicicletta:", error));
  };

  // Funzione per caricare l'immagine della bicicletta
  const handleUploadImage = (bikeId) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", imageFile);

    fetch(`http://localhost:3001/api/biciclette/${bikeId}/image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel caricamento dell'immagine");
        }
        fetchBikes(); // Aggiorna la lista delle biciclette dopo il caricamento dell'immagine
      })
      .catch((error) => console.error("Errore nel caricamento dell'immagine:", error));
  };

  // Funzione per eliminare una bicicletta
  const handleDeleteBike = (id) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3001/api/biciclette/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(() => fetchBikes())
      .catch((error) => console.error("Errore nella cancellazione della bicicletta:", error));
  };

  return (
    <div>
      <h2>Gestisci Biciclette</h2>
      <Form onSubmit={handleCreateBike}>
        <Form.Group controlId="modello">
          <Form.Label>Modello</Form.Label>
          <Form.Control type="text" value={newBike.modello} onChange={(e) => setNewBike({ ...newBike, modello: e.target.value })} required />
        </Form.Group>
        <Form.Group controlId="tipo">
          <Form.Label>Tipo</Form.Label>
          <Form.Control type="text" value={newBike.tipo} onChange={(e) => setNewBike({ ...newBike, tipo: e.target.value })} required />
        </Form.Group>
        <Form.Group controlId="disponibilita">
          <Form.Check
            type="checkbox"
            label="Disponibile"
            checked={newBike.disponibilita}
            onChange={(e) => setNewBike({ ...newBike, disponibilita: e.target.checked })}
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Carica Immagine</Form.Label>
          <Form.Control type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        </Form.Group>
        <Button type="submit" className="mt-2">
          Crea Bicicletta
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Modello</th>
            <th>Tipo</th>
            <th>Disponibilità</th>
            <th>Immagine</th>
            <th>Azione</th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((bike) => (
            <tr key={bike.id}>
              <td>{bike.modello}</td>
              <td>{bike.tipo}</td>
              <td>{bike.disponibilita ? "Disponibile" : "Non disponibile"}</td>
              <td>{bike.imageUrl ? <img src={bike.imageUrl} alt="Bicicletta" style={{ width: "100px" }} /> : "Nessuna Immagine"}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteBike(bike.id)}>
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

export default BikeManagement;
