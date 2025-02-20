import React, { useEffect, useState } from "react";
import { Button, Form, Table, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import BASE_URL from "../../config";

function BikeManagement() {
  const [bikes, setBikes] = useState([]);
  const [newBike, setNewBike] = useState({
    modello: "",
    tipo: "",
    disponibilita: true,
    descrizione: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = () => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/biciclette`, {
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
      .catch((error) => console.error(error));
  };

  const handleCreateBike = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Creazione in corso...",
      text: "Attendere il completamento dell'operazione",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/api/biciclette`, {
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
          handleUploadImage(data.id);
        } else {
          fetchBikes();
          Swal.fire("Successo!", "Bicicletta creata con successo!", "success");
        }
        setNewBike({ modello: "", tipo: "", disponibilita: true, descrizione: "" });
        setImageFile(null);
      })
      .catch(() => {
        Swal.fire("Errore!", "Impossibile creare la bicicletta.", "error");
      });
  };

  const handleUploadImage = (bikeId) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", imageFile);

    fetch(`${BASE_URL}/api/biciclette/${bikeId}/image`, {
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
        fetchBikes();
        Swal.fire("Successo!", "Immagine caricata con successo!", "success");
      })
      .catch(() => {
        Swal.fire("Errore!", "Impossibile caricare l'immagine.", "error");
      });
  };

  const handleDeleteBike = (id) => {
    Swal.fire({
      title: "Sei sicuro?",
      text: "Questa azione non può essere annullata!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sì, elimina!",
      cancelButtonText: "Annulla",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");

        fetch(`${BASE_URL}/api/biciclette/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then(() => {
            fetchBikes();
            Swal.fire("Eliminato!", "La bicicletta è stata eliminata.", "success");
          })
          .catch(() => {
            Swal.fire("Errore!", "Impossibile eliminare la bicicletta.", "error");
          });
      }
    });
  };

  return (
    <div>
      <h2>Gestisci Biciclette</h2>
      <Form onSubmit={handleCreateBike}>
        <Form.Group controlId="modello">
          <Form.Label>Modello</Form.Label>
          <Form.Control className="w-50" type="text" value={newBike.modello} onChange={(e) => setNewBike({ ...newBike, modello: e.target.value })} required />
        </Form.Group>
        <Form.Group controlId="tipo">
          <Form.Label>Tipo</Form.Label>
          <Form.Control className="w-50" type="text" value={newBike.tipo} onChange={(e) => setNewBike({ ...newBike, tipo: e.target.value })} required />
        </Form.Group>
        <Form.Group controlId="descrizione">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            className="w-50"
            type="text"
            value={newBike.descrizione}
            onChange={(e) => setNewBike({ ...newBike, descrizione: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="disponibilita" className="mt-3">
          <Form.Check
            type="checkbox"
            label="Disponibilità Bicicletta"
            checked={newBike.disponibilita}
            onChange={(e) => setNewBike({ ...newBike, disponibilita: e.target.checked })}
          />
        </Form.Group>
        <Form.Group controlId="image" className="mt-3">
          <Form.Label>Carica Immagine</Form.Label>
          <Form.Control className="w-50" type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        </Form.Group>
        <Button type="submit" className="mt-3" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Crea Bicicletta"}
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Modello</th>
            <th>Tipo</th>
            <th>Descrizione</th>
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
              <td>{bike.descrizione}</td>
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
