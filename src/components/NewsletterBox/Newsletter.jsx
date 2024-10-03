import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

function NewsletterBox() {
  return (
    <Container>
      <Row className="align-items-center mb-4">
        <Col xs="4" className="newsletterLBox">
          <p className="newsletterParagrapgh text-center">
            {" "}
            Iscriviti alla newsletter per rimanere sempre aggiornato <i class="bi bi-envelope-at-fill"></i>
          </p>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
          </InputGroup>
          <InputGroup className="mb-3 align-items-center">
            <Button className="newsletterButton me-2">Iscriviti!</Button>
            <Form.Check type="switch" id="custom-switch" label="Accetto le condizioni" />
          </InputGroup>
        </Col>
      </Row>
      <hr className="divisoryLine" />
    </Container>
  );
}

export default NewsletterBox;
