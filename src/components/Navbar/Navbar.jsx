import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Logo from "../../asset/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../config";
import Swal from "sweetalert2";

function BarraNavigazione() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("user") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [dataDiNascita, setDataDiNascita] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  useEffect(() => {
    // Recupera i dati utente dal localStorage all'avvio
    setUsername(localStorage.getItem("user") || "");
    setRole(localStorage.getItem("role") || "");
    setUserId(localStorage.getItem("userId") || "");
  }, []);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.username);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.userId);
        setUsername(data.username);
        setRole(data.role);
        setUserId(data.userId);
        handleCloseLogin();
        Swal.fire({
          icon: "success",
          title: "Benvenuto" + " " + data.username,
          confirmButtonColor: "#b22222",
        });
      })
      .catch((error) => {
        console.error("Errore durante il login:", error);
        Swal.fire({
          icon: "error",
          title: "Errore di accesso",
          text: "L'email non è associata a nessun account!",
          confirmButtonColor: "#b22222",
        });
      });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Le password non corrispondono!");
      return;
    }

    fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        cognome: cognome,
        data_di_nascita: dataDiNascita,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante la registrazione");
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Registrazione avvenuta con successo! Riceverai una mail di conferma per attivare il tuo account. Controlla la tua casella di posta.",
          confirmButtonColor: "#b22222",
        });
        handleCloseRegister();
        navigate("/"); // Torna alla homepage dopo la registrazione
      })
      .catch((error) => {
        console.error("Errore durante la registrazione:", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setUsername("");
    setRole("");
    setUserId("");
    Swal.fire({
      title: "Stai lasciando la tua area riservata! Arrivederci " + username,
      confirmButtonColor: "#b22222",
    });
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-white">
      <Container>
        <Navbar.Brand href="/">
          <img src={Logo} alt="logo" className="logo_cashuboli" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/chisiamo" className="nav-link">
              Chi Siamo
            </Link>
            <Link to="/bici" className="nav-link">
              Bici
            </Link>
            <Link to="/tourmasserie" className="nav-link">
              Tour
            </Link>
            <Link to="/tourbooking" className="nav-link">
              Booking
            </Link>
            <Link to="#home" className="nav-link">
              Gallery
            </Link>
            <Link to="#home" className="nav-link">
              Contattaci
            </Link>
          </Nav>
          <Nav className="ms-auto">
            {username ? (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Benvenuto, {username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {role === "ADMIN" ? (
                    <Dropdown.Item onClick={() => navigate("/admin-dashboard")}>Dashboard Admin</Dropdown.Item>
                  ) : (
                    <Dropdown.Item onClick={() => navigate("/area-utente")}>Area Utente</Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button onClick={handleShowLogin} className="ml-auto">
                  Login
                </Button>
                <Button onClick={handleShowRegister} className="ml-auto ms-2">
                  Registrati
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Modale di login */}
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Effettua il login!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modale di registrazione */}
      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Registrati</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Inserisci il nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formCognome" className="mt-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" placeholder="Inserisci il cognome" value={cognome} onChange={(e) => setCognome(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formDataDiNascita" className="mt-3">
              <Form.Label>Data di Nascita</Form.Label>
              <Form.Control
                type="date"
                placeholder="Inserisci la tua data di nascita"
                value={dataDiNascita}
                onChange={(e) => setDataDiNascita(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Inserisci la tua email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Inserisci la password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Label>Conferma Password</Form.Label>
              <Form.Control type="password" placeholder="Conferma la password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Registrati
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

export default BarraNavigazione;
