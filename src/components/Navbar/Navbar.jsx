import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import Logo from "../../asset/img/logo.png";
import { Link, useNavigate } from "react-router-dom";

function BarraNavigazione() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    if (user) {
      setUsername(user);
    }
    if (role) {
      setRole(role);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.username);
        localStorage.setItem("role", data.role);
        setUsername(data.username);
        setRole(data.role);
        handleClose();
      } else {
        console.error("Errore durante il login");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUsername("");
    setRole("");
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
            {" "}
            {username ? (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Benvenuto, {username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {role === "ADMIN" ? (
                    <Dropdown.Item onClick={() => navigate("/admin-dashboard")}>Dashboard Admin</Dropdown.Item>
                  ) : (
                    <Dropdown.Item onClick={() => navigate("/user-area")}>Area Utente</Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button onClick={handleShow} className="ml-auto">
                Login
              </Button>
            )}
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
