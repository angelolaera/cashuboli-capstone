import React, { useEffect, useState } from "react";
import { Button, Form, Table, Container } from "react-bootstrap";
import BASE_URL from "../../config";
import Swal from "sweetalert2";

function TourManagement() {
  const [tours, setTours] = useState([]);
  const [newTour, setNewTour] = useState({
    name: "",
    description: "",
    price: "",
    maxParticipants: "",
    lunghezzaItinerario: "",
    tempoMedioPercorrenza: "",
    linguaAccoglienza: "",
    descrizioneCompleta: "",
    accessoriInclusi: "",
  });
  const [imageFile, setImageFile] = useState(null); // Nuovo stato per il file immagine

  useEffect(() => {
    fetchTours();
    console.log(localStorage.getItem("token"));
  }, []);

  // Funzione per recuperare i tour
  const fetchTours = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/tours`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTours(data);
      } else {
        throw new Error("Errore nel caricamento dei tour");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funzione per creare un nuovo tour
  const handleCreateTour = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token non presente. Esegui il login.");
      return;
    }

    Swal.fire({
      title: "Creazione in corso...",
      text: "Attendere il completamento dell'operazione",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(`${BASE_URL}/api/tours`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTour),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Errore nella creazione del tour: ${errorText}`);
      }

      const createdTour = await response.json();
      if (imageFile) {
        await handleUploadImage(createdTour.id);
      }

      fetchTours();
      setNewTour({
        name: "",
        description: "",
        price: "",
        maxParticipants: "",
        lunghezzaItinerario: "",
        tempoMedioPercorrenza: "",
        linguaAccoglienza: "",
        descrizioneCompleta: "",
        accessoriInclusi: "",
      });
      setImageFile(null);
      Swal.fire("Successo!", "Tour creato con successo!", "success");
    } catch (error) {
      console.error("Errore nella creazione del tour:", error);
      Swal.fire("Errore!", `Impossibile creare il tour: ${error.message}`, "error");
    }
  };

  // Funzione per caricare l'immagine del tour
  const handleUploadImage = async (tourId) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", imageFile);

    // Mostra un alert di caricamento
    Swal.fire({
      title: "Caricamento immagine...",
      text: "Attendere il completamento dell'operazione",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(`${BASE_URL}/api/tours/${tourId}/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Errore nel caricamento dell'immagine");
      }

      // Aggiorna la lista dei tour dopo il caricamento dell'immagine
      fetchTours();

      // Mostra un alert di successo
      Swal.fire("Successo!", "Immagine caricata con successo!", "success");
    } catch (error) {
      console.error("Errore nel caricamento dell'immagine:", error);
      // Mostra un alert di errore
      Swal.fire("Errore!", "Impossibile caricare l'immagine.", "error");
    }
  };

  // Funzione per eliminare un tour
  const handleDeleteTour = (id) => {
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

        fetch(`${BASE_URL}/api/tours/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then(() => {
            fetchTours();
            Swal.fire("Eliminato!", "Il tour è stato eliminato.", "success");
          })
          .catch(() => {
            Swal.fire("Errore!", "Impossibile eliminare il tour.", "error");
          });
      }
    });
  };

  return (
    <>
      <h2>Gestisci Tour</h2>
      <Form onSubmit={handleCreateTour}>
        {/* Campi per creare un nuovo tour */}
        <Form.Group controlId="name">
          <Form.Label>Nome Tour</Form.Label>
          <Form.Control className="w-50" type="text" value={newTour.name} onChange={(e) => setNewTour({ ...newTour, name: e.target.value })} required />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descrizione Tour</Form.Label>
          <Form.Control
            className="w-50"
            type="text"
            value={newTour.description}
            onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Prezzo Tour</Form.Label>
          <Form.Control className="w-50" type="number" value={newTour.price} onChange={(e) => setNewTour({ ...newTour, price: e.target.value })} required />
        </Form.Group>
        <Form.Group controlId="maxParticipants">
          <Form.Label>Numero Massimo Partecipanti</Form.Label>
          <Form.Control
            className="w-50"
            type="number"
            value={newTour.maxParticipants}
            onChange={(e) => setNewTour({ ...newTour, maxParticipants: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="lunghezzaItinerario">
          <Form.Label>Lunghezza Itinerario in Km</Form.Label>
          <Form.Control
            className="w-50"
            type="text"
            value={newTour.lunghezzaItinerario}
            onChange={(e) => setNewTour({ ...newTour, lunghezzaItinerario: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="tempoMedioPercorrenza">
          <Form.Label>Tempo Medio di Percorrenza</Form.Label>
          <Form.Control
            className="w-50"
            type="text"
            value={newTour.tempoMedioPercorrenza}
            onChange={(e) => setNewTour({ ...newTour, tempoMedioPercorrenza: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="linguaAccoglienza">
          <Form.Label>Lingua del Personale di Accoglienza</Form.Label>
          <Form.Control
            className="w-50"
            type="text"
            value={newTour.linguaAccoglienza}
            onChange={(e) => setNewTour({ ...newTour, linguaAccoglienza: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="descrizioneCompleta">
          <Form.Label>Descrizione Completa del Tour</Form.Label>
          <Form.Control
            className="w-50"
            as="textarea"
            value={newTour.descrizioneCompleta}
            onChange={(e) => setNewTour({ ...newTour, descrizioneCompleta: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="accessoriInclusi">
          <Form.Label>Accessori Inclusi</Form.Label>
          <Form.Control
            className="w-50"
            type="text"
            value={newTour.accessoriInclusi}
            onChange={(e) => setNewTour({ ...newTour, accessoriInclusi: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="image" className="mt-2">
          <Form.Label>Carica Immagine Copertina Tour</Form.Label>
          <Form.Control className="w-50" type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        </Form.Group>
        <Button type="submit" className="mt-3">
          Crea Tour
        </Button>
      </Form>

      <div className="table-responsive mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrizione</th>
              <th>Prezzo</th>
              <th>Numero Massimo Partecipanti</th>
              <th>Lunghezza Itinerario in Km</th>
              <th>Tempo Medio Percorrenza</th>
              <th>Lingua Accoglienza</th>
              <th>Accessori Inclusi</th>
              <th>Immagine</th>
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
                <td>{tour.lunghezzaItinerario}</td>
                <td>{tour.tempoMedioPercorrenza}</td>
                <td>{tour.linguaAccoglienza}</td>
                <td>{tour.accessoriInclusi}</td>
                <td>{tour.imageUrl ? <img src={tour.imageUrl} alt="Tour" style={{ width: "100px" }} /> : "Nessuna Immagine"}</td>
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
    </>
  );
}

export default TourManagement;
