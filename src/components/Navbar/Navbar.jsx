import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Logo from "../../asset/img/logo.png";
import { Link } from "react-router-dom";

function BarraNavigazione() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Chiudi il modale
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Recupera il nome utente dal localStorage all'inizio
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUsername(user);
    }
  }, []);

  // Gestisci il form di login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene il comportamento di default del form
    console.log("Form submit in corso..."); // Debug, per vedere se il form viene inviato correttamente

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login riuscito!", data); // Debug, vedere il risultato del login
        // Salva il token e il nome dell'utente nel localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.username);
        setUsername(data.username); // Aggiorna il nome dell'utente
        handleClose(); // Chiudi il modale dopo il login
      } else {
        console.error("Errore durante il login");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-white">
      <Container>
        <Navbar.Brand className="me-auto d-flex align-items-center">
          <img src={Logo} alt="logo" className="logo_cashuboli me-2" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex align-items-center">
            <Link to="/" className="nav-link">
              <p className="navbarParagraph m-0">Home</p>
            </Link>
            <Link to="/chisiamo" className="nav-link">
              <p className="navbarParagraph m-0">Chi Siamo</p>
            </Link>
            <Nav.Link href="/bici">
              <p className="navbarParagraph m-0">Bici</p>
            </Nav.Link>
            <Nav.Link href="./tourmasserie">
              <p className="navbarParagraph m-0">Tour</p>
            </Nav.Link>
            <Nav.Link href="./tourbooking">
              <p className="navbarParagraph m-0">Booking</p>
            </Nav.Link>
            <Nav.Link href="#home">
              <p className="navbarParagraph m-0">Gallery</p>
            </Nav.Link>
            <Nav.Link href="#home">
              <p className="navbarParagraph m-0">Contattaci</p>
            </Nav.Link>
          </Nav>
          <Nav className="ms-3 d-flex align-items-center">
            {" "}
            {/* Cambiato ms-auto in ms-3 per ridurre lo spazio */}
            {username ? <p className="navbarParagraph m-0 navbarParagraph">Benvenuto, {username}</p> : <Button onClick={handleShow}>Login</Button>}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Effettua il login!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-1">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

export default BarraNavigazione;
