import { Navbar, Container } from "react-bootstrap";
import "./Header.css"; // Importa il tuo file CSS

function Header() {
  return (
    <Navbar className="navbar">
      <Container className="d-flex flex-wrap justify-content-between align-items-center">
        <Navbar.Brand className="d-flex text-white fs-6 mb-2 mb-md-0">
          <i className="bi bi-geo-alt-fill pe-1"></i>
          <p className="headerParagraph">
            {/* Aggiungi una classe per controllare il wrapping */}
            Zona A 46 - 70015 Noci (BA)
          </p>
        </Navbar.Brand>

        <Navbar.Brand className="d-flex text-white fs-6 mb-2 mb-md-0">
          <i className="bi bi-telephone-fill pe-1"></i>
          <p className="headerParagraph">+39 331 340 3596</p>
        </Navbar.Brand>

        <Navbar.Brand className="d-flex text-white fs-6 mb-2 mb-md-0">
          <i className="bi bi-envelope-at-fill pe-1"></i>
          <p className="headerParagraph">info@cashuboli.it</p>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
