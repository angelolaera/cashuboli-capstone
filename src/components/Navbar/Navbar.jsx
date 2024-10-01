import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../asset/img/logo.png";

function BarraNavigazione() {
  return (
    <Navbar expand="lg" className="bg-white">
      <Container className="d-flex justify-content-evenly">
        <div className="d-flex">
          <img src={Logo} alt="logo" className="logo_cashuboli me-2" /> <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#home">Chi Siamo</Nav.Link>
              <Nav.Link href="#home">Bici</Nav.Link>
              <Nav.Link href="#home">Tour Masserie</Nav.Link>
              <Nav.Link href="#home">Noleggio</Nav.Link>
              <Nav.Link href="#home">Gallery</Nav.Link>
              <Nav.Link href="#home">Contattaci</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default BarraNavigazione;
