import { Navbar, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar className="navbar d-flex justify-content-between">
      <Container>
        <Navbar.Brand className="d-flex text-white fs-6">
          <i className="bi bi-geo-alt-fill pe-1"></i>
          <p className="headerParagraph">Zona A 46 - 70015 Noci (BA)</p>
        </Navbar.Brand>

        <Navbar.Brand className="d-flex text-white fs-6">
          <i className="bi bi-telephone-fill pe-1"></i>
          <p className="headerParagraph">+39 331 340 3596 </p>
        </Navbar.Brand>

        <Navbar.Brand className="d-flex text-white fs-6">
          <i className="bi bi-envelope-at-fill pe-1"></i>
          <p className="headerParagraph">info@cashuboli.it</p>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
