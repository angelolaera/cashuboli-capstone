import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../asset/img/logo.png";
import { Link } from "react-router-dom";

function BarraNavigazione() {
  return (
    <Navbar expand="lg" className="bg-white">
      <Container className="d-flex justify-content-evenly">
        <div className="d-flex">
          <img src={Logo} alt="logo" className="logo_cashuboli me-2" /> <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">
                <p className="navbarParagraph">Home</p>
              </Link>
              <Link to="/chisiamo" className="nav-link">
                <p className="navbarParagraph">Chi Siamo</p>
              </Link>
              <Nav.Link href="/bici">
                <p className="navbarParagraph">Bici</p>
              </Nav.Link>
              <Nav.Link href="./tourmasserie">
                <p className="navbarParagraph">Tour Masserie</p>
              </Nav.Link>
              <Nav.Link href="#home">
                <p className="navbarParagraph">Noleggio</p>
              </Nav.Link>
              <Nav.Link href="#home">
                <p className="navbarParagraph">Gallery</p>
              </Nav.Link>
              <Nav.Link href="#home">
                <p className="navbarParagraph">Contattaci</p>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default BarraNavigazione;
