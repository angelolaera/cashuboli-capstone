import { Navbar, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar className="navbar d-flex justify-content-between">
      <Container>
        <Navbar.Brand className="text-white fs-6">
          <i className="bi bi-geo-alt-fill pe-1"></i>
          Via Europa - 70015 Noci (BA)
        </Navbar.Brand>

        <Navbar.Brand className="text-white fs-6">
          <i className="bi bi-telephone-fill pe-1"></i>
          +39 333 333 3333
        </Navbar.Brand>

        <Navbar.Brand className="text-white fs-6">
          <i className="bi bi-envelope-at-fill pe-1"></i>
          info@cashuboli.com
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
