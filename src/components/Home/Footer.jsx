import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import FooterBanner from "../../asset/img/footerbanner.jpg";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Grazie per esserti iscritto con l'email: ${email}`);
    setEmail("");
  };

  return (
    <Container>
      <Row className="footer mt-3">
        <Col xs={4} className="text-center">
          <h5 className="footertitle">CASHUBOLI S.r.l.</h5>
          <p className="headerParagraph mb-3">Zona A 46 - 70015 Noci (BA)</p>
          <p className="headerParagraph mb-3">P.IVA 000000000</p>
          <p className="headerParagraph mb-3">Capitale Sociale €1.000.000</p>
        </Col>
        <Col xs={4} className="text-center">
          <h5 className="footertitle">EXPLORE</h5>
          <p className="headerParagraph mb-3">Home</p>
          <p className="headerParagraph mb-3">Chi Siamo</p>
          <p className="headerParagraph mb-3">Tour Masserie</p>
          <p className="headerParagraph mb-3">Collabora con noi!</p>
          <p className="headerParagraph mb-3">FAQ</p>
        </Col>
        <Col xs={4} className="text-center">
          <h5 className="footertitle">NEWSLETTER</h5>
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Inserisci la tua email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Button type="submit" className="footerbutton mt-2">
              Iscriviti
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <div class="d-flex justify-content-center">
          <img className="footerbanner" src={FooterBanner} alt="" />
        </div>
      </Row>
    </Container>
  );
}

export default Footer;
