import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <Container>
      <Row className="d-flex justify-content-between footer mt-3">
        <Col xs={12} md={6} xl={6} className="text-center">
          <h5 className="footertitle">EXPLORE</h5>
          <p className="headerParagraph mb-3">Home</p>
          <p className="headerParagraph mb-3">Chi Siamo</p>
          <p className="headerParagraph mb-3">Tour Masserie</p>
          <p className="headerParagraph mb-3">Collabora con noi!</p>
          <p className="headerParagraph mb-3">FAQ</p>
        </Col>
        <Col xs={12} md={6} xl={6} className="text-center">
          <h5 className="footertitle">CASHUBOLI S.r.l.</h5>
          <p className="headerParagraph mb-3">Zona A 46 - 70015 Noci (BA)</p>
          <p className="headerParagraph mb-3">P.IVA 000000000</p>
          <p className="headerParagraph mb-3">Capitale Sociale €1.000.000</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
